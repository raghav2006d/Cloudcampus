# Setup and deployment

## Prerequisites

- Node.js 22.13+ and npm; Git.
- Firebase and Vercel accounts. Do not attach billing or enter payment details.
- Firebase CLI (`npm install -g firebase-tools`) for rule/index deployment.
- Optional Docker Desktop and local Kubernetes.

## Firebase Spark setup

1. Create a Firebase project and confirm its plan is **Spark**. Do not link a Cloud Billing account.
2. Add a Web App in Firebase Project Settings. Copy the Web App's `apiKey`, `authDomain`, `projectId`, and `appId`; these are client configuration values, not Admin SDK secrets.
3. In Authentication → Sign-in method, enable **Email/Password**.
4. Create the first Cloud Firestore database (the no-cost quota applies to one database per project). Choose a nearby supported region carefully; Firestore location cannot be changed later.
5. At the repository root: `Copy-Item .env.example .env.local`, then fill the four values. `.env.local` is git-ignored.
6. Deploy rules and indexes: `firebase login`, `firebase use --add`, then `firebase deploy --only firestore:rules,firestore:indexes`.
7. Register a student and submit a test report after local development is running.

No real Firebase project or credentials are linked in the current workspace. Do not copy sample or invented values.

## Provision the first administrator

Create the administrator as a normal student first. In Firebase Console, locate the account UID. In a trusted local terminal, create a service account with only the required user custom-claims and Firestore profile permissions, download its JSON to a private path outside the repository, and set `$env:GOOGLE_APPLICATION_CREDENTIALS='C:\private\firebase-admin.json'`. Then run:

```powershell
npm --prefix tools/admin-provision install
npm run admin:provision -- <registered-user-uid>
```

The script writes `admin: true` as an Authentication custom claim and records the role in the matching profile. Have the admin sign out and sign in again to refresh the ID token. Delete/revoke the downloaded key when finished. Never commit it or place it in a `VITE_` variable. The app only treats an account as an admin when the signed token contains the custom claim.

For a dedicated provisioner identity, grant only the project roles needed to update Firebase Auth claims and the profile document (`roles/firebaseauth.admin` and `roles/datastore.user`). Create and remove the key in a private location; do not reuse a broad personal credential for routine app access.

## Vercel Hobby deployment

Vercel Hobby is only for personal/non-commercial use. Confirm your educational presentation is eligible under current terms. If not, do not upgrade automatically; use local Docker for the demonstration or ask the institution for an approved host.

1. Create an empty GitHub repository, then from this local folder run `git remote add origin https://github.com/<your-user>/cloudcampus.git`, `git add .`, `git commit -m "Build CloudCampus case study app"`, and `git push -u origin main`. Replace the placeholder with your repository URL. The local Git repository is initialized, but no remote or commit exists yet.
2. Sign in to Vercel and import the existing GitHub repository under your personal Hobby account. Do not create a paid team.
3. Confirm framework preset **Vite**, install command `npm install` (or `npm ci` after lockfile exists), build command `npm run build`, output `dist`.
4. In Project Settings → Environment Variables, add the four `VITE_FIREBASE_*` values for **Production** and **Preview**. Use the same Firebase project for previews or a separately configured Firebase project; never include service-account credentials. These client values are embedded in the browser bundle and must be protected by Firestore rules.
5. Deploy. Vercel creates preview deployments for pushes and a production deployment from the configured production branch. Verify `/login`, `/register`, `/student/dashboard`, and `/admin/dashboard` refresh correctly. `vercel.json` provides the SPA rewrite.
6. A change to environment values requires a new deployment. Confirm Vercel remains on Hobby and monitor usage in its dashboard.

No Vercel CLI project authentication or GitHub repository is configured in this workspace; no deployment has been performed.

## Docker Desktop

Create a local `.env` with the same four Firebase values (or set them in the PowerShell environment), then run:

```powershell
docker compose build
docker compose up -d
docker compose logs -f cloudcampus
```

Open `http://localhost:8080`. Stop with `docker compose down`. Runtime configuration is generated at container startup; the built files contain no service-account credentials.

## Local Kubernetes

Enable Kubernetes in Docker Desktop or use Minikube. Put public Firebase values in `k8s/configmap.yaml`, then:

```powershell
docker build -t cloudcampus:local .
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml -f k8s/deployment.yaml -f k8s/service.yaml
kubectl -n cloudcampus get pods,svc
kubectl -n cloudcampus logs deploy/cloudcampus
kubectl -n cloudcampus port-forward svc/cloudcampus 8080:8080
```

For Minikube, load the image with `minikube image load cloudcampus:local`. Clean up with `kubectl delete namespace cloudcampus`. This creates local resources only; the Service remains `ClusterIP`.

## Troubleshooting

- Missing setup message: check all four variables and redeploy/restart the container.
- Permission denied: deploy current Firestore Rules; for admin operations verify custom claim and sign in again.
- Missing index: deploy `firestore.indexes.json` using Firebase CLI.
- Auth domain error: add your Vercel production and preview hostnames in Firebase Authentication authorized domains.
- Spark quota reached: inspect Firebase usage, pause unnecessary reads/writes, and wait for the documented reset; do not link billing.
