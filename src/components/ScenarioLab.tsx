import { useMemo, useState } from 'react'
import { Activity, AlertOctagon, ArrowRight, Check, Clock3, FlaskConical, RotateCcw, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { ghats, scenarios } from '../data/twin'
import { applyScenario, pressureRisk, scenarioForecast } from '../lib/simulation'
import type { Ghat } from '../types'
import { CommandMap } from './CommandMap'

export function ScenarioLab({ onSelectGhat, selectedGhatId }: { onSelectGhat: (ghat: Ghat) => void; selectedGhatId?: string }) {
  const [activeId, setActiveId] = useState('surge')
  const active = scenarios.find(scenario => scenario.id === activeId) ?? scenarios[0]
  const simulated = useMemo(() => applyScenario(ghats, active.multiplier), [active])
  const result = useMemo(() => scenarioForecast(active, ghats), [active])
  const highest = [...simulated].sort((a, b) => pressureRisk(b) - pressureRisk(a)).slice(0, 3)

  return (
    <div className="page-content">
      <div className="page-intro"><div><div className="eyebrow">Decision rehearsal</div><h1>Scenario laboratory</h1><p>Stress-test operational assumptions before they reach the riverfront.</p></div><div className="model-state"><FlaskConical size={16} /><span>Model v1.4<b>Transparent rules · local run</b></span></div></div>
      <div className="scenario-layout">
        <aside className="twin-card scenario-list">
          <div className="card-heading"><div><div className="eyebrow">Scenario set</div><h2>Operational stress tests</h2></div></div>
          {scenarios.map(scenario => (
            <button key={scenario.id} className={`scenario-option ${active.id === scenario.id ? 'active' : ''}`} onClick={() => setActiveId(scenario.id)}>
              <span className={`scenario-icon ${scenario.severity}`}><Activity size={17} /></span>
              <span><b>{scenario.name}</b><small>{scenario.description}</small></span>
              {active.id === scenario.id && <Check size={16} />}
            </button>
          ))}
          <div className="scenario-disclaimer"><ShieldCheck size={16} /><span>Planning aid only. Scenario outcomes do not authorize an operational order.</span></div>
        </aside>

        <main className="scenario-main">
          <section className="twin-card scenario-result">
            <div className="scenario-title"><div><div className="eyebrow">Modelled outcome · +30 minutes</div><h2>{active.name}</h2><p>{active.impact}</p></div><button className="secondary-button"><RotateCcw size={15} /> Re-run model</button></div>
            <div className="outcome-grid">
              <div><span><Users size={17} /> Projected riverfront</span><strong>{result.projected.toLocaleString('en-IN')}</strong><small>People across 16 mapped ghats</small></div>
              <div><span><AlertOctagon size={17} /> Critical zones</span><strong className={result.critical ? 'danger-text' : ''}>{result.critical}</strong><small>Density at or above 3.2/m²</small></div>
              <div><span><ShieldCheck size={17} /> Model pressure</span><strong>{Math.round(result.peak * 100)}%</strong><small>Composite risk index</small></div>
            </div>
          </section>
          <CommandMap ghats={simulated} incidents={[]} selectedId={selectedGhatId} onSelect={onSelectGhat} showResources />
          <section className="twin-card recommendations">
            <div className="card-heading"><div><div className="eyebrow">Recommended plan</div><h2>Interventions before peak</h2></div><span className="model-confidence"><Sparkles size={13} /> 86% confidence</span></div>
            <div className="recommendation-list">
              {highest.map((ghat, index) => (
                <div key={ghat.id} className="recommendation-row"><span>0{index + 1}</span><div><b>{index === 0 ? `Meter entry at ${ghat.name}` : `Open overflow route toward ${ghat.name}`}</b><p>{index === 0 ? 'Release inflow in 4-minute cycles and position marshals at both ends of the active queue.' : `Pre-open the ${ghat.access.toLowerCase()} corridor and move two service teams before density rises.`}</p></div><span className="time-impact"><Clock3 size={13} />{12 + index * 7} min</span><button className="icon-button"><ArrowRight size={16} /></button></div>
              ))}
              <div className="recommendation-row"><span>04</span><div><b>Move the south medical post 300 m</b><p>Creates a 90 m protected ambulance corridor and removes the forecast conflict with the west approach queue.</p></div><span className="time-impact"><Clock3 size={13} />8 min</span><button className="icon-button"><ArrowRight size={16} /></button></div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
