import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { useReducedMotion } from '../../accessibility/reducedMotion'
import { resolveMotion } from '../../styles/resolveMotion'
import type { SymphoniaStyle } from '../../styles/motionStyles'
import type { SymphoniaEnergy } from '../../styles/energy'
import type { SymphoniaSpeed } from '../../styles/speed'

type Direction = 'below' | 'above' | 'left' | 'right'

type Props = {
  children: ReactNode
  style?: SymphoniaStyle
  energy?: SymphoniaEnergy
  speed?: SymphoniaSpeed
  from?: Direction
  playKey?: number
  className?: string
}

function offset(from: Direction, distance: number) {
  switch (from) {
    case 'above': return { x: 0, y: -distance }
    case 'left':  return { x: -distance, y: 0 }
    case 'right': return { x: distance, y: 0 }
    case 'below':
    default:      return { x: 0, y: distance }
  }
}

export function Reveal({
  children,
  style = 'clear',
  energy = 'medium',
  speed = 'normal',
  from = 'below',
  playKey = 0,
  className,
}: Props) {
  const reduce = useReducedMotion()
  const m = resolveMotion(style, energy, speed)
  const off = offset(from, m.distance)
  const initial = reduce ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...off }

  return (
    <motion.div
      key={playKey}
      className={className}
      initial={initial}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: m.duration, ease: m.ease }}
    >
      {children}
    </motion.div>
  )
}
