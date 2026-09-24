import { Activity, Ambulance, ArrowDownRight, ArrowUpRight, Clock3, Droplets, Flame, Gauge, HeartPulse, Ship, Siren, Users, Waves } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { crowdTimeline, feeds, incidents, resources, totalCapacity, totalOccupancy } from '../data/twin'
import { pressureRisk } from '../lib/simulation'
import type { Ghat } from '../types'
import { CommandMap } from './CommandMap'

interface OverviewProps {
  ghats: Ghat[]
  selectedGhatId?: string
  onSelectGhat: (ghat: Ghat) => void
  onNavigate: (page: string) => void
}

const compact = new Intl.NumberFormat('en-IN', { notation: 'compact', maximumFractionDigits: 1 })

export function Overview({ ghats, selectedGhatId, onSelectGhat, onNavigate }: OverviewProps) {
  const topRisk = [...ghats].sort((a, b) => pressureRisk(b) - pressureRisk(a)).slice(0, 4)
  const openIncidents = incidents.filter(incident => incident.status !== 'resolved')

  return (
    <div className="page-content">
      <div className="decision-strip">
        <div className="decision-icon"><Siren size={21} /></div>
        <div><b>Command attention required</b><span>East Gate E2 pressure threshold likely within 24 minutes. River is stable; no route closure predicted in the next 3 hours.</span></div>
        <button className="primary-button" onClick={() => onNavigate('incidents')}>Review action board</button>
      </div>

      <div className="metric-grid">
        <Metric icon={Users} label="Pilgrims on riverfront" value={compact.format(totalOccupancy)} note="of 1.86 lakh safe envelope" trend="+8.2%" positive={false} color="teal" />
        <Metric icon={Gauge} label="Peak density" value="3.8" suffix="/m²" note="Pushkar Ghat · threshold 4.0" trend="+0.7" positive={false} color="coral" />
        <Metric icon={Waves} label="Dowleswaram level" value="42.1" suffix="ft" note="Warning level 43.0 ft" trend="+0.12 ft" positive={false} color="blue" />
        <Metric icon={HeartPulse} label="Medical load" value="46" suffix="%" note="12 teams available" trend="Stable" positive color="amber" />
      </div>

      <div className="dashboard-grid">
        <CommandMap ghats={ghats} incidents={incidents} selectedId={selectedGhatId} onSelect={onSelectGhat} />
        <div className="side-stack">
          <section className="twin-card risk-card">
            <div className="card-heading"><div><div className="eyebrow">Risk-ranked sectors</div><h2>Where pressure is building</h2></div><span className="tiny-label">16 monitored</span></div>
            <div className="risk-list">
              {topRisk.map((ghat, index) => (
                <button key={ghat.id} className="risk-row" onClick={() => onSelectGhat(ghat)}>
                  <span className="risk-rank">0{index + 1}</span>
                  <span className="risk-main"><b>{ghat.name}</b><small>{ghat.bank} bank · {ghat.density.toFixed(1)} people/m²</small></span>
                  <span className={`risk-meter risk-${ghat.status}`}><i style={{ width: `${Math.max(15, pressureRisk(ghat) * 100)}%` }} /></span>
                </button>
              ))}
            </div>
            <button className="text-button" onClick={() => onNavigate('operations')}>Open all zones <span>→</span></button>
          </section>

          <section className="twin-card alert-card">
            <div className="card-heading"><div><div className="eyebrow">Incident queue</div><h2>Needs acknowledgement</h2></div><span className="count-pill">{openIncidents.length}</span></div>
            {openIncidents.slice(0, 3).map(incident => (
              <button key={incident.id} className="mini-incident" onClick={() => onNavigate('incidents')}>
                <i className={`severity-dot ${incident.severity}`} />
                <span><b>{incident.title}</b><small><Clock3 size={11} /> {incident.createdAt} · {incident.location}</small></span>
                <span>›</span>
              </button>
            ))}
            <button className="text-button" onClick={() => onNavigate('incidents')}>Open incident board <span>→</span></button>
          </section>
        </div>
      </div>

      <div className="lower-grid">
        <section className="twin-card chart-card">
          <div className="card-heading">
            <div><div className="eyebrow">Network demand</div><h2>Riverfront population & forecast</h2></div>
            <div className="chart-legend"><span><i className="actual" />Observed</span><span><i className="forecast" />Forecast</span><span><i className="threshold" />Action threshold</span></div>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={crowdTimeline} margin={{ top: 12, right: 14, left: -14, bottom: 0 }}>
                <defs>
                  <linearGradient id="actualFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#167a72" stopOpacity=".25" /><stop offset="1" stopColor="#167a72" stopOpacity="0" /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 5" vertical={false} stroke="#e5e1d7" />
                <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fill: '#7c7c73', fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#7c7c73', fontSize: 11 }} tickFormatter={value => compact.format(value)} />
                <Tooltip contentStyle={{ border: '1px solid #d8d4c8', borderRadius: 12, boxShadow: '0 10px 30px #1d30252a' }} formatter={value => [compact.format(Number(value ?? 0)), 'Pilgrims']} />
                <ReferenceLine y={140000} stroke="#d94f45" strokeDasharray="5 5" label={{ value: 'ACTION', position: 'insideTopRight', fill: '#b83e36', fontSize: 10 }} />
                <Area type="monotone" dataKey="forecast" stroke="#d09a33" strokeWidth={2} strokeDasharray="5 4" fill="none" />
                <Area type="monotone" dataKey="actual" stroke="#167a72" strokeWidth={2.5} fill="url(#actualFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="twin-card resource-card">
          <div className="card-heading"><div><div className="eyebrow">Fleet & response</div><h2>Resource readiness</h2></div><button className="icon-button" onClick={() => onNavigate('resources')}><ArrowUpRight size={17} /></button></div>
          {resources.slice(0, 4).map(resource => {
            const Icon = resource.type === 'boat' ? Ship : resource.type === 'ambulance' ? Ambulance : resource.type === 'medical' ? HeartPulse : Activity
            return (
              <div className="resource-row" key={resource.id}>
                <span className={`resource-icon ${resource.type}`}><Icon size={17} /></span>
                <span className="resource-info"><b>{resource.name}</b><small>{resource.available} available · {resource.committed} committed</small><i><em style={{ width: `${resource.available / resource.total * 100}%` }} /></i></span>
                <strong>{Math.round(resource.available / resource.total * 100)}%</strong>
              </div>
            )
          })}
          <div className="resource-note"><Flame size={15} /><span>Fire tender coverage meets demand at current occupancy.</span></div>
        </section>
      </div>

      <section className="twin-card data-health-card">
        <div className="card-heading"><div><div className="eyebrow">Data integrity</div><h2>Operational feed health</h2></div><button className="text-button" onClick={() => onNavigate('data')}>Integration centre <span>→</span></button></div>
        <div className="feed-strip">
          {feeds.map(feed => <div className="feed-item" key={feed.name}><i /><span><b>{feed.name}</b><small>{feed.authority}</small></span><em>{feed.freshness}</em></div>)}
        </div>
        <div className="simulation-banner"><Droplets size={15} /><span><b>Simulation environment:</b> no live government feed is connected. Values are synthetic, decision logic is active, and production ingestion requires the named authority adapter.</span><b>{Math.round(totalOccupancy / totalCapacity * 100)}% of monitored ghat capacity</b></div>
      </section>
    </div>
  )
}

function Metric({ icon: Icon, label, value, suffix, note, trend, positive, color }: { icon: typeof Users; label: string; value: string; suffix?: string; note: string; trend: string; positive: boolean; color: string }) {
  return (
    <div className="metric-card">
      <div className={`metric-icon ${color}`}><Icon size={20} /></div>
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}<small>{suffix}</small></div>
      <div className="metric-note"><span>{note}</span><b className={positive ? 'positive' : 'negative'}>{positive ? <ArrowDownRight size={13} /> : <ArrowUpRight size={13} />}{trend}</b></div>
    </div>
  )
}
