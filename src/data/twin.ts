import type { Feed, Ghat, Incident, Resource, Scenario, TimelinePoint } from '../types'

const stamp = '2027-06-30T09:42:00+05:30'

export const ghats: Ghat[] = [
  { id: 'G-01', name: 'Pushkar Ghat', localName: 'పుష్కర ఘాట్', bank: 'East', x: 72, y: 42, capacity: 42000, occupancy: 31860, density: 3.8, inflow: 184, outflow: 126, status: 'restricted', waterDepth: 1.8, access: 'Gate E2 · Havelock Bridge', medical: 'Medical post M-04 · 180 m', source: 'simulation', updatedAt: stamp },
  { id: 'G-02', name: 'Saraswati Ghat', localName: 'సరస్వతి ఘాట్', bank: 'East', x: 77, y: 48, capacity: 28000, occupancy: 14720, density: 2.1, inflow: 112, outflow: 97, status: 'watch', waterDepth: 1.6, access: 'Gate E3 · Godavari Arch', medical: 'Medical post M-06 · 240 m', source: 'simulation', updatedAt: stamp },
  { id: 'G-03', name: 'Gowthami Ghat', localName: 'గౌతమి ఘాట్', bank: 'East', x: 72, y: 53, capacity: 24000, occupancy: 9120, density: 1.4, inflow: 79, outflow: 88, status: 'normal', waterDepth: 1.5, access: 'Gate E5 · Tummalapalli', medical: 'First aid M-08 · 150 m', source: 'simulation', updatedAt: stamp },
  { id: 'G-04', name: 'Kotilingala Revu', localName: 'కోటిలింగల రేవు', bank: 'East', x: 65, y: 35, capacity: 16000, occupancy: 6840, density: 1.3, inflow: 62, outflow: 55, status: 'normal', waterDepth: 1.7, access: 'Northern approach', medical: 'Boat medical unit B-02', source: 'simulation', updatedAt: stamp },
  { id: 'G-05', name: 'Sri Narasimha Nagar Ghat', localName: 'శ్రీనరసింహ నగర్ ఘాట్', bank: 'East', x: 84, y: 42, capacity: 22000, occupancy: 13380, density: 2.2, inflow: 98, outflow: 82, status: 'watch', waterDepth: 1.7, access: 'Gate E1 · Library bridge', medical: 'Medical post M-02 · 120 m', source: 'simulation', updatedAt: stamp },
  { id: 'G-06', name: 'Dowleswaram Barrage Ghat', localName: 'డావలేశ్వరం ఘాట్', bank: 'East', x: 91, y: 56, capacity: 12000, occupancy: 4920, density: 1.0, inflow: 44, outflow: 51, status: 'normal', waterDepth: 1.4, access: 'Barrage service gate', medical: 'Barrage health unit', source: 'simulation', updatedAt: stamp },
  { id: 'G-07', name: 'Venkateswara Ghat', localName: 'వెంకటేశ్వర ఘాట్', bank: 'East', x: 94, y: 38, capacity: 18000, occupancy: 12240, density: 2.0, inflow: 88, outflow: 64, status: 'watch', waterDepth: 1.5, access: 'East bypass', medical: 'Mobile medical van M-12', source: 'simulation', updatedAt: stamp },
  { id: 'G-08', name: 'Goshpada Kshetram', localName: 'గోష్పద క్షేత్రం', bank: 'West', x: 25, y: 45, capacity: 34000, occupancy: 21420, density: 2.9, inflow: 136, outflow: 104, status: 'restricted', waterDepth: 1.8, access: 'Kovvur north ramp', medical: 'Kovvur medical post K-01', source: 'simulation', updatedAt: stamp },
  { id: 'G-09', name: 'Subrahmanyeswara Ghat', localName: 'సుబ్రహ్మణ్యేశ్వర ఘాట్', bank: 'West', x: 18, y: 51, capacity: 25000, occupancy: 15750, density: 2.2, inflow: 102, outflow: 91, status: 'watch', waterDepth: 1.6, access: 'West Gate W4', medical: 'First aid K-04 · 200 m', source: 'simulation', updatedAt: stamp },
  { id: 'G-10', name: 'Nagareswaram Ghat', localName: 'నాగారేశ్వర ఘాట్', bank: 'West', x: 13, y: 58, capacity: 20000, occupancy: 8400, density: 1.2, inflow: 58, outflow: 66, status: 'normal', waterDepth: 1.5, access: 'West Gate W6', medical: 'Nagareswaram clinic', source: 'simulation', updatedAt: stamp },
  { id: 'G-11', name: 'Purushottapatnam Ghat', localName: 'పురుషోत्तమపట్నం ఘాట్', bank: 'East', x: 86, y: 31, capacity: 15000, occupancy: 6300, density: 1.1, inflow: 52, outflow: 49, status: 'normal', waterDepth: 1.3, access: 'Northern service road', medical: 'Field clinic P-02', source: 'simulation', updatedAt: stamp },
  { id: 'G-12', name: 'Seethanagaram Ghat', localName: 'సీతానాగారం ఘాట్', bank: 'East', x: 78, y: 27, capacity: 21000, occupancy: 15960, density: 2.4, inflow: 116, outflow: 78, status: 'watch', waterDepth: 1.5, access: 'Bridge approach W1', medical: 'Medical post S-01', source: 'simulation', updatedAt: stamp },
  { id: 'G-13', name: 'Pattiseema Ghat', localName: 'పట్టీసీమ ఘాట్', bank: 'West', x: 34, y: 28, capacity: 17000, occupancy: 7310, density: 1.2, inflow: 49, outflow: 53, status: 'normal', waterDepth: 1.4, access: 'Pattiseema ramp', medical: 'Boat medic BP-01', source: 'simulation', updatedAt: stamp },
  { id: 'G-14', name: 'Vangalapudi Ghat', localName: 'వంగలపుడి ఘాట్', bank: 'West', x: 43, y: 22, capacity: 14000, occupancy: 5180, density: 1.0, inflow: 41, outflow: 39, status: 'normal', waterDepth: 1.2, access: 'West river road', medical: 'Vangalapudi aid post', source: 'simulation', updatedAt: stamp },
  { id: 'G-15', name: 'Markandeya Ghat', localName: 'మార్కండేయ ఘాట్', bank: 'East', x: 58, y: 61, capacity: 26000, occupancy: 10880, density: 1.3, inflow: 73, outflow: 85, status: 'normal', waterDepth: 1.7, access: 'South causeway', medical: 'Medical post M-11 · 260 m', source: 'simulation', updatedAt: stamp },
  { id: 'G-16', name: 'Shraddhanand Ghat', localName: 'శ్రద్ధానంద ఘాట్', bank: 'East', x: 52, y: 66, capacity: 19000, occupancy: 7410, density: 1.1, inflow: 61, outflow: 69, status: 'normal', waterDepth: 1.6, access: 'South transit route', medical: 'Aid post M-14 · 160 m', source: 'simulation', updatedAt: stamp }
]

