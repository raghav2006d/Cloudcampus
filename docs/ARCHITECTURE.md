# CloudCampus architecture

```mermaid
flowchart LR
  S[Student or administrator browser] -->|HTTPS static assets| V[Vercel Hobby · React + TypeScript + Vite]
  V -->|Firebase Auth SDK| A[Firebase Authentication · email/password]
  V -->|Firebase Web SDK + ID token| F[Cloud Firestore]
  F --> R[Firestore Security Rules]
  R --> U[(users/{uid})]
  R --> C[(complaints)]
  R --> H[(statusHistory)]
  R --> L[(adminAudit)]
  P[Trusted local operator] -->|Firebase Admin SDK · custom claim| A
  P -->|role profile update| F
  D[Docker Desktop / local Kubernetes] -. local demo only .-> V
```

## Request and identity flow

1. Vercel serves the built SPA over HTTPS; `vercel.json` rewrites nested routes to `index.html`.
2. The user creates an email/password account or signs in through Firebase Authentication. Public registration creates a profile with `role: student` only.
3. The Firebase SDK includes the signed-in user's identity token on Firestore calls.
4. Firestore Rules verify authentication and ownership. Admin-only reads and writes also require the signed custom claim `admin == true`.
5. The first admin is created by an operator running the trusted Admin SDK provisioning command. A profile role alone never grants access.
6. Complaint changes, status history, and admin audit rows are written atomically in a Firestore batch.

## Data model

- `users/{uid}` — `uid`, `displayName`, `email`, `role`, `createdAt`, `updatedAt`.
- `complaints/{autoId}` — `title`, `description`, `category`, `location`, `priority`, `status`, `userId`, timestamps, `resolvedAt`, `resolutionNote`.
- `statusHistory/{autoId}` — complaint/user IDs, previous and next status, actor UID, note, timestamp. Immutable after creation.
- `adminAudit/{autoId}` — actor UID, action, complaint ID, timestamp, non-sensitive metadata. Admin-readable and immutable.

## Service model selection

- **PaaS:** Vercel hosts and deploys the frontend. Firebase provides managed Authentication and Firestore capabilities.
- **SaaS:** CloudCampus is the browser application consumed by campus users; this describes the application delivery perspective.
- **IaaS:** No public VM or Kubernetes cluster is needed. Docker and optional Kubernetes illustrate infrastructure and orchestration locally.

## Local DevOps flow

Docker builds static assets in a Node build stage and serves them through non-root Nginx. Runtime Firebase web configuration is supplied by environment variables and exposed through `/runtime-config.js`; it is public client configuration, not a secret. Local Kubernetes uses one replica, ClusterIP, probes, and resource limits. Neither local setup is the production public host.
