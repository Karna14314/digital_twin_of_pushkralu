# Pushkara Command

A ready-to-run operational digital twin for **Godavari Pushkaralu 2027**, built for the command centre, sector officers and rehearsal exercises—not as a static map or school-project mockup.

The application ships with a complete simulated operating picture, deterministic crowd/river scenario engine, incident ownership workflow, response-resource ledger, route and essential-service views, data-source governance, responsive field layout and an installable offline PWA.

> **Operational safety:** no live government, CCTV, CWC, transport, hospital or boat feed is connected. Every current value is explicitly synthetic. The application must not be used to direct the public or deploy emergency assets until authority-owned data contracts, calibration, access controls and command approval are completed.

## Included product capabilities

- **Command overview** — riverfront occupancy, density, river level, medical load, pressure forecast, active incidents, resources and source freshness.
- **Interactive twin map** — 16 official East Godavari ghat names, both banks, sector pressure, flow, depth, access, medical context and incident markers.
- **Operations board** — all-zone matrix, corridor loads, shuttle/boat/ambulance routes, essential-service capacity and water safety envelope.
- **Scenario laboratory** — current plan, bus-arrival surge, heavy rain, gate closure and medical surge scenarios with projected impact and recommended interventions.
- **Incident command** — severity, evidence, recommended action, owner, acknowledgement and timestamped audit trail.
- **Fleet and resources** — boats, ambulances, buses, medical teams and security deployments with availability and commitment.
- **Integration centre** — source registry, freshness, trust indicators, quality gates and live-operation readiness checklist.
- **Offline PWA** — installable application shell with cached assets and a last-known operating picture during degraded connectivity.
- **Auditability** — source, observation time, quality, model version, acknowledgement and human-override concepts are represented throughout the workflow.

## Run locally

Prerequisites: Node.js 22+ and npm 10+.

```bash
npm install
npm run dev
```

Open the URL printed by Vite. The product starts in clearly labelled `SIMULATION` mode.

## Validate and package

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm audit --audit-level=moderate
```

The production PWA is emitted to `dist/`. It can be served by any static host or government web gateway:

```bash
npm run build
npm exec vite preview
```

## Configuration

Copy `.env.example` to `.env.local` when an API gateway is available. The current release intentionally does not require secrets or a map token and remains usable without a network connection.

## Production data contract

The UI is ready for a modular backend; it is not a substitute for secure authority integrations. The recommended production shape is documented in `docs/PRODUCTION-READINESS.md`. Each observation must carry:

```text
subject, property, value, unit, observed_at, received_at,
source, quality, confidence, expiry, schema_version
```

Every critical alert must carry an owner, recommended action, acknowledgement state, authority and evidence snapshot. The twin must never hide missing or stale data behind a plausible-looking value.

## Source basis

Key research sources and verified planning facts are listed in `docs/PRODUCTION-READINESS.md`. The most important local lesson comes from the 2015 Maha Pushkaralu: crowd technology alone did not prevent a fatal surge. This product therefore makes entry/exit flow, explicit ownership, human acknowledgement and decision replay first-class functions.

## Product status

- Application and simulation logic: **working**
- Offline PWA packaging: **working**
- Automated tests, lint, typecheck and production build: **working**
- Government-authorized live feeds: **not connected**
- Field-calibrated models and command approval: **deployment work required**
