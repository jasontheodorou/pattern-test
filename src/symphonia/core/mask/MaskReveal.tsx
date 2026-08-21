import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import './MaskReveal.css'
import { resolveMotion } from '../../styles/resolveMotion'
import type { SymphoniaStyle } from '../../styles/motionStyles'
import type { SymphoniaEnergy } from '../../styles/energy'
import type { SymphoniaSpeed } from '../../styles/speed'

type Direction = 'vertical' | 'horizontal' | 'zoom'

type Props = {
  children: ReactNode
  style?: SymphoniaStyle
  energy?: SymphoniaEnergy
  speed?: SymphoniaSpeed
  from?: Direction
  when?: 'mount' | 'inView'
  className?: string
}

function initialFor(from: Direction) {
  switch (from) {
    case 'horizontal': return { x: '-100%', y: 0, scale: 1 }
    case 'zoom':       return { x: 0, y: 0, scale: 1.15 }
    case 'vertical':
    default:           return { x: 0, y: '100%', scale: 1 }
  }
}

export function MaskReveal({
  children,
  style = 'editorial',
  energy = 'medium',
  speed = 'normal',
  from = 'vertical',
  when = 'inView',
  className,
}: Props) {
  const m = resolveMotion(style, energy, speed)
  const initial = initialFor(from)
  const visible = { x: 0, y: 0, scale: 1 }
  const transition = { duration: m.duration, ease: m.ease }

  const inner = when === 'mount'
    ? <motion.div className="s-mask__item" initial={initial} animate={visible} transition={transition}>{children}</motion.div>
    : <motion.div className="s-mask__item" initial={initial} whileInView={visible} viewport={{ once: true, amount: 0.25 }} transition={transition}>{children}</motion.div>

  return <div className={`s-mask ${className ?? ''}`}>{inner}</div>
}
