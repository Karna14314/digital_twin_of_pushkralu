import { describe, expect, it } from 'vitest'
import { ghats, scenarios } from '../data/twin'
import { domainReadiness, ghatPlanByDistrict, planningMetrics } from '../data/planning'
import { applyScenario, occupancyPercent, pressureRisk, scenarioForecast } from './simulation'

describe('digital twin simulation', () => {
  it('never creates ghat occupancy beyond configured capacity', () => {
    const simulated = applyScenario(ghats, 2)
    expect(simulated.every(ghat => ghat.occupancy <= ghat.capacity)).toBe(true)
  })

  it('produces higher pressure in the surge scenario', () => {
    const baseline = scenarioForecast(scenarios[0], ghats)
    const surge = scenarioForecast(scenarios[1], ghats)
    expect(surge.peak).toBeGreaterThan(baseline.peak)
    expect(surge.projected).toBeGreaterThan(baseline.projected)
  })

  it('calculates bounded occupancy percentage', () => {
    expect(occupancyPercent(ghats[0])).toBeGreaterThan(0)
    expect(pressureRisk(ghats[0])).toBeLessThanOrEqual(1)
    expect(pressureRisk(ghats[0])).toBeGreaterThan(0)
  })

  it('keeps the Health and development ghat scopes separate', () => {
    const healthScope = planningMetrics.find(metric => metric.id === 'ghats')
    const developmentScope = planningMetrics.find(metric => metric.id === 'ghat-works')
    expect(healthScope?.value).toBe(525)
    expect(developmentScope?.value).toBe(440)
    expect(ghatPlanByDistrict.reduce((sum, district) => sum + district.planned, 0)).toBe(440)
  })

  it('defines every operational domain with bounded readiness', () => {
    expect(domainReadiness).toHaveLength(10)
    expect(domainReadiness.every(item => item.readiness >= 0 && item.readiness <= 100)).toBe(true)
  })
})
