# CloudCampus — Smart Campus Complaint & Maintenance Management System

## Abstract

CloudCampus is a browser application for reporting and tracking campus maintenance issues. It connects students and campus administrators through a persistent, cloud-hosted workflow. The case study demonstrates managed frontend deployment, authentication, NoSQL data storage, database-enforced authorization, container packaging, and cost-aware cloud design.

## Problem identification

Reports about Wi-Fi, classrooms, labs, hostels, electricity, library infrastructure, and cleanliness are often shared through informal channels. These reports are difficult to track, can be duplicated or overlooked, and provide little visibility into progress or recurring patterns.

## Existing solution and limitations

Informal calls, email, messaging groups, and paper logs are easy to start but often lack a shared queue, consistent status, ownership checks, searchable history, and aggregate views. CloudCampus offers one structured workflow. It does not replace emergency reporting or a college's official incident system.

## Proposed solution and objectives

Students register and submit categorized reports with locations and descriptions. They can see their own queue and status history. Trusted administrators view all reports, set status and priority, add resolution notes, inspect activity, and export an accessible CSV. Objectives: persistent storage, least privilege, responsive UI, traceable updates, useful analytics, and a reproducible no-cost eligible deployment plan.

## Requirements

**Functional:** email/password registration and sign-in; password reset; student profile; create/read own complaint; admin complaint queue and update; immutable status history and audit entries; filtering and CSV export; dashboards derived from Firestore; help and architecture information.

**Non-functional:** HTTPS; backend-enforced authorization; responsive and keyboard-usable UI; data validation; bounded queries; graceful missing-configuration and permission errors; no private credentials in frontend code.

## Architecture and service models

See [ARCHITECTURE.md](ARCHITECTURE.md). Vercel serves a React/TypeScript/Vite SPA. Firebase Authentication provides identity; Firestore stores profiles, complaints, history, and audit data. Security Rules authorize each operation. This is PaaS usage for managed deployment/backend capabilities. The CloudCampus browser application is consumed from the SaaS/application-delivery perspective. No public IaaS VM is needed; Docker and local Kubernetes demonstrate IaaS/orchestration concepts on the developer's computer.

## Infrastructure and technology

Development requires a Node.js/npm workstation and Git. Optional Docker Desktop supports local containers and Kubernetes. The production architecture depends on Vercel and Firebase free-plan eligibility and quotas, not a college-owned server. The interface uses React, TypeScript, Vite, Tailwind CSS, React Router, Recharts, Lucide icons, and Firebase Web SDK.

## Database schema

See [ARCHITECTURE.md](ARCHITECTURE.md) and `firestore.rules`. `users/{uid}` stores minimal profile data; `complaints/{id}` stores report data; `statusHistory/{id}` stores immutable transitions; `adminAudit/{id}` stores immutable administrative actions. Composite indexes are listed in `firestore.indexes.json`.

## Networking and communication

The browser loads static files from Vercel over HTTPS and calls Firebase Authentication and Firestore over HTTPS using the Firebase Web SDK and signed ID tokens. No custom server or private network is required. Firestore Rules validate every protected data request.

## Security design

Authentication identifies the user. Ownership rules restrict students to their own complaints. Admin authorization checks the signed `admin` custom claim; a profile field or route is never sufficient. Public signup can only set a student role. Complaint edits, status history and audit entries are constrained by validation and default-deny rules. See [SECURITY.md](SECURITY.md).

## Implementation and deployment

Routes include a public landing experience; sign-in, registration, and recovery; student dashboards, submissions, history, details, profile and activity; admin dashboards, complaint management, reports, users and activity; and shared help/about/architecture/access-denied/not-found screens. Vercel uses a SPA rewrite. Docker uses a multi-stage build and non-root Nginx. Local Kubernetes uses a ClusterIP service. Detailed steps are in [DEPLOYMENT.md](DEPLOYMENT.md).

## Testing and performance evaluation

Pure dashboard aggregation functions have unit tests. Build/type checking is run as recorded in `TEST_REPORT.md`. Real database workflow and security tests need a configured Firebase project or emulator. Performance must be measured with browser DevTools and Firebase usage metrics; no benchmark figures are claimed without execution.

## Scalability

Managed identity and database services avoid operating a custom backend. Queries have bounded 100-record lists and dashboard metrics are based on the records returned to the current view; for larger deployments, use cursor pagination and carefully designed aggregate documents only if a trusted backend is available. Read/write quotas and index costs still apply.

## Cost analysis

The chosen design targets a small personal educational demo on Vercel Hobby and Firebase Spark, without a billing account or paid infrastructure. Free quotas, plan restrictions, shutoff behavior, monitoring, and assumptions are in [COST_ANALYSIS.md](COST_ANALYSIS.md). ₹0 is a target under stated use and eligibility, not an unconditional guarantee.

## Results, limitations, and future work

Implemented workflow and checks are summarized in `TEST_REPORT.md`. Live cloud integration remains configuration-dependent. Current UI displays up to 100 most recent records; category charts reflect those loaded records rather than all historical records. Activity labels and timestamps are constrained by data available to a client. File uploads and external notifications are omitted. Future work could add cursor pagination, institution-approved notifications, accessibility review, and emulator security tests without weakening server-side authorization.

## Conclusion

CloudCampus demonstrates how a small campus workflow can use managed cloud services, client SDKs, and database security rules instead of operating a custom cloud backend. It packages a useful workflow while making free-tier limitations and trusted admin setup explicit.

## Assessment rubric mapping

| Rubric | Marks | Evidence |
|---|---:|---|
| A. Problem analysis & cloud design | 2 | Problem statement, requirements, architecture and service-model reasoning above and in `ARCHITECTURE.md`. |
| B. Implementation & technical execution | 4 | React application, Auth/Firestore client, rules, indexes, Docker and local Kubernetes. |
| C. Results & technical evaluation | 2 | Build/unit results and reproducible measurement plan in `TEST_REPORT.md`; cloud tests require credentials. |
| D. Viva | 2 | Concise concept questions and answers in `VIVA_QUESTIONS.md`. |
