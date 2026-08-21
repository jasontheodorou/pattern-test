import { Children, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { useReducedMotion } from '../../accessibility/reducedMotion'
import { resolveMotion } from '../../styles/resolveMotion'
import type { SymphoniaStyle } from '../../styles/motionStyles'
import type { SymphoniaEnergy } from '../../styles/energy'
import type { SymphoniaSpeed } from '../../styles/speed'

type Props = {
  children: ReactNode
  style?: SymphoniaStyle
  energy?: SymphoniaEnergy
  speed?: SymphoniaSpeed
  playKey?: number
  className?: string
}

export function Stagger({
  children,
  style = 'editorial',
  energy = 'medium',
  speed = 'normal',
  playKey = 0,
  className,
}: Props) {
  const reduce = useReducedMotion()
  const m = resolveMotion(style, energy, speed)

  const container = {
    hidden:  {},
    visible: { transition: { staggerChildren: m.stagger, delayChildren: 0.05 } },
  }
  const item = {
    hidden:  { opacity: 0, y: m.distance * 0.6 },
    visible: { opacity: 1, y: 0, transition: { duration: m.duration, ease: m.ease } },
  }

  const items = Children.toArray(children)

  if (reduce) {
    return <div className={className}>{items}</div>
  }

  return (
    <motion.div
      key={playKey}
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {items.map((child, i) => (
        <motion.div key={i} variants={item}>{child}</motion.div>
      ))}
    </motion.div>
  )
}
