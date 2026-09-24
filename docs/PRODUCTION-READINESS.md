# Production readiness and research record

## 1. Product intent

Pushkara Command is a decision-support digital twin for the multi-agency operation around the 2027 Godavari Pushkaralu. Its core questions are:

1. Where are people, vehicles and essential resources concentrated now?
2. Which riverbank, ghat, route or bridge is likely to become unsafe next?
3. What action, owner and deadline address the risk?
4. What resources are available and what are they committed to?
5. Can field staff continue safely when connectivity fails?

The product deliberately avoids claiming a photorealistic city replica or precise predictive authority without calibrated field data.

## 2. Verified event and regional context

As of 24 September 2026, official East Godavari District material states that the Godavari Pushkaralu 2027 runs from **26 June through 7 July 2027** across six Godavari-basin districts. The official district ghat page lists named ghats on the Rajamahendravaram and Kovvur banks, including Pushkar, Saraswati, Gowthami, Dowleswaram Barrage, Goshpada Kshetram, Subrahmanyeswara and Nagareswaram.

Current government planning reported in August 2026 includes an estimated **8–10 crore visitors**, **440 ghats** across six districts, CCTV and drone monitoring, QR vehicle identification, 2,697 rescue boats, 8,955 trained swimmers and 30 temporary field hospitals. Counts and plans change; a production deployment must ingest the latest signed administrative plan rather than hard-code these figures.

Key sources:

- East Godavari District, event page: https://eastgodavari.ap.gov.in/godavari-pushkaralu-2027/
- East Godavari District, official ghat register: https://eastgodavari.ap.gov.in/ghats
- AP Tourism Boating Operations Management System: https://boatingcontrolroom.aptdc.in/
- The Hindu, AI crowd management planning: https://www.thehindu.com/news/national/andhra-pradesh/ai-to-help-manage-crowd-during-2027-godavari-pushkaralu-in-andhra-pradesh/article71388987.ece
- Deccan Chronicle, technology and preparedness plan: https://www.deccanchronicle.com/southern-states/andhra-pradesh/cm-directs-grand-arrangements-for-akhanda-godavari-pushkarams-1982221
- National Water Data Portal, CWC hourly discharge: https://nwdp.nwic.gov.in/en/dataset/river-discharge-telemetry-hourly-central-water-commission-cwc
- CWC Flood Forecast Dashboard: https://cwc.gov.in/en/ffm_dashboard
- NDMA crowd-management guide: https://ndma.gov.in/sites/default/files/PDF/Reports/managingcrowdsguide.pdf
- India Meteorological Department: https://mausam.gov.in/
- National Disaster Management Authority: https://ndma.gov.in/

## 3. Why previous twins were insufficient

IIIT Hyderabad's Lab for Spatial Informatics used camera-based person detection, tracking and line-crossing counts during the 2015 event, publishing hourly ghat density and supporting announcements and diversion. The project estimated 70–75% count accuracy and delivered useful operational awareness. It also exposed a critical lesson: only about 30–40% of the effort was technology; the remainder was operations, field coordination and failure management.

Historical and retrospective reporting describes a 27–30+ fatality crowd crush at Pushkar Ghat during the 2015 event. Contributing problems included a bottleneck around a high-profile visit, one-sided release of the gate into a concentrated crowd, limited dispersal across ghats and excessive management focus on VIP activity. The twin should therefore detect both **absolute density** and **directional flow pressure**, and every recommendation must be owned by a field authority.

Useful precedent:

- IIIT Hyderabad retrospective: https://www.iiit.ac.in/crowd-control
- The Hindu stampede analysis: https://www.thehindu.com/news/cities/Hyderabad/Pushkaram-stampede-exposes-failure-of-crowd-management/article60193377.ece
- Pushkaralu 2015 gap analysis: https://jchm.in/archive/volume/4/issue_2/article/13932/pdf

A project becomes an unsafe visualization when it:

- shows a map with no owner or action;
- presents a synthetic or estimated value as an exact observation;
- relies on a central connection with no offline procedure;
- uses 3D detail while route capacity and human decisions remain unmodelled;
- imports universal crowd thresholds without local drills and crowd-behaviour expertise;
- tracks individuals without a lawful safety purpose, minimisation policy and retention limit;
- hides model assumptions and has no override or replay process.

This release directly addresses the first seven through source labels, uncertainty, deterministic local rules, intervention workflows, incident ownership, audit activity, scenario results and offline packaging.

## 4. Current digital-twin architecture

### Delivered application

- React 18 and strict TypeScript
- Vite production build
- Recharts operational forecast
- Lucide accessible icon system
- Service-worker PWA with runtime font caching
- Local deterministic simulation, no required API
- Responsive desktop, tablet and mobile layouts

### Model state

The simulation computes:

