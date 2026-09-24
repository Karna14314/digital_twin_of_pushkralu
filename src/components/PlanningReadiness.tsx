import { Activity, Bus, CheckCircle2, ClipboardCheck, CloudRain, Database, Droplets, ExternalLink, HeartPulse, MapPinned, Radio, ShieldCheck, Sparkles, Users, Waves } from 'lucide-react'
import { domainReadiness, ghatPlanByDistrict, planningMetrics, planningSourceUrls } from '../data/planning'
import type { OperationalDomain } from '../types'

const domainIcons: Record<OperationalDomain, typeof Users> = {
  crowd: Users,
  river: Waves,
  weather: CloudRain,
  transport: Bus,
  health: HeartPulse,
  security: ShieldCheck,
  sanitation: Droplets,
  utilities: Activity,
  technology: Radio,
  command: ClipboardCheck
}

export function PlanningReadiness() {
  const totalGhatPlan = ghatPlanByDistrict.reduce((sum, district) => sum + district.planned, 0)
  const mappedGhatPlan = ghatPlanByDistrict.reduce((sum, district) => sum + district.mapped, 0)
  return (
    <div className="page-content">
      <div className="page-intro"><div><div className="eyebrow">Official plan baseline · 25 Aug 2026</div><h1>2027 readiness command</h1><p>Announced 2027 totals, domain classification, evidence strength and deployment gaps.</p></div><div className="model-state"><Sparkles size={16} /><span>Evidence-aware<b>Plan ≠ live observation</b></span></div></div>

      <div className="readiness-hero">
        <div className="readiness-copy"><span className="evidence-pill"><CheckCircle2 size={14} />Government-announced planning baseline</span><h2>Godavari Pushkaralu 2027</h2><p>26 June – 7 July 2027 · six Andhra districts · projected 8–10 crore visitors</p><div><b>525</b><span>Health master-plan ghats</span><b>440</b><span>ghat development scope</span><b>₹4,026 cr</b><span>programme value</span></div></div>
        <div className="readiness-ring"><div><b>72%</b><span>digital readiness</span></div><small>Composite model coverage,<br />not an authority progress claim</small></div>
      </div>

      <div className="plan-metric-grid">
        {planningMetrics.slice(0, 8).map(metric => { const Icon = domainIcons[metric.domain]; return <div className="plan-metric" key={metric.id}><span className={`plan-icon ${metric.domain}`}><Icon size={18} /></span><div><b>{metric.displayValue}</b><span>{metric.label}</span><small>{metric.unit} · {metric.evidence === 'official-estimate' ? 'estimate' : 'plan'}</small></div></div> })}
      </div>

      <div className="readiness-grid">
        <section className="twin-card domain-card">
          <div className="card-heading"><div><div className="eyebrow">All operational classes</div><h2>Domain readiness</h2></div><span className="tiny-label">10 domains</span></div>
          <div className="domain-list">
            {domainReadiness.map(item => { const Icon = domainIcons[item.domain]; return <article key={item.domain}><span className={`domain-icon ${item.domain}`}><Icon size={17} /></span><div><b>{item.label}</b><p>{item.summary}</p><span><i><em style={{ width: `${item.readiness}%` }} /></i><small>{item.readiness}%</small></span></div><i className={`readiness-status ${item.status}`}>{item.status}</i></article> })}
          </div>
        </section>

        <aside className="readiness-side">
          <section className="twin-card district-plan-card"><div className="card-heading"><div><div className="eyebrow">Development scope</div><h2>440 ghats by district</h2></div><MapPinned size={17} /></div><div className="district-stack">{ghatPlanByDistrict.map(district => <div key={district.district}><span><i style={{ background: district.color }} />{district.district}</span><b>{district.planned}</b><em><i style={{ width: `${district.planned / 175 * 100}%`, background: district.color }} /></em></div>)}</div><div className="coverage-note"><Database size={15} /><span><b>{mappedGhatPlan} of {totalGhatPlan} planned ghats have public named records in this twin.</b>Remaining official coordinates and capacities require the district ghat registry.</span></div></section>
          <section className="twin-card data-truth-card"><div className="eyebrow">Data truth model</div><h2>Never mix evidence classes</h2><div className="truth-list"><span><i className="plan" /><b>Official plan</b><small>Announced target or inventory</small></span><span><i className="estimate" /><b>Official estimate</b><small>Expected range, not observation</small></span><span><i className="simulation" /><b>Simulation</b><small>Exercise or modelled state</small></span><span><i className="sensor" /><b>Observation</b><small>Signed authority feed, timestamped</small></span></div></section>
        </aside>
      </div>

      <section className="twin-card evidence-table-card">
        <div className="card-heading"><div><div className="eyebrow">Traceable evidence</div><h2>2027 plan baseline</h2></div><span className="source-chip">As of 25 Aug 2026</span></div>
        <div className="evidence-head"><span>Measure</span><span>Classification</span><span>Scope</span><span>Source date</span><span>Reference</span></div>
        {planningMetrics.map(metric => <div className="evidence-row" key={metric.id}><span><b>{metric.label}</b><small>{metric.unit}</small></span><span className={`evidence-kind ${metric.evidence}`}>{metric.evidence.replace('official-', '')}</span><span>{metric.scope}</span><span>{metric.sourceDate}</span><a href={planningSourceUrls[metric.id]} target="_blank" rel="noreferrer"><ExternalLink size={15} /></a></div>)}
      </section>

      <div className="official-source-strip"><ShieldCheck size={17} /><span><b>Official event dates and ghat names:</b> East Godavari District Administration. Operational totals are the latest announced Andhra planning figures and must be refreshed when signed district plans supersede them.</span><a href="https://eastgodavari.ap.gov.in/godavari-pushkaralu-2027/" target="_blank" rel="noreferrer">Official portal <ExternalLink size={13} /></a></div>
    </div>
  )
}
