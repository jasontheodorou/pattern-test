import { motionStyles, type SymphoniaStyle, type MotionStyleTokens } from './motionStyles'
import { energy, type SymphoniaEnergy } from './energy'
import { speed, type SymphoniaSpeed } from './speed'

export type ResolvedMotion = {
  duration: number
  distance: number
  stagger: number
  scale: number
  ease: MotionStyleTokens['ease']
  spring: MotionStyleTokens['spring']
}

export function resolveMotion(
  style: SymphoniaStyle = 'quiet',
  e: SymphoniaEnergy = 'medium',
  s: SymphoniaSpeed = 'normal',
): ResolvedMotion {
  const base = motionStyles[style]
  const em = energy[e]
  const sm = speed[s]
  return {
    duration: base.duration * sm,
    distance: base.distance * em.distance,
    stagger:  base.stagger  * em.stagger,
    scale:    em.scale,
    ease:     base.ease,
    spring:   base.spring,
  }
}