export const incidents: Incident[] = [
  { id: 'INC-2407', title: 'Density pressure rising at Gate E2', type: 'crowd', severity: 'critical', status: 'acknowledged', location: 'Pushkar Ghat · East Gate E2', x: 72, y: 42, createdAt: '09:34', owner: 'East Sector DSP', action: 'Open Gate E3 and meter 2-way flow', detail: 'Entry flow exceeds egress by 58 people/min. 30-minute trend predicts threshold breach.', source: 'simulation' },
  { id: 'INC-2406', title: 'Ambulance corridor obstruction', type: 'transport', severity: 'high', status: 'open', location: 'Godavari Arch approach', x: 62, y: 48, createdAt: '09:21', owner: 'Traffic East Joint Collector', action: 'Clear lane and move two shuttle bays', detail: 'Estimated 6-minute access delay. Hospital ETA now 8 minutes.', source: 'field' },
  { id: 'INC-2405', title: 'Heat-related medical cluster', type: 'medical', severity: 'medium', status: 'acknowledged', location: 'Mela sector C', x: 58, y: 55, createdAt: '09:12', owner: 'Medical Control', action: 'Deploy mobile triage and water point', detail: 'Six heat-index cases in 30 minutes; no critical escalation yet.', source: 'field' },
  { id: 'INC-2404', title: 'Water-depth watch', type: 'river', severity: 'medium', status: 'open', location: 'Dowleswaram gauge cluster', x: 88, y: 62, createdAt: '08:55', owner: 'Irrigation Control Room', action: 'Verify gauge and review ramp closure rule', detail: 'Modelled change +0.18 m in 90 minutes. Source CWC feed awaiting government gateway.', source: 'forecast' }
]

