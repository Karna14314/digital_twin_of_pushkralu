import { lazy, Suspense, useMemo, useState } from 'react'
import { Activity, Bell, BookOpen, ChevronDown, ClipboardCheck, CloudSun, Command, Database, FlaskConical, LayoutDashboard, LifeBuoy, MapPinned, Menu, Radio, Search, Settings, ShieldCheck, Siren, Users, X } from 'lucide-react'
import { ghats } from './data/twin'
import type { Ghat } from './types'

const Overview = lazy(() => import('./components/Overview').then(module => ({ default: module.Overview })))
const Operations = lazy(() => import('./components/Operations').then(module => ({ default: module.Operations })))
const ResourcesPage = lazy(() => import('./components/Operations').then(module => ({ default: module.ResourcesPage })))
const ScenarioLab = lazy(() => import('./components/ScenarioLab').then(module => ({ default: module.ScenarioLab })))
const Incidents = lazy(() => import('./components/Incidents').then(module => ({ default: module.Incidents })))
const DataCentre = lazy(() => import('./components/DataCentre').then(module => ({ default: module.DataCentre })))
const PlanningReadiness = lazy(() => import('./components/PlanningReadiness').then(module => ({ default: module.PlanningReadiness })))

const navigation = [
  { id: 'overview', label: 'Command overview', icon: LayoutDashboard },
  { id: 'readiness', label: '2027 readiness', icon: ClipboardCheck },
  { id: 'operations', label: 'Operations board', icon: MapPinned },
  { id: 'scenarios', label: 'Scenario laboratory', icon: FlaskConical },
  { id: 'incidents', label: 'Incidents & actions', icon: Siren, badge: 4 },
  { id: 'resources', label: 'Fleet & resources', icon: LifeBuoy },
  { id: 'data', label: 'Data & integrations', icon: Database }
]

export default function App() {
  const [page, setPage] = useState('overview')
  const [selectedGhat, setSelectedGhat] = useState<Ghat | undefined>()
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pageTitle = useMemo(() => navigation.find(item => item.id === page)?.label ?? 'Command overview', [page])

  const selectGhat = (ghat: Ghat) => setSelectedGhat(current => current?.id === ghat.id ? undefined : ghat)
  const navigate = (target: string) => { setPage(target); setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="brand"><div className="brand-mark"><span>॥</span><i /></div><div><b>Pushkara</b><span>COMMAND</span></div><button className="mobile-close" onClick={() => setMobileOpen(false)}><X size={19} /></button></div>
        <div className="event-chip"><div className="event-symbol"><Activity size={18} /></div><span><b>Godavari Pushkaralu</b><small>26 Jun — 07 Jul 2027</small></span><i>REHEARSAL</i></div>
        <nav>
          <div className="nav-label">Mission operations</div>
          {navigation.map(item => { const Icon = item.icon; return <button key={item.id} className={page === item.id ? 'active' : ''} onClick={() => navigate(item.id)}><Icon size={18} /><span>{item.label}</span>{item.badge && <b className="nav-badge">{item.badge}</b>}</button> })}
          <div className="nav-label second">Public & support</div>
          <button onClick={() => setSearchOpen(true)}><Users size={18} /><span>Pilgrim information</span></button>
          <button onClick={() => navigate('data')}><BookOpen size={18} /><span>Response library</span></button>
        </nav>
        <div className="sidebar-bottom">
          <div className="simulation-state"><span><i />Simulation mode</span><small>Authority data not connected</small></div>
          <button><Settings size={17} /><span>Administration</span></button>
        </div>
      </aside>

      <div className="main-shell">
        <header className="topbar">
          <button className="menu-button" onClick={() => setMobileOpen(true)}><Menu size={20} /></button>
          <div className="breadcrumb"><span>Operations</span><b>/</b><strong>{pageTitle}</strong></div>
          <div className="top-actions">
            <div className="weather-chip"><CloudSun size={18} /><span><b>31°C sim</b>Feels 36°</span><i /><span><b>24 km/h sim</b>SW wind</span></div>
            <button className="icon-button search-button" onClick={() => setSearchOpen(true)}><Search size={18} /></button>
            <div className="notification-wrap"><button className="icon-button" onClick={() => setNotificationsOpen(value => !value)}><Bell size={18} /><i className="notification-dot" /></button>{notificationsOpen && <div className="notification-panel"><div><b>Notifications</b><button onClick={() => setNotificationsOpen(false)}>Mark all read</button></div><article><i className="critical" /><span><b>Gate E2 pressure threshold</b><small>Critical · 1 min ago</small></span></article><article><i className="medium" /><span><b>Ambulance corridor obstruction</b><small>High · 21 min ago</small></span></article><article><i className="low" /><span><b>Rajamahendravaram loop load updated</b><small>Info · 6 min ago</small></span></article></div>}</div>
            <button className="role-button"><span>Control Officer</span><ChevronDown size={15} /></button>
            <div className="avatar">CO</div>
          </div>
        </header>

        <div className="demo-banner"><Radio size={13} /><span><b>2027 DIGITAL TWIN</b> · Official planning baseline + synthetic live state · simulation clock 30 Jun 2027, 09:42 IST</span><button onClick={() => navigate('readiness')}>View evidence</button></div>

        <main>
          <Suspense fallback={<div className="app-loading"><Activity size={22} /><span>Loading operational module…</span></div>}>
            {page === 'overview' && <Overview ghats={ghats} selectedGhatId={selectedGhat?.id} onSelectGhat={selectGhat} onNavigate={navigate} />}
            {page === 'readiness' && <PlanningReadiness />}
            {page === 'operations' && <Operations ghats={ghats} selectedGhatId={selectedGhat?.id} onSelectGhat={selectGhat} />}
            {page === 'scenarios' && <ScenarioLab selectedGhatId={selectedGhat?.id} onSelectGhat={selectGhat} />}
            {page === 'incidents' && <Incidents />}
            {page === 'resources' && <ResourcesPage />}
            {page === 'data' && <DataCentre />}
          </Suspense>
        </main>

        <footer className="app-footer"><span><Command size={13} />Pushkara Command · operational digital twin reference</span><span><ShieldCheck size={13} />Offline PWA · audit-ready workflows · no personal tracking</span><button>Accessibility</button><button>Privacy & data policy</button></footer>
      </div>

      {searchOpen && <div className="search-overlay" onClick={() => setSearchOpen(false)}><div className="global-search" onClick={event => event.stopPropagation()}><div><Search size={20} /><input autoFocus placeholder="Search ghat, route, incident, hospital or resource…" /><button onClick={() => setSearchOpen(false)}>ESC</button></div><section><span>Suggested</span><button onClick={() => { setSearchOpen(false); selectGhat(ghats[0]) }}><MapPinned size={16} />Pushkar Ghat<span>Density pressure · Critical</span></button><button onClick={() => { setSearchOpen(false); navigate('scenarios') }}><FlaskConical size={16} />Bus-arrival surge<span>Open scenario</span></button><button onClick={() => { setSearchOpen(false); navigate('incidents') }}><Siren size={16} />INC-2407<span>Open incident</span></button></section></div></div>}
    </div>
  )
}
