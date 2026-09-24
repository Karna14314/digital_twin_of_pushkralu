import { useState } from 'react'
import { Activity, Ambulance, Check, CheckCircle2, ChevronRight, CircleDot, Clock3, Filter, Flame, MapPin, MessageSquare, Siren, Users, Waves, X } from 'lucide-react'
import { incidents as seedIncidents } from '../data/twin'
import type { Incident } from '../types'

const iconMap = { crowd: Users, medical: Ambulance, river: Waves, transport: Activity, infrastructure: Flame, environment: CircleDot }

export function Incidents() {
  const [incidents, setIncidents] = useState(seedIncidents)
  const [active, setActive] = useState<Incident | null>(incidents[0])
  const [filter, setFilter] = useState<'active' | 'all' | 'resolved'>('active')
  const visible = incidents.filter(item => filter === 'all' || filter === 'resolved' ? (filter === 'all' || item.status === 'resolved') : item.status !== 'resolved')

  const acknowledge = (id: string) => {
    setIncidents(items => items.map(item => item.id === id ? { ...item, status: 'acknowledged' } : item))
    setActive(item => item?.id === id ? { ...item, status: 'acknowledged' } : item)
  }

  return (
    <div className="page-content full-height-page">
      <div className="page-intro"><div><div className="eyebrow">Unified incident system</div><h1>Incidents & actions</h1><p>Every alert has an owner, recommended action, acknowledgement, and expiry.</p></div><button className="primary-button"><Siren size={16} /> Log incident</button></div>
      <div className="incident-workspace">
        <section className="twin-card incident-list-panel">
          <div className="incident-filters"><div>{(['active', 'all', 'resolved'] as const).map(item => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item[0].toUpperCase() + item.slice(1)} <b>{item === 'active' ? incidents.filter(i => i.status !== 'resolved').length : item === 'all' ? incidents.length : 0}</b></button>)}</div><button className="icon-button"><Filter size={16} /></button></div>
          <div className="incident-list">
            {visible.map(incident => {
              const Icon = iconMap[incident.type]
              return (
                <button key={incident.id} className={`incident-card ${active?.id === incident.id ? 'selected' : ''}`} onClick={() => setActive(incident)}>
                  <span className={`incident-symbol ${incident.severity}`}><Icon size={19} /></span>
                  <span className="incident-card-body"><span className="incident-meta"><b>{incident.id}</b><i className={`severity-dot ${incident.severity}`} />{incident.severity}</span><strong>{incident.title}</strong><small><MapPin size={12} />{incident.location}</small><span className="incident-time"><Clock3 size={12} />{incident.createdAt} · {incident.owner}</span></span>
                  <ChevronRight size={17} />
                </button>
              )
            })}
          </div>
        </section>

        {active ? (
          <section className="twin-card incident-detail">
            <div className="detail-head"><div><span className={`severity-badge ${active.severity}`}>{active.severity} priority</span><h2>{active.title}</h2><p><MapPin size={14} />{active.location}</p></div><button className="icon-button" onClick={() => setActive(null)}><X size={18} /></button></div>
            <div className="incident-context"><div className="context-map"><svg viewBox="0 0 400 180"><path d="M0 70C80 100 105 55 175 75s105 40 225 8v97H0Z" fill="#a6d1cc" /><path d="M0 30h400M70 0v180M180 0v180M300 0v180M0 80h400M0 135h400" stroke="#e4e1d7" strokeWidth="7" /><circle cx="195" cy="87" r="20" fill="#d94f45" opacity=".15" /><circle cx="195" cy="87" r="7" fill="#d94f45" stroke="white" strokeWidth="3" /><text x="210" y="82" fontSize="12" fill="#173f3b">{active.location}</text><text x="210" y="98" fontSize="10" fill="#6d7874">Schematic · field confirmation pending</text></svg></div>
              <div className="context-facts"><span><b>Detected</b>{active.createdAt} IST</span><span><b>Source</b><span className="source-chip">{active.source}</span></span><span><b>Owner</b>{active.owner}</span><span><b>Status</b><span className={`status-text ${active.status}`}>{active.status}</span></span></div>
            </div>
            <div className="action-card"><div className="action-label"><Activity size={16} />Recommended action</div><h3>{active.action}</h3><p>{active.detail}</p><div className="action-meta"><span><Clock3 size={14} />Respond within 8 min</span><span><Users size={14} />East Sector DSP + 2 marshals</span></div>{active.status === 'open' ? <button className="primary-button full" onClick={() => acknowledge(active.id)}><CheckCircle2 size={17} /> Acknowledge ownership</button> : <button className="confirmed-button full"><Check size={17} /> Ownership acknowledged at 09:43</button>}</div>
            <div className="activity-log"><div className="card-heading"><div><div className="eyebrow">Audit trail</div><h2>Incident activity</h2></div><button className="text-button"><MessageSquare size={14} /> Add note</button></div>
              <div className="log-item"><i /><span><b>Rule engine generated recommendation</b><small>09:42 · Digital twin · deterministic pressure + flow rule</small></span></div>
              <div className="log-item"><i /><span><b>Field report received</b><small>{active.createdAt} · {active.owner} · {active.source} source</small></span></div>
              {active.status === 'acknowledged' && <div className="log-item"><i /><span><b>Ownership acknowledged by Control Officer</b><small>09:43 · Role-based audit record</small></span></div>}
            </div>
            <button className="secondary-button full"><MessageSquare size={15} /> Add operational note</button>
          </section>
        ) : <section className="twin-card empty-state"><CheckCircle2 size={36} /><h2>No incident selected</h2><p>Select an event to inspect evidence, ownership, and action history.</p></section>}
      </div>
    </div>
  )
}
