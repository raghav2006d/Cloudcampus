# Viva questions and concise answers

1. **What is cloud computing?** — On-demand access to shared computing resources over a network, usually with measured usage and managed service options.
2. **What cloud deployment model does CloudCampus use?** — Public cloud services for the frontend and Firebase backend; local containers are only for development demonstrations.
3. **What is IaaS?** — A service model that provides virtualized compute, networking, and storage; the customer manages the OS and application stack.
4. **What is PaaS?** — A managed application platform that reduces server and runtime operations; Vercel and Firebase capabilities are used in this style.
5. **What is SaaS?** — A complete application delivered to users over a network; CloudCampus is the application consumed in a browser.
6. **Why not use a cloud VM?** — A small static SPA plus managed Auth and database does not need an always-running server; a VM adds patching and cost.
7. **Why choose Firebase Authentication?** — It manages account credentials and identity flows without us storing passwords.
8. **Where are passwords stored?** — Firebase Authentication manages them; CloudCampus never writes passwords into Firestore.
9. **What is Firestore?** — A managed document-oriented NoSQL database organized into collections and documents.
10. **Why is the user document ID the Auth UID?** — It creates a direct identity key for ownership checks and avoids duplicating identity mapping.
11. **What are Firestore Security Rules?** — Server-enforced authorization and validation evaluated for each mobile/web SDK database request.
12. **Why are frontend route guards insufficient?** — Users can alter browser code and call the database directly; the database must enforce access too.
13. **How is admin access granted?** — A trusted operator assigns a Firebase Authentication custom claim using the Admin SDK.
14. **Why not trust `users/{uid}.role` alone?** — A client-writable document is not a signed authorization credential; rules require the trusted token claim.
15. **Can public registration create an admin?** — No. Rules require the public profile role to be `student` and do not expose promotion.
16. **What is HTTPS?** — HTTP protected by TLS, providing encryption in transit and server authentication.
17. **What happens when a student submits a complaint?** — The authenticated client writes a bounded document with their UID; Firestore Rules validate its fields and ownership.
18. **How are statuses recorded?** — An admin batch updates the complaint and writes an immutable status history and audit record.
19. **What is a composite index?** — An index over multiple fields that helps Firestore execute compound filters and sort orders efficiently.
20. **Why limit queries?** — Limits bound reads, latency, and client memory; they also help keep a demo within free quotas.
21. **How are dashboard counts calculated?** — From the records returned by Firestore for that view; empty data is shown as zero/empty state, not fabricated metrics.
22. **What does the chart's scope mean?** — It summarizes the latest records loaded (up to 100), not necessarily the full historical database.
23. **How does Vercel route refresh work?** — `vercel.json` rewrites requests to the SPA entry point so React Router can resolve nested paths.
24. **What is a preview deployment?** — A separate deployment associated with a change or branch for review before production.
25. **What is Docker?** — A tool to package and run an application and its dependencies in a container image.
26. **How is a container different from a VM?** — Containers share the host kernel and isolate processes; VMs run a guest OS on virtualized hardware.
27. **Why use a multi-stage Docker build?** — Build tools are kept out of the final static web image, reducing runtime contents.
28. **What is Kubernetes?** — An orchestrator that schedules containers and maintains declared workloads and services.
29. **Why is the Kubernetes Service ClusterIP?** — It exposes the app only inside the local cluster; port-forwarding is sufficient for this demo.
30. **How does this design address ₹0?** — It targets Vercel Hobby and Firebase Spark quotas, excludes paid infrastructure, and documents quota and eligibility caveats.
31. **What if Firestore free quota is reached?** — Operations may be rejected/shut off until reset; reduce reads/writes and wait rather than enabling billing.
32. **How can performance be measured?** — Use browser DevTools for page and interaction timing, build output for bundle size, and Firebase Usage for read/write counts.
33. **What is the main current scaling limitation?** — UI queues cap at 100 recent documents; larger datasets need cursor pagination and more deliberate aggregate design.
34. **Why no custom backend?** — Firebase client SDK and Security Rules meet the demonstration needs without an additional server to operate.
35. **What is a threat model?** — A description of important assets, attacker capabilities, trust boundaries, and mitigations; here the browser is treated as untrusted.
