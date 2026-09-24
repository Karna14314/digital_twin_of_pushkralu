import { useState } from 'react'
import { Activity, Ambulance, ArrowRight, Bus, CheckCircle2, Clock3, Droplets, Navigation, Route, Ship, Users, Waves } from 'lucide-react'
import { resources } from '../data/twin'
import { densityColor, flowBalance, occupancyPercent } from '../lib/simulation'
import type { Ghat } from '../types'
import { CommandMap } from './CommandMap'

export function Operations({ ghats: stateGhats, onSelectGhat, selectedGhatId }: { ghats: Ghat[]; onSelectGhat: (ghat: Ghat) => void; selectedGhatId?: string }) {
  const [tab, setTab] = useState<'zones' | 'routes' | 'services'>('zones')
  return (
    <div className="page-content full-height-page">
      <div className="page-intro"><div><div className="eyebrow">Common operating picture</div><h1>Operations board</h1><p>Crowd, river, access and essential services across both banks.</p></div><div className="sync-pill"><i />Twin synchronized · 09:42:30</div></div>
      <div className="view-tabs">{(['zones', 'routes', 'services'] as const).map(item => <button key={item} className={tab === item ? 'active' : ''} onClick={() => setTab(item)}>{item === 'zones' ? <Users size={15} /> : item === 'routes' ? <Route size={15} /> : <Droplets size={15} />}{item[0].toUpperCase() + item.slice(1)}</button>)}</div>
      {tab === 'zones' && <div className="operations-grid"><CommandMap ghats={stateGhats} incidents={[]} selectedId={selectedGhatId} onSelect={onSelectGhat} showResources /><ZoneTable ghats={stateGhats} onSelect={onSelectGhat} /></div>}
      {tab === 'routes' && <RoutesView />}
      {tab === 'services' && <ServicesView />}
    </div>
  )
}

function ZoneTable({ ghats, onSelect }: { ghats: Ghat[]; onSelect: (ghat: Ghat) => void }) {
  return <section className="twin-card zone-table"><div className="card-heading"><div><div className="eyebrow">Zone register</div><h2>All bathing ghats</h2></div><span className="tiny-label">Density & flow</span></div><div className="table-head"><span>Zone</span><span>Density</span><span>Occupancy</span><span>Net flow</span><span>Status</span></div>{ghats.map(ghat => <button className="table-row" key={ghat.id} onClick={() => onSelect(ghat)}><span><b>{ghat.name}</b><small>{ghat.id} · {ghat.bank} bank</small></span><span className="density-cell"><i style={{ background: densityColor(ghat.density) }} />{ghat.density.toFixed(1)}/m²</span><span><b>{occupancyPercent(ghat)}%</b><small>{ghat.occupancy.toLocaleString('en-IN')}</small></span><span className={flowBalance(ghat) > 0 ? 'danger-text' : 'positive'}>{flowBalance(ghat) > 0 ? '+' : ''}{flowBalance(ghat)}/min</span><span className={`status-pill ${ghat.status}`}>{ghat.status}</span></button>)}</section>
}

function RoutesView() {
  const routes = [
    { name: 'Rail → East ghat shuttle', mode: 'Bus', load: 84, time: '18 min', status: 'Flowing', note: '5 loops · 93 buses available' },
    { name: 'West parking → Goshpada', mode: 'Bus', load: 71, time: '12 min', status: 'Flowing', note: '3 loops · 27 buses available' },
    { name: 'Kovvur bridge pedestrian', mode: 'Walk', load: 62, time: '16 min', status: 'Watch', note: 'South counterflow narrow' },
    { name: 'Emergency medical ring', mode: 'Ambulance', load: 46, time: '7 min', status: 'Protected', note: 'Godavari Arch partially obstructed' },
    { name: 'Tourist boat terminal', mode: 'Boat', load: 38, time: '22 min', status: 'Flowing', note: '2 boarding banks' }
  ]
  return <div className="route-grid">{routes.map(route => <div className="twin-card route-card" key={route.name}><div className="route-head"><span>{route.mode === 'Bus' ? <Bus size={20} /> : route.mode === 'Walk' ? <Users size={20} /> : route.mode === 'Boat' ? <Ship size={20} /> : <Ambulance size={20} />}<b>{route.mode}</b></span><i className={`status-pill ${route.status === 'Watch' ? 'watch' : 'normal'}`}>{route.status}</i></div><h2>{route.name}</h2><p>{route.note}</p><div className="route-load"><span>Corridor load <b>{route.load}%</b></span><i><em style={{ width: `${route.load}%` }} /></i></div><div className="route-footer"><span><Clock3 size={14} />{route.time} headway</span><button>Inspect flow <ArrowRight size={14} /></button></div></div>)}</div>
}

