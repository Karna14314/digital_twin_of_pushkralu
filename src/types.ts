export type Severity = 'critical' | 'high' | 'medium' | 'low'
export type Status = 'normal' | 'watch' | 'restricted' | 'closed'
export type SourceKind = 'simulation' | 'government' | 'sensor' | 'field' | 'forecast' | 'estimate' | 'plan' | 'derived'
export type OperationalDomain = 'crowd' | 'river' | 'weather' | 'transport' | 'health' | 'security' | 'sanitation' | 'utilities' | 'technology' | 'command'

export interface Ghat {
  id: string
  name: string
  localName: string
  bank: 'East' | 'West'
  x: number
  y: number
  capacity: number
  occupancy: number
  density: number
  inflow: number
  outflow: number
  status: Status
  waterDepth: number
  access: string
  medical: string
  source: SourceKind
  updatedAt: string
}

export interface Incident {
  id: string
  title: string
  type: 'crowd' | 'medical' | 'river' | 'transport' | 'infrastructure' | 'environment'
  severity: Severity
  status: 'open' | 'acknowledged' | 'resolved'
  location: string
  x: number
  y: number
  createdAt: string
  owner: string
  action: string
  detail: string
  source: SourceKind
}

export interface Resource {
  id: string
  name: string
  type: 'boat' | 'swimmer' | 'ambulance' | 'bus' | 'medical' | 'security' | 'utility'
  total: number
  available: number
  committed: number
  status: Status
  eta?: string
  location: string
  updatedAt: string
  basis: 'official-plan' | 'simulation' | 'observed'
  domain: OperationalDomain
}

export interface PlanningMetric {
  id: string
  label: string
  value: number
  displayValue: string
  unit: string
  domain: OperationalDomain
  evidence: 'official-plan' | 'official-estimate' | 'published-observation'
  source: string
  sourceDate: string
  scope: string
  confidence: 'high' | 'medium'
}

export interface DomainReadiness {
  domain: OperationalDomain
  label: string
  readiness: number
  status: 'planned' | 'in-progress' | 'validation-required'
  records: number
  summary: string
}

export interface TimelinePoint {
  time: string
  actual?: number
  forecast?: number
  safe?: number
}

export interface Scenario {
  id: string
  name: string
  description: string
  multiplier: number
  impact: string
  severity: Severity
}

export interface Feed {
  name: string
  authority: string
  state: 'ready' | 'simulated' | 'awaiting'
  freshness: string
}
