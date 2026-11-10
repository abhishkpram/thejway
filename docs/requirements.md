# Thejway Phase 1 requirements

## Status and source

This is the working requirements baseline for the Phase 1 bus-tracking MVP. It is based on Aarsh's 10 November 2026 email titled **“Requirements Recording Thejway”**, which included a structured requirements document, an English translation, and an unlabelled Malayalam transcript. The sender says the transcript and translation were speech-to-text produced and checked against the recording; small wording errors may remain.

The full translation and Malayalam transcript are preserved in [discussion-transcript.md](discussion-transcript.md). This document separates explicit requirements from unresolved decisions and prototype-only ideas.

## Purpose

Provide a cloud-hosted college bus app that reduces unnecessary waits at stops and lets riders see their assigned bus and its live location. Students and faculty mark when they will **not** ride that day. If no rider at a stop is expected, the driver can pass the stop rather than waiting about two minutes or phoning a rider. The route itself remains the defined route.

## Phase 1 scope

1. Credential-based login and role-aware experiences.
2. Daily absence marking for students and faculty.
3. Driver route and upcoming-stop rider status.
4. Live bus location shared from the driver's phone.
5. Student-to-bus/route assignment by an admin.
6. Bus, route, and driver details available to the relevant users.
7. Cloud hosting so the app is available without a laptop running as a server.

## Roles and permissions

| Role | Phase 1 capabilities |
| --- | --- |
| Student | Mark absent for the day; view assigned bus, route, driver name/mobile number, and live bus location. Must not choose or change their bus assignment. |
| Faculty | Same core ride/absence and tracking functions as a student. Faculty ride free and have no fee or payment features. |
| Driver | View the assigned route and upcoming riders' expected/absent status; share the driver's phone GPS location through the app. |
| Admin | Assign or change students' bus and route. Admin access is part of the cloud app and can be used from a phone or computer. |

The discussion mentions Student, Faculty, and Driver role choices at login, then adds an Admin tag. It does **not** settle how roles are granted or how admin accounts are created.

## Functional requirements

- **FR-1 — Login and roles:** Users sign in with credentials. The app identifies the user's role (Student, Faculty, Driver, or Admin) and presents the appropriate experience.
- **FR-2 — Absence marking:** A student or faculty member can mark that they will not ride on a given day. No absence mark means the rider is expected.
- **FR-3 — Driver stop board:** The driver can see the route and the upcoming riders' expected/absent status by stop. If every rider associated with a stop is absent, the driver can pass that stop. Do not automatically reroute the bus.
- **FR-4 — Live tracking:** The driver's smartphone shares GPS through the app; no separate GPS hardware is required. Students and faculty can view the bus location live.
- **FR-5 — Routes and maps:** Define each bus's route and show the route assigned to its driver. Use the Google Maps API for maps/routes.
- **FR-6 — Fleet details:** The initial fleet is approximately 10–12 buses. Bus details, route, and assigned driver should be available in the app.
- **FR-7 — Driver details:** Students and faculty can see the driver assigned to their route, including the driver's name and mobile number.
- **FR-8 — Assignment control:** An admin assigns each student to a bus and route. Students cannot assign or change their own bus.
- **FR-9 — Admin access and hosting:** Admin work is performed by signing into the same cloud-hosted app with an Admin role, from any device. There is no separate admin portal/host and no laptop acting as the server.

## Technical and operational notes

- Cloud hosted; no local laptop server is required.
- Maps/routes use Google Maps API.
- The driver's phone supplies location through the app.
- Riders and drivers use phones; admins may use a phone or computer.
- Most buses start around 7:00 AM; distant routes start around 6:00. The email notes “PM” was said once for the 6:00 time and is likely a transcription/speech error.
- The current wait at a stop for a missing rider is about two minutes.
- The current fleet is about 10–12 buses.

## Explicitly deferred: Phase 2

- Student fee payment and payment gateway.
- Distance/kilometre-based fee-structure display.
- Faculty have no fee/payment features.

Do not implement payment behavior in Phase 1. The imported payment-page prototype is retained as a reference only.

## Open decisions

These are not settled by the discussion and must be resolved before production integrations:

1. **Role provisioning:** Are roles assigned by an administrator/invitation, selected during sign-up, or determined another way? How are the first admin accounts created and protected?
2. **Platform:** Native mobile app, responsive web app, or both? The discussion uses both “app” and “web app.”
3. **Stop assignment:** How is each rider associated with a stop on the route?
4. **Connectivity and GPS loss:** What does the driver and rider see when the phone loses GPS or internet? How stale location is shown is also unspecified.
5. **Unclear audio fragment:** The transcript marks a fragment resembling “4,000 / 3,000 to 4,000” and “hand is not steady”; the requirements email excludes it as unclear.
6. **Branding:** The repository/project is Thejway, while the emailed page prototypes use “Thejus College Bus Transit.” Confirm the user-facing name before production branding.

The email says Phase 1 was settled but also lists unresolved decisions above. Treat these items as open, not as implied approval.

## Prototype conflicts and precedence

The earlier Stitch/login material and Adrin's HTML pages are visual/source references, not a requirements override:

- The Stitch design offers route choices, while the requirements say bus/route assignment is admin-only.
- Pass validity, fee UI, and payment screens appear in prototypes, but fees/payments are Phase 2.
- RFID/NFC and biometric quick sign-in appear in the earlier design review, but are not specified in the requirements email.
- The current browser demo is synthetic and local-only; it does not implement production login, cloud storage, Maps, or GPS.

When sources conflict, use this precedence: explicit requirements in the email > prototype behavior. Record any new decision here and on the wiki.

## Demo acceptance checks

The current frontend demo should demonstrate, without claiming production integrations:

- Student and faculty can mark themselves absent; unmarked riders are expected.
- The driver board shows rider status and “eligible to pass” only when all demo riders at that stop are absent.
- Admin can change a demo rider's bus/route; the student view cannot edit that assignment.
- Demo data is visibly synthetic and resets on reload.
- Location and maps are clearly marked unavailable; payment remains deferred.
