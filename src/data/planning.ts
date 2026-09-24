import type { DomainReadiness, PlanningMetric } from '../types'

export const planAsOf = '2026-08-25'

export const planningSourceUrls: Record<string, string> = {
  visitors: 'https://theprint.in/india/andhra-govt-to-deploy-over-30000-medical-personnel-for-godavari-pushkarams-2027/3023863/',
  ghats: 'https://theprint.in/india/andhra-govt-to-deploy-over-30000-medical-personnel-for-godavari-pushkarams-2027/3023863/',
  'ghat-works': 'https://timesofindia.indiatimes.com/city/vijayawada/ap-plans-rs-4000-crore-works-for-godavari-pushkaralu-2027/articleshow/133520365.cms',
  works: 'https://timesofindia.indiatimes.com/city/vijayawada/ap-plans-rs-4000-crore-works-for-godavari-pushkaralu-2027/articleshow/133520365.cms',
  'rescue-boats': 'https://timesofindia.indiatimes.com/city/vijayawada/ap-plans-rs-4000-crore-works-for-godavari-pushkaralu-2027/articleshow/133520365.cms',
  swimmers: 'https://timesofindia.indiatimes.com/city/vijayawada/ap-plans-rs-4000-crore-works-for-godavari-pushkaralu-2027/articleshow/133520365.cms',
  ambulances: 'https://theprint.in/india/andhra-govt-to-deploy-over-30000-medical-personnel-for-godavari-pushkarams-2027/3023863/',
  'field-hospitals': 'https://theprint.in/india/andhra-govt-to-deploy-over-30000-medical-personnel-for-godavari-pushkarams-2027/3023863/',
  'medical-camps': 'https://theprint.in/india/andhra-govt-to-deploy-over-30000-medical-personnel-for-godavari-pushkarams-2027/3023863/',
  'first-aid': 'https://theprint.in/india/andhra-govt-to-deploy-over-30000-medical-personnel-for-godavari-pushkarams-2027/3023863/',
  buses: 'https://timesofindia.indiatimes.com/city/vijayawada/ap-plans-rs-4000-crore-works-for-godavari-pushkaralu-2027/articleshow/133520365.cms',
  panchayats: 'https://www.deccanchronicle.com/southern-states/andhra-pradesh/cm-directs-grand-arrangements-for-akhanda-godavari-pushkarams-1982221',
  'health-posts': 'https://theprint.in/india/andhra-govt-to-deploy-over-30000-medical-personnel-for-godavari-pushkarams-2027/3023863/',
  'health-personnel': 'https://theprint.in/india/andhra-govt-to-deploy-over-30000-medical-personnel-for-godavari-pushkarams-2027/3023863/',
  volunteers: 'https://www.deccanchronicle.com/southern-states/andhra-pradesh/andhra-pradesh-14488-volunteers-register-for-godavari-pushkaralu-2027-1988835',
  roads: 'https://www.newindianexpress.com/states/andhra-pradesh/2026/Sep/10/godavari-pushkaralu-rs-300-cr-for-road-works-across-six-districts-in-andhra-pradesh'
}

