import { lazy, Suspense, useMemo, useState } from 'react'
import { Activity, Cuboid, Droplets, Map as MapIcon, MapPin, Radio, ShieldAlert, Waves } from 'lucide-react'
import type { Ghat, Incident } from '../types'
import { densityColor, flowBalance, occupancyPercent } from '../lib/simulation'

const ThreeTwin = lazy(() => import('./ThreeTwin'))

interface CommandMapProps {
  ghats: Ghat[]
  incidents: Incident[]
  selectedId?: string
  onSelect: (ghat: Ghat) => void
  showResources?: boolean
}

export function CommandMap({ ghats, incidents, selectedId, onSelect, showResources = false }: CommandMapProps) {
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d')
  const selected = useMemo(() => ghats.find(ghat => ghat.id === selectedId), [ghats, selectedId])

  return (
    <section className="twin-card map-card" aria-label="Operational ghat map">
      <div className="map-toolbar">
        <div>
          <div className="eyebrow">{viewMode === '3d' ? '3D operational twin' : 'Live operational layer'}</div>
          <h2>Rajamahendravaram command area</h2>
        </div>
        <div className="map-toolbar-actions">
          <div className="map-view-toggle" aria-label="Map view"><button className={viewMode === '2d' ? 'active' : ''} onClick={() => setViewMode('2d')}><MapIcon size={13} />2D</button><button className={viewMode === '3d' ? 'active' : ''} onClick={() => setViewMode('3d')}><Cuboid size={13} />3D</button></div>
          <div className="map-status"><span className="live-dot" />Simulation clock · 09:42 IST</div>
        </div>
      </div>
      <div className="map-stage">
        {viewMode === '2d' ? <svg viewBox="0 0 100 84" role="img" aria-label="Schematic river and ghat density map" preserveAspectRatio="none">
          <defs>
            <pattern id="blocks" width="8" height="8" patternUnits="userSpaceOnUse">
              <rect width="8" height="8" fill="#e9e6dc" />
              <path d="M0 8L8 0M-2 2L2-2M6 10L10 6" stroke="#ddd9cd" strokeWidth=".22" />
            </pattern>
            <filter id="markerShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity=".22" />
            </filter>
            <linearGradient id="river" x1="0" x2="1">
              <stop offset="0" stopColor="#9bc9c4" />
              <stop offset=".5" stopColor="#75b5b1" />
              <stop offset="1" stopColor="#a6d1cc" />
            </linearGradient>
          </defs>
          <rect width="100" height="84" fill="url(#blocks)" />
          <path d="M0 31C15 34 24 29 36 34S56 45 68 40s19-2 32 2v19c-16-4-25 2-38 0S40 53 29 50 12 54 0 51Z" fill="url(#river)" />
          <path d="M0 36C18 39 25 34 36 39s19 10 31 6 19-2 33 2" fill="none" stroke="#d9eeeb" strokeWidth=".7" strokeDasharray="1.5 1.2" opacity=".9" />
          <path d="M8 7L20 29M27 5L41 32M51 4L58 37M73 7L66 40M88 6L73 41" stroke="#f9f8f4" strokeWidth="1.1" />
          <path d="M2 55L98 64M4 69L98 76M14 31L7 70M31 37L26 82M53 42L50 84M76 41L78 82" stroke="#f9f8f4" strokeWidth="1" />
          <path d="M34 33C48 32 58 41 73 40" fill="none" stroke="#796e5c" strokeWidth=".75" strokeDasharray="1 .6" />
          <path d="M34 36C48 35 58 44 73 43" fill="none" stroke="#796e5c" strokeWidth=".35" />
          <text x="3" y="13" className="map-label">NORTH RAJAMAHENDRAVARAM</text>
          <text x="4" y="80" className="map-label">TEMPORARY MELA & SOUTH APPROACH</text>
          <text x="5" y="65" className="map-water-label">KOVVUR BANK</text>
          <text x="74" y="65" className="map-water-label">RAJAMAHENDRAVARAM BANK</text>
          {ghats.map(ghat => {
            const active = ghat.id === selectedId
            const risk = ghat.density >= 3.2 || ghat.status === 'restricted'
            return (
              <g key={ghat.id} transform={`translate(${ghat.x} ${ghat.y})`} onClick={() => onSelect(ghat)} className="map-marker" role="button" aria-label={`${ghat.name}, ${occupancyPercent(ghat)} percent occupied`}>
                {risk && <circle r="4.4" fill={densityColor(ghat.density)} opacity=".12" className="marker-pulse" />}
                <circle r={active ? 2.7 : 2.1} fill={densityColor(ghat.density)} stroke="#fff" strokeWidth=".8" filter="url(#markerShadow)" />
                {active && <circle r="3.8" fill="none" stroke="#0c4541" strokeWidth=".5" />}
                <text y="-3.4" textAnchor="middle" className="marker-text">{ghat.name.replace(' Ghat', '')}</text>
              </g>
            )
          })}
          {incidents.filter(item => item.severity === 'critical' || item.severity === 'high').map(incident => (
            <g key={incident.id} transform={`translate(${incident.x + 3.2} ${incident.y - 3.2})`}>
              <circle r="2" fill="#d94f45" stroke="#fff" strokeWidth=".5" />
              <path d="M0-1L1 0 0 1-1 0Z" fill="#fff" />
            </g>
          ))}
          {showResources && (
            <g transform="translate(59 59)">
              <circle r="3.4" fill="#fff" stroke="#0c4541" strokeWidth=".7" />
              <path d="M-1.7 1h3.4M-1.3 1v-2h2.6v2M-1 0h.3M.7 0h.3" stroke="#0c4541" strokeWidth=".45" fill="none" />
            </g>
          )}
        </svg> : (
          <div className="three-stage" aria-label="Interactive 3D operational twin">
            <Suspense fallback={<div className="three-loading">Loading 3D operational twin…</div>}><ThreeTwin ghats={ghats} incidents={incidents} selectedId={selectedId} onSelect={onSelect} showResources={showResources} /></Suspense>
            <div className="three-hint"><Cuboid size={13} />Drag to orbit · scroll to zoom · select a colored pillar</div>
          </div>
        )}
        <div className="map-legend">
          <span><i className="legend-dot low" />Flowing</span>
          <span><i className="legend-dot medium" />Watch</span>
          <span><i className="legend-dot high" />Critical</span>
        </div>
        <div className="map-freshness"><Radio size={13} /> Model confidence 86% · camera overlay not connected</div>
        {selected && (
          <aside className="ghat-card">
            <button className="close-button" onClick={() => onSelect(selected)} aria-label="Close ghat details">×</button>
            <div className="eyebrow">{selected.id} · {selected.bank} bank</div>
            <h3>{selected.name}</h3>
            <p className="local-name">{selected.localName}</p>
            <div className="ghat-pressure" style={{ color: densityColor(selected.density) }}>
              <strong>{selected.density.toFixed(1)}</strong><span>people / m²</span>
            </div>
            <div className="detail-grid">
              <span>Occupancy<strong>{occupancyPercent(selected)}%</strong></span>
              <span>Net flow<strong className={flowBalance(selected) > 0 ? 'danger-text' : ''}>{flowBalance(selected) > 0 ? '+' : ''}{flowBalance(selected)}/min</strong></span>
              <span>Water depth<strong>{selected.waterDepth.toFixed(1)} m</strong></span>
              <span>Status<strong className={`status-${selected.status}`}>{selected.status}</strong></span>
            </div>
            <div className="access-note"><MapPin size={14} /><span><b>Access</b>{selected.access}</span></div>
            <div className="access-note"><Activity size={14} /><span><b>Medical</b>{selected.medical}</span></div>
            <button className="secondary-button full">View sector plan <span>→</span></button>
          </aside>
        )}
      </div>
      <div className="map-footer">
        <span><Waves size={14} /> Godavari schematic · 42.8 ft modelled at Dowleswaram</span>
        <span><Droplets size={14} /> 0.18 m rise / 90 min</span>
        <span><ShieldAlert size={14} /> 2 critical pressure zones</span>
      </div>
    </section>
  )
}
