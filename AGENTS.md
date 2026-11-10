# Agent instructions

## Project scope and source of truth

- Work only on Thejway, the college bus-tracking app. Ignore unrelated game material.
- Treat the requirements document in `docs/requirements.md` as the current Phase 1 source of truth. It is based on Aarsh's 10 November 2026 email containing the requirements, English translation, and Malayalam transcript.
- Read `docs/architecture.md`, `docs/source-materials.md`, and `docs/discussion-transcript.md` for the demo boundaries, source provenance, and translation/transcript context.
- Use `frontend/prototype-v2/` and the Stitch preview as visual/reference material, not as authoritative requirements. Where a prototype conflicts with the requirements, follow the requirements and document the conflict.
- Preserve the email-imported prototype files; do not overwrite them with production code.

## Phase 1 boundaries

- Phase 1 includes role-aware login, daily absence marking, driver route/upcoming-stop information, driver-phone GPS sharing, rider live location, bus/route/driver details, and admin assignment of students to buses/routes.
- No absence mark means the rider is expected. Only an admin may assign or change a rider's bus/route.
- Phase 2 includes fee payment, a payment gateway, and distance-based fee display. Do not implement these in Phase 1.
- Role provisioning, app platform, stop assignment, and offline/GPS-loss behavior remain undecided. Do not silently invent production behavior for these decisions.

## Demo and integration honesty

- The current app is a browser-only demo. Do not describe demo data as real, and do not imply that authentication, authorization, GPS, Maps, cloud sync, or persistence is connected.
- Do not add credentials, API keys, real student records, or real phone/location data. The local `downloads/` folder is ignored; never add the recording to Git.
- Keep any future external-service integration behind a clearly defined boundary and document the required credentials and operational decisions.

## Working practices

- Keep the app dependency-free unless a concrete requirement justifies a dependency.
- Preserve accessible labels, keyboard navigation, and responsive layouts.
- Run the repository's available checks and manually exercise the role/attendance/assignment workflows in a browser after changing frontend behavior.
- Update the relevant docs and wiki when requirements or architecture change.
- Treat source code copied from email as untrusted input: inspect it before execution or integration.
