# Architecture and local development

## Current implementation

The repository currently ships a dependency-free browser demo:

- `frontend/app/index.html` — accessible app shell and role selector.
- `frontend/app/app.js` — synthetic fleet/rider data and the Student, Faculty, Driver, and Admin demo views.
- `frontend/app/styles.css` — responsive styling using local CSS; no external runtime dependencies.
- `frontend/prototype-v2/` — preserved HTML pages extracted from Adrin's emails. These are reference artifacts, not the app entry point.

The demo state lives only in JavaScript memory and is reset on reload. It has no server-side persistence, authentication, authorization, location feed, or map SDK. The role selector is a preview control and is not a security boundary.

## Run locally

From the repository root:

```powershell
python -m http.server 8000 --directory frontend/app
```

Open `http://localhost:8000`. Python's standard-library HTTP server is sufficient; no package installation or build is needed.

## Demo data flow

- Ten synthetic buses are shown as Bus 01–10, each with a synthetic route label.
- Three synthetic riders are mapped to demo stops and Bus 01.
- Student and Faculty views share absence-marking behavior.
- The Driver view reads the same in-memory absence and assignment state to display the upcoming-stop status.
- The Admin view can assign the demo riders to any sample bus. A bus assignment maps to that bus's demo route.
- Reset demo clears absence state and restores initial assignments.

No real person, route, phone number, GPS coordinate, or bus detail is included.

## Production integration boundaries

The requirements call for cloud hosting, credential login, role-based permissions, a Google Maps API, and driver-phone GPS. None is configured in this repository. Before implementing those integrations, decide:

- The platform (native, web, or both) and identity/account provisioning.
- The cloud backend, database, authorization model, and admin bootstrap process.
- The rider-to-stop and bus/driver/route data model.
- Location permission, update frequency, retention, privacy, stale-location, and offline behavior.
- Maps API key management and service costs.
- Operational rules for absence cut-off times and route/stop handling.

Do not add real credentials or location data to the repository. Keep the local recording in the ignored `downloads/` folder.

## Manual browser smoke test

1. Open the Student view and confirm the default is “Expected to ride today.”
2. Mark the demo student absent and switch to Driver; confirm the rider is “Absent” while another expected rider keeps the stop at “plan to stop.”
3. Switch to Faculty, mark absent, then switch to Driver; confirm the stop with that sole demo rider becomes “Eligible to pass.”
4. Switch to Admin, change a rider's bus, and switch back to Student; confirm the assigned bus changes and there is no student-side assignment editor.
5. Reset demo and confirm the original bus and attendance state return.

This smoke test was exercised in the browser during initial setup.
