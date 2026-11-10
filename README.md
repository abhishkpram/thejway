# Thejway

Thejway is a college bus-tracking project. This repository contains the Phase 1 requirements, an interactive frontend demo, and the HTML prototypes received from Adrin.

## Run the demo

No package install or build step is required. From the repository root, run:

```powershell
python -m http.server 8000 --directory frontend/app
```

Then open `http://localhost:8000`.

The demo has Student, Faculty, Driver, and Admin views. It demonstrates daily absence marking, the driver's upcoming-stop board, and admin-only bus assignment. Data is synthetic and held only in browser memory; refreshing resets it.

## Important limitations

This is not a production service. It has no real authentication or authorization, cloud backend, Google Maps integration, live GPS feed, or persistence. The role selector is a demo control, not an access-control boundary. Phase 2 fees and payments are intentionally not implemented.

See [docs/requirements.md](docs/requirements.md) for the sourced requirements and unresolved decisions, [docs/architecture.md](docs/architecture.md) for the demo architecture and run steps, [docs/source-materials.md](docs/source-materials.md) for provenance, and [docs/discussion-transcript.md](docs/discussion-transcript.md) for the supplied translation and transcript. Future-agent guidance is in [AGENTS.md](AGENTS.md); email source pages are preserved in [frontend/prototype-v2/](frontend/prototype-v2/).
