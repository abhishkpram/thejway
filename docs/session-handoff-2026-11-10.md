# Session handoff — 2026-11-10 (Session 2 Closeout & Reflection)

This dated snapshot records the closeout and reflection pass for future agents working in this repository. Human-facing requirements and discussions live on the [project wiki](https://github.com/abhishkpram/thejway/wiki).

## 1. Thejway Status & Architecture

- **Core Product**: Cloud-hosted college bus-tracking application for Thejus Engineering College ("Thejway").
- **Primary Operational Goal**: Minimize idle wait times (typically 2 minutes per stop) and driver calls on morning routes (starting 6:00 AM / 7:00 AM across ~10-12 buses).
- **Phase 1 Invariants**:
  - Daily absence marking for students and faculty.
  - Absence default: unmarked means expected to ride.
  - Driver stop board: Displays upcoming stop rider status. A stop is marked "eligible to pass" only when all riders mapped to that stop are absent. Does not alter the predefined route.
  - Live GPS tracking: Supplied directly by the driver's smartphone through the app (no dedicated hardware).
  - Administration: Bus and route assignments are strictly admin-controlled. Students cannot assign or change their own bus.
  - Faculty riders: Identical riding and attendance functions as students, but travel free.
- **Phase 2 (Explicitly Deferred)**:
  - Fee payments and payment gateways.
  - Distance/km-based fee displays.
- **Unresolved Product Decisions**:
  - App platform: Responsive web / PWA vs. native mobile wrapper.
  - User and role provisioning: Account creation, role assignment mechanism, and initial Admin bootstrapping/security.
  - Rider-to-stop mapping logic.
  - Offline / GPS signal loss handling and stale position indicators.

## 2. Worktree & Unreviewed Production Prototype

The working tree contains an unreviewed production integration prototype that was intentionally kept uncommitted and separate from the running synthetic browser demo:
- **Modified**: `.gitignore`, `frontend/app/index.html`, `frontend/app/styles.css`
- **Untracked**:
  - `.firebaserc`, `firebase.json`, `firestore.indexes.json`, `firestore.rules`
  - `frontend/app/app-prod.js` (comprehensive 1,766-line modular Firebase/Firestore client)
  - `frontend/app/boot.js` (dynamic loader switching between `app-prod.js` and demo `app.js`)
  - `frontend/app/firebase-config.js` (public web project configuration for `thejway-app`)
- **Guidance for future agents**:
  - Do not claim these files represent an active or approved production deployment.
  - Preserve these files; do not discard or overwrite them without explicit instruction.
  - The browser demo remains accessible via `python -m http.server 8000 --directory frontend/app`.

## 3. Machine-Specific Automation Context (Cross-Project: AC028 / Aeseyzerotueight)

Context established with parallel agent on AC028 (`c:\Users\abhis\Source\aeseyzerotueight`):
- **Hardware & OS**: HP Windows laptop ("Aeseyzerotueight").
- **Display Constraint**: The top-left corner of the display has damaged pixels; display mode and screen boundaries are intentional and must not be altered.
- **Browser Automation Rules**:
  - **Microsoft Edge only** (`msedge.exe` at `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`).
  - Do **not** use Chrome, Chrome DevTools MCP, or in-app browser popups.
  - **Strict Invariant**: Any agent-launched browser window must remain strictly in the **background** and **never steal window focus or activate into the foreground** (`SW_SHOWMINNOACTIVE = 7`).
  - Automation launcher: `c:\Users\abhis\Source\aeseyzerotueight\scripts\start_browser_use_edge.py` starts Edge with isolated profile `%LOCALAPPDATA%\BrowserUseEdge\Profile` and loopback CDP port `127.0.0.1:9223`.
  - Local daemon: `browser_harness.daemon` (Python 3.13) runs locally on the machine.
  - Attaching to the normal user Edge profile requires remote debugging on that specific instance; do not expose or share loopback endpoints outside local host.

## 4. Next Immediate Steps for Successive Agents

1. **Architecture & Identity Decision**: Resolve the user/admin provisioning model and verify whether Firebase Auth / Firestore is the adopted production path.
2. **Review Untracked Firebase Files**: Audit `firestore.rules` (ensuring role-based isolation) and `app-prod.js` against Phase 1 requirements before staging.
3. **Automated Verification**: When performing browser verification of `http://localhost:8000`, adhere strictly to the background Edge automation script (`start_browser_use_edge.py`) or headless CDP runs.
