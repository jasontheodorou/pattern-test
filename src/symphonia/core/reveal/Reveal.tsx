import type { ReactNode } from 'react'
import { motion } from 'motion/react'
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
  when?: 'mount' | 'inView'
  delay?: number
  className?: string
}

function offset(from: Direction, distance: number) {
  switch (from) {
    case 'above': return { y: -distance, x: 0 }
    case 'left':  return { y: 0, x: -distance }
    case 'right': return { y: 0, x: distance }
    case 'below':
    default:      return { y: distance, x: 0 }
  }
}

export function Reveal({
  children,
  style = 'quiet',
  energy = 'medium',
  speed = 'normal',
  from = 'below',
  when = 'inView',
  delay = 0,
  className,
}: Props) {
  const motionTokens = resolveMotion(style, energy, speed)
  const { x, y } = offset(from, motionTokens.distance)
  const initial = { opacity: 0, x, y }
  const visible = { opacity: 1, x: 0, y: 0 }
  const transition = { duration: motionTokens.duration, ease: motionTokens.ease, delay }

  if (when === 'mount') {
    return (
      <motion.div
        className={className}
        initial={initial}
        animate={visible}
        transition={transition}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={visible}
      viewport={{ once: true, amount: 0.25 }}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}