export const planningMetrics: PlanningMetric[] = [
  { id: 'visitors', label: 'Pilgrim estimate', value: 90000000, displayValue: '8–10 crore', unit: 'visitors', domain: 'crowd', evidence: 'official-estimate', source: 'Andhra Pradesh health and infrastructure planning reported by PTI and established press', sourceDate: '2026-08-24', scope: 'Andhra event estimate; not a live or unique-person count', confidence: 'high' },
  { id: 'ghats', label: 'Health master-plan ghats', value: 525, displayValue: '525', unit: 'ghats', domain: 'health', evidence: 'official-plan', source: 'Andhra Pradesh Health Department release reported by PTI', sourceDate: '2026-08-24', scope: '225 existing and 300 proposed new operating ghats', confidence: 'high' },
  { id: 'ghat-works', label: 'Ghat development scope', value: 440, displayValue: '440', unit: 'ghats', domain: 'command', evidence: 'official-plan', source: 'Andhra Pradesh infrastructure review reported by TOI', sourceDate: '2026-08-25', scope: '259 existing upgraded and 181 new; separate from the Health master plan', confidence: 'high' },
  { id: 'works', label: 'Development works', value: 4932, displayValue: '4,932', unit: 'works', domain: 'command', evidence: 'official-plan', source: 'Andhra Pradesh government review reported by TOI', sourceDate: '2026-08-25', scope: '₹4,026 crore programme; ₹899 crore allocated', confidence: 'high' },
  { id: 'rescue-boats', label: 'Rescue boats', value: 2697, displayValue: '2,697', unit: 'boats', domain: 'river', evidence: 'official-plan', source: 'Andhra Pradesh government review reported by Deccan Chronicle', sourceDate: '2026-08-25', scope: 'Planned fleet; availability must be confirmed by flotilla leads', confidence: 'high' },
  { id: 'swimmers', label: 'Trained swimmers', value: 8955, displayValue: '8,955', unit: 'personnel', domain: 'river', evidence: 'official-plan', source: 'Andhra Pradesh government review reported by Deccan Chronicle', sourceDate: '2026-08-25', scope: 'Planned trained swimmer strength', confidence: 'high' },
  { id: 'ambulances', label: 'Medical support vehicles', value: 523, displayValue: '523', unit: 'vehicles', domain: 'health', evidence: 'official-plan', source: 'Andhra Pradesh Health Department release reported by PTI', sourceDate: '2026-08-24', scope: '108 ambulances, 104 mobile health units, 19 boat ambulances and other support vehicles', confidence: 'high' },
  { id: 'field-hospitals', label: 'Temporary field hospitals', value: 30, displayValue: '30', unit: 'hospitals', domain: 'health', evidence: 'official-plan', source: 'Andhra Pradesh government review reported by Deccan Chronicle', sourceDate: '2026-08-25', scope: 'Laboratory-supported field hospitals', confidence: 'high' },
  { id: 'medical-camps', label: 'Medical camps', value: 1110, displayValue: '1,110', unit: 'camps', domain: 'health', evidence: 'official-plan', source: 'Health department review reported by Deccan Chronicle', sourceDate: '2026-08-25', scope: 'Health proposal for medical coverage', confidence: 'high' },
  { id: 'first-aid', label: 'First-aid posts', value: 950, displayValue: '950', unit: 'posts', domain: 'health', evidence: 'official-plan', source: 'Health department review reported by Deccan Chronicle', sourceDate: '2026-08-25', scope: 'Health proposal', confidence: 'high' },
  { id: 'buses', label: 'Green-energy buses', value: 487, displayValue: '487', unit: 'buses', domain: 'transport', evidence: 'official-plan', source: 'Andhra Pradesh government review reported by Deccan Chronicle', sourceDate: '2026-08-25', scope: 'Planned fleet', confidence: 'high' },
  { id: 'panchayats', label: 'Model Pushkar Panchayats', value: 50, displayValue: '50 of 260', unit: 'panchayats', domain: 'sanitation', evidence: 'official-plan', source: 'Andhra Pradesh government review reported by Deccan Chronicle', sourceDate: '2026-08-25', scope: 'Muni Kudali selected as pilot', confidence: 'high' },
  { id: 'health-posts', label: 'Health posts', value: 300, displayValue: '300', unit: 'posts', domain: 'health', evidence: 'official-plan', source: 'Andhra Pradesh Health Department release reported by PTI', sourceDate: '2026-08-24', scope: 'In addition to first-aid and field-hospital layers', confidence: 'high' },
  { id: 'health-personnel', label: 'Core health personnel', value: 30196, displayValue: '30,196', unit: 'personnel', domain: 'health', evidence: 'official-plan', source: 'Andhra Pradesh Health Department release reported by PTI', sourceDate: '2026-08-24', scope: 'Plus approximately 1,600 temporary staff', confidence: 'high' },
  { id: 'volunteers', label: 'Registered volunteers', value: 14488, displayValue: '14,488', unit: 'people', domain: 'command', evidence: 'published-observation', source: 'Andhra Pradesh volunteer registration reported by Deccan Chronicle', sourceDate: '2026-09-19', scope: 'Registration count; not a duty roster or verified attendance', confidence: 'high' },
  { id: 'roads', label: 'Priority road package', value: 431, displayValue: '78 roads · 431 km', unit: 'roads', domain: 'transport', evidence: 'official-plan', source: 'Andhra Pradesh road package reported by TNIE', sourceDate: '2026-09-10', scope: '₹300 crore; 41 highway stretches and 37 MDR routes', confidence: 'high' }
]

export const ghatPlanByDistrict = [
  { district: 'BR Ambedkar Konaseema', planned: 175, mapped: 4, color: '#167a72' },
  { district: 'Kakinada', planned: 88, mapped: 1, color: '#3e8198' },
  { district: 'East Godavari', planned: 82, mapped: 14, color: '#d29a32' },
  { district: 'Eluru', planned: 44, mapped: 0, color: '#8b75a8' },
  { district: 'West Godavari', planned: 40, mapped: 3, color: '#c76d4e' },
  { district: 'Polavaram', planned: 11, mapped: 0, color: '#7b9466' }
]

export const domainReadiness: DomainReadiness[] = [
  { domain: 'crowd', label: 'Crowd & ritual flow', readiness: 68, status: 'in-progress', records: 16, summary: 'Sixteen official East Godavari ghat records mapped; aggregate counters require authority feeds.' },
  { domain: 'river', label: 'River safety & rescue', readiness: 62, status: 'validation-required', records: 16, summary: 'Official 2,697-boat and 8,955-swimmer plan captured; live status and local water safety remain unverified.' },
  { domain: 'transport', label: 'Road, rail & shuttle', readiness: 59, status: 'in-progress', records: 5, summary: '487-bus plan and corridor simulations available; live route and parking feeds pending.' },
  { domain: 'health', label: 'Medical & ambulance', readiness: 73, status: 'in-progress', records: 5, summary: 'Health proposal totals captured; hospital, ambulance and triage states await HMIS integration.' },
  { domain: 'security', label: 'Security & incident', readiness: 76, status: 'in-progress', records: 4, summary: 'Incident ownership and audit workflow active; sector deployment feed pending.' },
  { domain: 'sanitation', label: 'Sanitation & environment', readiness: 54, status: 'validation-required', records: 6, summary: 'ZLD, water-quality and pollution risks are classified; APPCB/CPCB live samples are not connected.' },
  { domain: 'technology', label: 'CCTV, AI & communications', readiness: 71, status: 'in-progress', records: 5, summary: 'AI analytics, CCTV, drone and QR workflows modelled; no camera stream is connected.' },
  { domain: 'utilities', label: 'Water, power & communications', readiness: 64, status: 'in-progress', records: 5, summary: 'Essential-service capacity view active; utility meters and backup status pending.' },
  { domain: 'weather', label: 'Weather & disaster', readiness: 66, status: 'validation-required', records: 4, summary: 'IMD and CWC integration contracts defined; drill calibration and live observations pending.' },
  { domain: 'command', label: 'Multi-agency command', readiness: 81, status: 'in-progress', records: 12, summary: 'Shared picture, incidents, resources and decisions are functional in the command application.' }
]
