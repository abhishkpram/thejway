# Session handoff — 2026-11-10

This is a dated snapshot of the Thejway and browser-control context at closeout. The [project wiki](https://github.com/abhishkpram/thejway/wiki) remains the human-facing requirements and source-of-truth record; this handoff does not change product requirements.

## Thejway status

- Phase 1 requirements are summarized in the wiki Requirements page and the root `AGENTS.md` / Thejway skill. The app is a synthetic, in-memory browser demo; its role selector is not authentication or authorization.
- Phase 1 includes daily absence marking, driver upcoming-stop status, admin-only bus/route assignment, and the intended driver-phone GPS/live location, bus/route/driver details. Payments and distance-based fees remain Phase 2.
- Platform choice, user/role provisioning and first-admin creation, rider-to-stop mapping, and GPS/network loss behavior remain unresolved. Do not invent these decisions or use real rider/location data.
- The project direction is Vercel + Google Firestore. `vercel.json` and `scripts/build-static.mjs` provide static build configuration, but no Vercel deployment was verified. Authentication, Firestore, Maps, GPS, and persistence are not connected.
- `main` contains the Phase 1 demo, the design update (`9ffda46`), and static Vercel build configuration (`8802ba8`). These build files are not proof of a deployed service.

## Local worktree to preserve

At the start of this closeout, the `main` worktree contained pre-existing, unreviewed changes in:

- Modified: `.gitignore`, `frontend/app/index.html`, `frontend/app/styles.css`.
- Untracked: `.firebaserc`, `firebase.json`, `firestore.indexes.json`, `firestore.rules`, `frontend/app/app-prod.js`, `frontend/app/boot.js`, and `frontend/app/firebase-config.js`.

These files were not reviewed, validated, staged, or changed during this closeout. Keep them separate from the documented demo and do not claim they are an approved or working production integration. Review them against the open platform, identity, data-model, and security decisions before deciding whether to adopt them. Preserve them unless their owner directs otherwise.

## Browser-control status

- The user's requirement is Browser Use with the normal Microsoft Edge profile only—not Chrome, Chrome DevTools MCP, an isolated Edge profile, or an in-app browser.
- Browser Use 1.0.0 was installed in the user's Python 3.13 environment in the prior setup work. A standalone Edge test succeeded using a temporary isolated profile; that test did not attach to or access the normal profile.
- The configured `browser-use-edge` launcher currently targets a separate profile on port 9223 and fails on Windows because it references the nonexistent `subprocess.SW_MINIMIZE`. The normal Edge profile had no remote-debugging endpoint when checked, and Edge was not running at that check.
- This closeout did not repair the launcher, enable remote debugging, or inspect any normal-profile pages. The requested cross-platform review is therefore not complete.
- Before attaching Browser Use to normal Edge, use Edge's supported remote-debugging setting for that instance and verify the loopback endpoint. Do not silently fall back to a separate profile; remote debugging grants access to signed-in pages and session data.

## Next steps

1. For product work, confirm web vs. native platform and account/role provisioning, especially creation and protection of the first Admin.
2. Then review the data model, role enforcement/security rules, stop mapping, GPS permissions/cadence/retention, and stale/offline behavior before any production integration.
3. Separately, repair and verify the normal-Edge Browser Use attachment. Only then review the requested open platforms; no such platform pages were reviewed in this session.
4. Keep payments and fee display deferred to Phase 2.

No product tests or build were run during this documentation-only closeout.
