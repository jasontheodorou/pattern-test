import { Children, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { motionStyles, type SymphoniaStyle } from '../../styles/motionStyles'
import { energy as energyMultipliers, type SymphoniaEnergy } from '../../styles/energy'
import { speed as speedMultipliers, type SymphoniaSpeed } from '../../styles/speed'

export type Gap = 'tight' | 'normal' | 'loose'

export const GAP_TOKENS: Record<Gap, number> = {
  tight:  0.025,
  normal: 0.06,
  loose:  0.12,
}

type Props = {
  children: ReactNode
  gap?: Gap
  style?: SymphoniaStyle
  energy?: SymphoniaEnergy
  speed?: SymphoniaSpeed
  when?: 'mount' | 'inView'
  className?: string
}

export function Stagger({
  children,
  gap = 'normal',
  style = 'quiet',
  energy = 'medium',
  speed = 'normal',
  when = 'inView',
  className,
}: Props) {
  const base = motionStyles[style]
  const staggerSeconds = GAP_TOKENS[gap] * energyMultipliers[energy].stagger
  const itemDuration = base.duration * speedMultipliers[speed]

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: staggerSeconds, delayChildren: 0.05 } },
  }
  const item = {
    hidden:  { opacity: 0, y: base.distance * energyMultipliers[energy].distance / 2 },
    visible: { opacity: 1, y: 0, transition: { duration: itemDuration, ease: base.ease } },
  }

  const items = Children.toArray(children).map((child, i) => (
    <motion.div key={i} variants={item}>{child}</motion.div>
  ))

  if (when === 'mount') {
    return (
      <motion.div className={className} variants={container} initial="hidden" animate="visible">
        {items}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {items}
    </motion.div>
  )
}
