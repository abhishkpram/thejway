---
name: thejway-bus-tracking
description: Use when changing Thejway bus-tracking behavior, applying its requirements, or planning Vercel and Firestore integrations.
---

# Thejway bus-tracking workflow

Use this skill for work in this repository. Read the root `AGENTS.md` first; the human-readable requirements and source notes are in the [project wiki](https://github.com/abhishkpram/thejway/wiki).

## Requirements and scope

- Prefer the explicit Phase 1 requirements email over the Stitch preview and emailed HTML. Treat prototype-only ideas such as pass validity, RFID/NFC, biometric login, and payment UI as unapproved unless requirements change.
- Students and faculty mark absence; no mark means expected to ride. Only an admin assigns a rider's bus and route.
- Drivers see rider status at upcoming stops. “Eligible to pass” means every mapped rider at that stop marked absent; do not silently change the route or direct a real driver.
- Payments, fee display, and payment gateway are Phase 2.
- Keep unresolved choices unresolved: role provisioning, native vs. web platform, stop assignment, and GPS/network loss behavior.

## Planned stack boundary

The project owner has named Vercel hosting with Google Firestore as the planned direction. It is not implemented or configured. Before adding production integrations:

1. Confirm the web/mobile platform and authentication/account provisioning.
2. Design and review Firestore collections, indexes, role enforcement, and security rules before storing real rider or location data.
3. Keep privileged credentials server-side; never expose service-account credentials or secrets to browser code or commit them.
4. Decide how Vercel deployments receive environment-specific configuration and how preview deployments are isolated from production data.
5. Define GPS permissions, update cadence, stale/offline states, location retention, and access controls before enabling live location.
6. Keep Google Maps API keys restricted and in the appropriate deployment configuration.

Do not install SDKs, add credentials, or claim a Vercel/Firestore integration merely because this stack is planned.

## Current demo and validation

- `frontend/app/` is a dependency-free browser demo with synthetic in-memory data. The role selector is not authentication or authorization.
- `frontend/prototype-v2/` contains preserved email HTML, some with inline scripts and external CDN references. Do not load it as application code or copy behavior without inspection.
- After frontend behavior changes, run the app locally with `python -m http.server 8000 --directory frontend/app` and test: default expected status; absence toggle; mixed and all-absent driver stops; admin assignment; student cannot edit assignments; reset.
- Update the corresponding wiki page when requirements, architecture, or source provenance changes.
