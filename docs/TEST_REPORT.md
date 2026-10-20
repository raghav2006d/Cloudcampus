# Test and verification report

## Automated checks executed

- `npm run lint` — passed (ESLint).
- `npm run typecheck` — passed (TypeScript).
- `npm test` — passed, 6 Node test cases covering status counts, empty dashboards, status chart values, category aggregation, and timestamp based resolution averages.
- `npm run build` — passed (Vite 6.4.4). Largest generated chunk is charts at 410.93 kB raw (111.48 kB gzip); Firestore is 304.05 kB raw (76.66 kB gzip).
- `npm audit` — passed with 0 known vulnerabilities at the time of this check.
- Local production-preview requests for `/login`, `/register`, `/student/dashboard`, `/student/complaints`, `/admin/dashboard`, and `/admin/complaints` each returned HTTP 200 with the SPA fallback.
- `docker compose config` — passed. `docker build -t cloudcampus:local .` — passed. A temporary container returned HTTP 200 for `/healthz` and `/admin/dashboard`, then was stopped and removed.

Firebase Emulator Suite authorization tests are specified in `SECURITY.md` but not yet configured or executed. Firebase credentials were not provided, so authenticated end-to-end Firestore checks could not run. Browser UI, mobile viewport, deployed nested-route, and Docker/Kubernetes checks were not executed in this environment.

## Manual end-to-end checklist

1. Register a student; verify the Auth user and a `student` profile.
2. Sign in and submit a complaint; verify it persists and appears in My complaints.
3. Sign in as a provisioned admin; update status, priority, and resolution note.
4. Verify status history and audit records and confirm the student sees the update.
5. Attempt another user's complaint read as a student.
6. Attempt to change the complaint owner and administrative fields as a student.
7. Attempt profile role escalation and forged history/audit writes.
8. Refresh nested production routes and check responsive layouts on mobile.
9. Inspect browser console and verify Firebase/Vercel settings.

## Performance procedure

Measure initial load in browser DevTools Network (cold cache), complaint submission from submit click to confirmed detail view, dashboard render from navigation to settled data, and `dist/` compressed/uncompressed sizes. Record representative Firestore document reads/writes from Firebase Usage. Repeat at 10, 100, and 1,000 records using a separate disposable project/emulator. Do not infer or publish numbers from this procedure until measured.

