import type { Ghat, Scenario } from '../types'

export const densityColor = (density: number) => {
  if (density >= 3.2) return '#d94f45'
  if (density >= 2.4) return '#ef8b47'
  if (density >= 1.6) return '#e3b84b'
  return '#3ca58e'
}

export const occupancyPercent = (ghat: Ghat) => Math.round((ghat.occupancy / ghat.capacity) * 100)

export const flowBalance = (ghat: Ghat) => ghat.inflow - ghat.outflow

export const pressureRisk = (ghat: Ghat) => {
  const densityScore = ghat.density / 4.5
  const capacityScore = ghat.occupancy / ghat.capacity
  const flowScore = Math.max(0, flowBalance(ghat)) / 250
  return Math.min(1, densityScore * 0.5 + capacityScore * 0.3 + flowScore * 0.2)
}

export const applyScenario = (base: Ghat[], multiplier: number): Ghat[] =>
  base.map((ghat, index) => {
    const localLoad = multiplier + ((index % 3) - 1) * 0.025
    const occupancy = Math.min(ghat.capacity, Math.round(ghat.occupancy * localLoad))
    const density = Math.min(5.2, Number((occupancy / ghat.capacity * ghat.density * localLoad).toFixed(1)))
    return {
      ...ghat,
      occupancy,
      density,
      status: density >= 3.2 || occupancy / ghat.capacity > 0.9 ? 'restricted' : density >= 1.6 || occupancy / ghat.capacity > 0.7 ? 'watch' : 'normal'
    }
  })

export const scenarioForecast = (scenario: Scenario, ghats: Ghat[]) => {
  const updated = applyScenario(ghats, scenario.multiplier)
  const peak = Math.max(...updated.map(pressureRisk))
  const critical = updated.filter(ghat => ghat.density >= 3.2).length
  const overCapacity = updated.filter(ghat => ghat.occupancy >= ghat.capacity).length
  const projected = updated.reduce((sum, ghat) => sum + ghat.occupancy, 0)
  return { peak, critical, overCapacity, projected }
}

export const safeCrowdTarget = (ghats: Ghat[]) =>
  Math.round(ghats.reduce((sum, ghat) => sum + ghat.capacity * 0.72, 0))
