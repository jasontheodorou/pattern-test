export type SymphoniaEnergy = 'low' | 'medium' | 'high'

export type EnergyMultipliers = {
  distance: number
  scale: number
  stagger: number
}

export const energy: Record<SymphoniaEnergy, EnergyMultipliers> = {
  low:    { distance: 0.55, scale: 0.5, stagger: 0.7 },
  medium: { distance: 1.0,  scale: 1.0, stagger: 1.0 },
  high:   { distance: 1.45, scale: 1.3, stagger: 1.2 },
}
