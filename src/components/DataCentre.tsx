import { Activity, AlertTriangle, CheckCircle2, CloudSun, Database, ExternalLink, KeyRound, Radio, RefreshCw, ShieldCheck, Waves } from 'lucide-react'

const sources = [
  { name: '2027 government planning baseline', authority: 'Andhra Pradesh / District Administration', state: 'published', data: 'Dated plan totals with evidence class' },
  { name: 'APPCB & CPCB water quality', authority: 'APPCB / CPCB', state: 'awaiting', data: 'BOD, coliform, nitrate, drains and advisories' },
  { name: 'East Godavari district ghats & hotels', authority: 'District Administration', state: 'awaiting', data: 'Places, capacities, accessibility' },
  { name: 'CWC river telemetry', authority: 'Central Water Commission', state: 'awaiting', data: 'Level, discharge, forecast' },
  { name: 'IMD district weather', authority: 'India Meteorological Department', state: 'awaiting', data: 'Rain, lightning, heat index' },
  { name: 'CCTV edge counters', authority: 'District CCTV command', state: 'awaiting', data: 'Aggregated density and flow' },
  { name: 'AP Tourism boat registry', authority: 'APTDC Boating Control Room', state: 'awaiting', data: 'Boats, operators, patrol status' },
  { name: 'APSRTC fleet feed', authority: 'Transit command', state: 'awaiting', data: 'Vehicle location and load' },
  { name: 'Hospital capacity', authority: 'District Health / HMIS', state: 'awaiting', data: 'Beds, ambulances, triage' },
  { name: 'Field observations', authority: 'Sector reporting channel', state: 'simulated', data: 'Incidents, closures, verification' }
]

export function DataCentre() {
  return <div className="page-content"><div className="page-intro"><div><div className="eyebrow">Data & trust</div><h1>Integration centre</h1><p>Every operational value needs a source, observation time, quality and owner.</p></div><button className="secondary-button"><RefreshCw size={16} /> Run validation</button></div>
    <div className="data-summary"><div><Database size={20} /><span><b>{sources.length} sources</b>Mapped in registry</span></div><div><Radio size={20} /><span><b>30 sec</b>Target operating refresh</span></div><div><ShieldCheck size={20} /><span><b>0</b>Unresolved data incidents</span></div><div><CloudSun size={20} /><span><b>Ready</b>Offline package cached</span></div></div>
    <div className="data-layout"><section className="twin-card source-list"><div className="card-heading"><div><div className="eyebrow">Source registry</div><h2>Production data connectors</h2></div><span className="source-chip">Schema mapped</span></div>{sources.map(source => <div className="source-row" key={source.name}><span className={`source-state ${source.state}`}>{source.state === 'simulated' ? <Activity size={16} /> : <KeyRound size={16} />}</span><div><b>{source.name}</b><small>{source.authority}</small></div><span>{source.data}</span><i className={source.state}>{source.state}</i><button className="icon-button"><ExternalLink size={15} /></button></div>)}</section>
      <aside className="data-side"><section className="twin-card quality-card"><div className="eyebrow">Data quality</div><h2>Rehearsal data quality</h2><div className="quality-score"><b>94</b><span>/100 overall trust</span></div>{['Schema validation', 'Spatial bounds', 'Freshness policy', 'Fallback coverage'].map(label => <div className="quality-row" key={label}><CheckCircle2 size={15} /><span>{label}</span><b>Pass</b></div>)}<div className="quality-row warning"><AlertTriangle size={15} /><span>Live authority feeds</span><b>Pending</b></div></section><section className="twin-card governance-card"><div className="eyebrow">Deployment gate</div><h2>Before live operation</h2><ol><li><span>1</span>Sign data-sharing agreements</li><li><span>2</span>Calibrate local crowd thresholds</li><li><span>3</span>Connect role-based SSO</li><li><span>4</span>Run field and offline drills</li><li><span>5</span>Approve local command procedures</li></ol><button className="primary-button full">Download readiness checklist</button></section></aside></div>
    <section className="twin-card provenance-card"><div className="provenance-mark"><Waves size={20} /></div><div><div className="eyebrow">Important operational notice</div><h2>This installation is a working simulation, not a live government command system.</h2><p>The interface, decision rules, incident audit trail, scenarios and offline PWA are operational. Synthetic data is used because no authorised government, camera, CWC, boat or transport API has been connected. Do not use simulated values to direct the public or deploy emergency assets.</p></div></section>
  </div>
}