export const resources: Resource[] = [
  { id: 'R-B01', name: 'Rescue boats', type: 'boat', total: 184, available: 61, committed: 123, status: 'watch', location: '6 command flotillas', updatedAt: '09:40' },
  { id: 'R-A01', name: 'Ambulances', type: 'ambulance', total: 54, available: 18, committed: 36, status: 'normal', location: '16 field posts', updatedAt: '09:39' },
  { id: 'R-BU1', name: 'Shuttle buses', type: 'bus', total: 487, available: 93, committed: 394, status: 'watch', eta: '18 min headway', location: '5 peripheral loops', updatedAt: '09:40' },
  { id: 'R-M01', name: 'Medical teams', type: 'medical', total: 30, available: 12, committed: 18, status: 'normal', location: '12 field hospitals', updatedAt: '09:38' },
  { id: 'R-S01', name: 'Security deployments', type: 'security', total: 126, available: 14, committed: 112, status: 'restricted', location: '8 sectors', updatedAt: '09:40' }
]

export const crowdTimeline: TimelinePoint[] = [
  { time: '05:00', actual: 18200, forecast: 19000, safe: 42000 },
  { time: '06:00', actual: 26400, forecast: 27200, safe: 42000 },
  { time: '07:00', actual: 43800, forecast: 45100, safe: 42000 },
  { time: '08:00', actual: 71200, forecast: 70400, safe: 42000 },
  { time: '09:00', actual: 94700, forecast: 93200, safe: 42000 },
  { time: '10:00', actual: 118600, forecast: 116800, safe: 42000 },
  { time: '11:00', forecast: 136400, safe: 42000 },
  { time: '12:00', forecast: 148200, safe: 42000 },
  { time: '13:00', forecast: 137900, safe: 42000 },
  { time: '14:00', forecast: 121500, safe: 42000 },
  { time: '15:00', forecast: 105800, safe: 42000 }
]

export const scenarios: Scenario[] = [
  { id: 'baseline', name: 'Current plan', description: 'Ritual peak with normal river level and current assignments.', multiplier: 1, impact: '3 zones approach the 75% intervention threshold.', severity: 'medium' },
  { id: 'surge', name: 'Bus-arrival surge', description: 'Rail arrivals released 20 minutes early at Rajamahendravaram.', multiplier: 1.34, impact: 'Pushkar Ghat reaches critical density in 24 minutes.', severity: 'critical' },
  { id: 'rain', name: 'Heavy rain burst', description: '45 mm rain, upstream rise and 3 access routes degraded.', multiplier: 1.21, impact: 'South approach clearance rises from 12 to 39 minutes.', severity: 'critical' },
  { id: 'gate', name: 'East Gate closure', description: 'Gate E2 unavailable for inspection and manual screening.', multiplier: 1.12, impact: 'Saraswati Ghat receives 4,800 excess arrivals in one hour.', severity: 'high' },
  { id: 'medical', name: 'Medical surge', description: 'Heat incidents triple over the next 30 minutes.', multiplier: 1.07, impact: 'Hospital M-03 reaches 80% of staffed capacity.', severity: 'high' }
]

export const feeds: Feed[] = [
  { name: 'CCTV density counters', authority: 'District CCTV command', state: 'simulated', freshness: '30 sec' },
  { name: 'Godavari water telemetry', authority: 'CWC / Irrigation', state: 'simulated', freshness: '15 min' },
  { name: 'Boat & swimmer registry', authority: 'AP Tourism / NDRF', state: 'simulated', freshness: '2 min' },
  { name: 'Shuttle telemetry', authority: 'APSRTC / Transit cell', state: 'simulated', freshness: '45 sec' },
  { name: 'Field incident reports', authority: 'Sector officers', state: 'simulated', freshness: '4 min' }
]

export const totalOccupancy = ghats.reduce((sum, ghat) => sum + ghat.occupancy, 0)
export const totalCapacity = ghats.reduce((sum, ghat) => sum + ghat.capacity, 0)