function ServicesView() {
  const serviceRows = [
    { name: 'Medical', available: 12, total: 30, detail: '12 field hospitals · 54 ambulances' },
    { name: 'Toilets', available: 18420, total: 24000, detail: '6,580 blocks need service' },
    { name: 'Drinking water', available: 91, total: 100, detail: 'Average tank 82% full' },
    { name: 'Food counters', available: 214, total: 240, detail: '26 counters at high demand' },
    { name: 'Lost & found', available: 8, total: 10, detail: '37 open reports · none critical' }
  ]
  return <div className="services-layout"><section className="twin-card services-card"><div className="card-heading"><div><div className="eyebrow">Capacity board</div><h2>Essential services</h2></div><span className="tiny-label">Updated 2 min ago</span></div>{serviceRows.map(item => { const value = Math.min(100, item.total > 1000 ? item.available / item.total * 100 : item.available / item.total * 100); return <div className="service-row" key={item.name}><div><b>{item.name}</b><span>{item.detail}</span></div><div className="service-meter"><i><em style={{ width: `${value}%` }} /></i><small>{item.available.toLocaleString('en-IN')} / {item.total.toLocaleString('en-IN')}</small></div><span className={value < 55 ? 'warning-text' : 'positive'}>{value < 55 ? 'Watch' : 'Ready'}</span></div>})}</section><section className="twin-card water-card"><div className="eyebrow">River operations</div><h2>Godavari safety envelope</h2><div className="water-gauge"><div><Waves size={25} /><span><b>42.10 ft</b>Dowleswaram modelled level</span></div><i><em style={{ width: '78%' }} /><b className="warning-line" /></i><div className="gauge-labels"><span>Normal 36</span><span>Warning 43</span><span>Severe 48</span></div></div><div className="water-facts"><span><b>+0.18 m</b>90 min rise</span><span><b>1.4 m/s</b>mid-channel speed</span><span><b>0.7 m</b>forecast freeboard</span></div><div className="field-confirm"><CheckCircle2 size={16} /><span><b>No closure rule active</b>Field gauge confirmation still required before operational use.</span></div></section></div>
}

export function ResourcesPage() {
  return <div className="page-content"><div className="page-intro"><div><div className="eyebrow">Resource ledger</div><h1>Fleet & response assets</h1><p>Availability, commitment, location and last field confirmation.</p></div><button className="primary-button"><Navigation size={16} /> Dispatch board</button></div><div className="resource-page-grid">{resources.map(resource => { const percentage = resource.available / resource.total * 100; const Icon = resource.type === 'boat' ? Ship : resource.type === 'ambulance' ? Ambulance : resource.type === 'bus' ? Bus : resource.type === 'medical' ? Activity : Users; return <section className="twin-card resource-detail-card" key={resource.id}><div className={`large-resource-icon ${resource.type}`}><Icon size={25} /></div><div className="card-heading"><div><div className="eyebrow">{resource.id}</div><h2>{resource.name}</h2></div><span className={`status-pill ${resource.status}`}>{resource.status}</span></div><div className="asset-total"><b>{resource.available}</b><span>available of {resource.total}</span></div><div className="asset-bar"><i style={{ width: `${percentage}%` }} /></div><div className="asset-facts"><span><b>{resource.committed}</b>Committed</span><span><b>{resource.location}</b>Primary location</span><span><b>{resource.updatedAt}</b>Last update</span></div><button className="secondary-button full">View all units <ArrowRight size={15} /></button></section> })}</div></div>
}
