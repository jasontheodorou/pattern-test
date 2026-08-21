import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useIsCoarsePointer, useReducedMotion } from '../../accessibility/reducedMotion'
import type { SymphoniaEnergy } from '../../styles/energy'
import type { SymphoniaSpeed } from '../../styles/speed'

type Props = {
  children: ReactNode
  energy?: SymphoniaEnergy
  speed?: SymphoniaSpeed
  className?: string
}

const STRENGTH: Record<SymphoniaEnergy, number> = { low: 0.2, medium: 0.35, high: 0.55 }
const STIFFNESS: Record<SymphoniaSpeed, number> = { slow: 160, normal: 260, fast: 380 }

export function Magnetic({
  children,
  energy = 'medium',
  speed = 'normal',
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: STIFFNESS[speed], damping: 24, mass: 0.6 })
  const sy = useSpring(my, { stiffness: STIFFNESS[speed], damping: 24, mass: 0.6 })

  const reduce = useReducedMotion()
  const coarse = useIsCoarsePointer()
  const inactive = !!reduce || coarse

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (inactive) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    mx.set((e.clientX - cx) * STRENGTH[energy])
    my.set((e.clientY - cy) * STRENGTH[energy])
  }

  function onLeave() {
    mx.set(0)
    my.set(0)
  }

  if (inactive) {
    return <div ref={ref} className={className}>{children}</div>
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ display: 'inline-block' }}
    >
      <motion.div style={{ x: sx, y: sy }}>{children}</motion.div>
    </div>
  )
}
