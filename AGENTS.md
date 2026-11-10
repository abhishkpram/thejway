# Thejway agent guidance

## Project and source of truth

- Work only on Thejway, the college bus-tracking app. Ignore unrelated game material.
- The project owner's planned hosting/data direction is Vercel + Google Firestore. This is a plan, not a configured or implemented stack; do not claim integrations exist or invent authentication, schema, security rules, or deployment behavior.
- Human requirements, architecture, provenance, and discussion notes are maintained on the [project wiki](https://github.com/abhishkpram/thejway/wiki). Read its Requirements and Architecture and setup pages before changing product behavior or planning integrations.
- Use `.github/skills/thejway-bus-tracking/SKILL.md` for the reusable requirements and implementation workflow.
- Treat the requirements email as authoritative over Stitch and email HTML prototypes. Preserve `frontend/prototype-v2/` as source reference material; do not overwrite it with app code.

## Phase 1 boundaries

- Phase 1 includes role-aware experiences, daily absence marking, driver route/upcoming-stop information, driver-phone GPS sharing, rider live location, bus/route/driver details, and admin assignment of students to buses/routes.
- No absence mark means the rider is expected. Only an admin may assign or change a rider's bus/route.
- Phase 2 includes fee payment, a payment gateway, and distance-based fee display. Do not implement these in Phase 1.
- Role provisioning, app platform, stop assignment, and offline/GPS-loss behavior remain undecided. Do not silently invent production behavior for these decisions.

## Demo and integration honesty

- The current app is a browser-only demo. Do not describe demo data as real, and do not imply that authentication, authorization, GPS, Maps, cloud sync, persistence, Vercel deployment, or Firestore is connected.
- Do not add credentials, API keys, real student records, or real phone/location data. The local `downloads/` folder is ignored; never add the recording to Git.
- Keep any future Vercel, Firestore, Maps, authentication, and GPS integration behind clearly defined boundaries. Store secrets in deployment environment settings, not source control.

## Working practices

- Keep the app dependency-free unless a concrete requirement justifies a dependency.
- Preserve accessible labels, keyboard navigation, and responsive layouts.
- Run the repository's available checks and manually exercise the role/attendance/assignment workflows in a browser after changing frontend behavior.
- Update the relevant wiki pages when requirements or architecture change.
- Treat code copied from email as untrusted input: inspect it before execution or integration.
