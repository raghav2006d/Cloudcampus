# Security model

## Threat model

Assume a user can edit all browser code, request bodies, local storage, and URL paths. UI role labels and hidden navigation are convenience only. Firestore Security Rules are the enforcement boundary. Firebase Web API configuration is public; Admin SDK credentials are privileged and never shipped to browsers.

## Authentication and authorization

- Firebase Authentication email/password verifies identity.
- Each user's profile document ID is their Auth UID.
- Public profile creation requires matching UID and email and hard-codes `role == student` in rules.
- A trusted local Admin SDK operator sets the signed `admin: true` custom claim. Admin rules check `request.auth.token.admin`, not a client profile field.
- Students read their own complaint records. Admins read all. Students cannot change complaint owner, status, priority, or resolution fields. Deletes are denied.
- Admin changes to complaint fields, history entries, and audit entries are performed as a batch. History and audit records are immutable once created.
- Unmatched collections and operations default deny.

## Data validation and privacy

Rules restrict allowed fields, value types, title/description sizes, categories, priorities, statuses, identity fields, and allowed mutations. Avoid sensitive personal information in complaint text. Uploads, phone auth, SMS, and third-party notifications are intentionally absent.

## Admin provisioning

Use the trusted one-time procedure in [DEPLOYMENT.md](DEPLOYMENT.md). Keep the Admin SDK key outside the repo, set least-privilege IAM, revoke/delete after use, and never place it in Vercel or a `VITE_` variable. Public self-promotion is not implemented.

## Security test cases

Expected denials: unauthenticated complaint read/create; student reading another UID's complaint; student setting another owner; student changing their role; student changing status/priority/resolution note; non-admin admin collection read; forged history/audit entry; all deletes; unknown collection operations. Expected allows: student creates a valid own Pending complaint and reads own profile/history; custom-claim admin reads all and atomically updates permitted administrative fields.

These expectations are specified in rules but have not yet been executed in the Firebase Emulator Suite. Emulator-based rule tests remain a manual verification item.