```text
occupancy percent = occupancy / safe operating capacity
flow balance = inflow - outflow
pressure risk = density contribution + capacity contribution + positive flow contribution
scenario occupancy = bounded(base occupancy × local demand multiplier)
```

The current thresholds and capacities are demonstration assumptions, not government standards. They must be replaced with calibrated local values after drills and historical replay.

## 5. Recommended authority production architecture

Use a modular service deployment rather than introducing microservices prematurely:

```text
CWC / IMD / CCTV / drones / transport / hospital / field devices
                                  │
                    connector and validation gateway
                    auth · retries · deduplication · quality
                                  │
        PostGIS + time-series observations + event ledger
                                  │
                rules engine + model registry + audit
                                  │
             command web · sector consoles · field clients
                                  │
                    local edge cache and task queue
```

### Core stores

- **PostGIS:** ghats, banks, roads, bridges, facilities, routes, sectors and hazard zones.
- **Time-series store:** CWC level/discharge, IMD weather, density, flow, telemetry and forecasts.
- **Event store:** incident, acknowledgement, resource commitment, task, decision and evidence snapshot.
- **Object storage:** approved vector tiles, low-resolution offline maps, documents and incident media.
- **Model registry:** versioned model configuration, input snapshot, output, calibration and accuracy history.

### Connector requirements

Each connector should use a queue with at-least-once delivery, idempotency keys, retry/dead-letter handling, schema validation, freshness alarms and a last-known-good fallback. Raw observations should be immutable; corrections should create a new version. Production connectors must use per-authority service identities and TLS.

### Core records

```text
Place(id, geometry, capacity, status, source, confidence, valid_from, valid_to)
Observation(id, subject, property, value, unit, observed_at, received_at,
            source, quality, confidence, expiry)
Incident(id, type, severity, status, owner, detected_at, confirmed_at, resolved_at)
Alert(id, incident_id, trigger, action, expires_at, approval_required)
Task(id, alert_id, assignee, due_at, status, proof)
Decision(id, incident_id, authority, evidence_snapshot, alternatives, created_at)
Resource(id, type, location, total, available, committed, status, last_confirmed_at)
```

## 6. Operational workflows to implement after data connection

### Crowd control

Calibrate 5–20 m grid zones, anonymous camera counting, entry/exit flow, density, approach velocity and panic-risk indicators. Combine with manual sector verification. Public messages should name an alternative ghat and safe approach, not expose sensitive security locations.

### River and access safety

Ingest CWC observed and forecast level/discharge, IMD rainfall and lightning, barrage releases, local tide and field observations. Generate candidate inundation and closure rules; require field or incident-command confirmation before public release. Routes must be revalidated when water, barriers, weather or bridge status changes.

### Incident command

An alert cannot close when generated. It must be acknowledged by a role, receive a task, collect field evidence and move through `open → acknowledged → actioned → verified → resolved/closed`. A second operator should be able to replay the evidence and decision.

### Offline field continuity

Package sector boundaries, routes, shelters, emergency contacts and procedures. Queue local reports and tasks. On reconnection, show timestamp conflicts and never silently overwrite a later field observation.

## 7. Security, privacy and governance gates

Before live use:

- implement role-based SSO, MFA for command roles and time-limited access;
- separate public, sector operator and emergency-command views;
- encrypt transport, storage, devices and backups;
- log authentication, map changes, alert overrides, resource updates and exports;
- minimize collection; prefer aggregate video analytics over identity or biometric processing;
- establish retention and deletion schedules for video, trajectories, phone data and incidents;
- publish data owners and emergency decision authorities;
- retain non-digital fallbacks: radio, signage, printed maps, human marshals and physical barriers;
- run privacy, security, load, network-failure and mass-gathering field drills.

## 8. Acceptance criteria before declaration “operational”

1. A field officer completes a task with connectivity disabled.
2. Offline reports synchronize without silent loss and surface conflicts.
3. Every critical alert has an owner and acknowledgement.
4. Every major view displays source age and degraded state.
5. A missing sensor never produces false certainty.
6. Routes are checked against current water, crowd and closure conditions.
7. Human override is possible and auditable.
8. Public guidance does not expose vulnerable people or security-sensitive assets.
9. A complete incident and decision replay can be exported.
10. Command-centre outage procedures are documented and rehearsed.

## 9. Recommended implementation phases

1. **Operational discovery:** map command rights, sectors, local thresholds, source owners and past near misses.
2. **Shared picture:** production GIS, CWC/IMD/resource feeds, incident workflow and offline field client.
3. **Decision support:** local density calibration, queues, capacity, rules and route scenarios.
4. **Field validation:** exercises, threshold calibration, false-alarm review and measured response improvement.
5. **Advanced simulation:** agent movement, inundation reachability and multi-district federation only where they improve lead time.

The primary success metric is **operational lead time**: how much earlier a credible risk is detected and acted upon, not dashboard count or 3D realism.
