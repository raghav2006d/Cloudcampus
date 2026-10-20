# CloudCampus

CloudCampus is a cloud computing case study for campus complaint and maintenance tracking. Students create and follow reports; trusted campus administrators manage status, priority, and resolution notes. It uses React, TypeScript, Vite, Tailwind CSS, Firebase Authentication, Cloud Firestore, Vercel, Docker, and optional local Kubernetes.

## Start locally

```powershell
npm install
Copy-Item .env.example .env.local
# Fill .env.local with the four Firebase Web App values described in docs/DEPLOYMENT.md
npm run dev
```

Without Firebase values, the public landing page works and the sign-in screen explains the missing setup. Authenticated data pages are not backed by mock records.

## Key folders

- `src/` — routes, UI, Firebase initialization, and dashboard metrics
- `firestore.rules` / `firestore.indexes.json` — backend authorization and indexes
- `tools/admin-provision/` — trusted one-time custom-claim provisioning
- `docs/` — case study, architecture, deployment, security, cost, testing, and viva material
- `k8s/` — optional local Kubernetes manifests
- `Dockerfile`, `docker-compose.yml`, `nginx.conf` — local container deployment

## Useful commands

```powershell
npm run dev
npm run lint
npm test
npm run build
npm run preview
```

Deploy Firebase rules and indexes with Firebase CLI after linking your project:

```powershell
firebase login
firebase use --add
firebase deploy --only firestore:rules,firestore:indexes
```

Full Firebase and Vercel steps are in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md). Read [docs/SECURITY.md](docs/SECURITY.md) before creating an administrator. Costs and free-plan assumptions are in [docs/COST_ANALYSIS.md](docs/COST_ANALYSIS.md).

## Deployment status

This workspace does not contain a linked GitHub repository, Firebase project, or authenticated Vercel project. No public deployment has been performed and no URL is claimed. Follow the deployment guide when those accounts and project settings are ready. Vercel Hobby is restricted to personal/non-commercial use; confirm the intended educational demonstration qualifies under current terms.
