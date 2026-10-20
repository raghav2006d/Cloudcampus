# Cost analysis (checked 20 October 2026)

The architecture targets ₹0 for a small educational/personal demonstration by using only no-cost eligible features. It does not guarantee zero cost for every account, use case, or future plan change. Confirm current terms before publishing.

| Service | Intended use | Free-plan assumptions and limits |
|---|---|---|
| Vercel Hobby | Static SPA hosting, HTTPS, Git integration, previews | Free plan for personal/non-commercial use only. Current plan docs list 100 GB Fast Data Transfer; usage limits apply, and Hobby projects can pause after free usage is exceeded. No paid team, function, add-on, or custom domain is required. |
| Firebase Authentication | Email/password | Email/password is among the no-cost auth options; avoid phone/SMS auth. |
| Cloud Firestore | Profiles, complaints, status and audit data | Published free quota: 1 GiB stored data, 50,000 document reads/day, 20,000 writes/day, 20,000 deletes/day, and 10 GiB monthly outbound transfer; one free database per project. Daily quotas reset around midnight Pacific. |
| Docker / local Kubernetes | Local demonstration | Runs on the user's machine; compute and electricity are local costs, not a cloud plan. |

Official sources: [Vercel Hobby](https://vercel.com/docs/plans/hobby), [Vercel plans](https://vercel.com/docs/plans), [Vercel limits](https://vercel.com/docs/limits), [Firebase Spark and billing plans](https://firebase.google.com/docs/projects/billing/firebase-pricing-plans), [Firestore pricing](https://firebase.google.com/docs/firestore/pricing).

Firebase Spark does not require billing details for the intended setup. Firebase documentation says paid-tier product usage is shut off when its applicable no-cost quota is exceeded; Firestore quotas are documented per day. A quota limit can interrupt app operations until reset. Do not attach a billing account to restore service. Vercel Hobby may pause affected usage when included limits are exceeded. Avoid unnecessary polling, repeated reloads, and broad unbounded queries; current lists cap reads at 100 documents.

Excluded: Blaze, Functions, Cloud Run, App Hosting, Storage uploads, paid email/SMS, paid APIs, paid domains, cloud VMs, managed Kubernetes, and paid Vercel add-ons. Monitor Firestore's Usage tab and Vercel Usage dashboard. Recheck official plan pages because quotas and eligibility can change.
