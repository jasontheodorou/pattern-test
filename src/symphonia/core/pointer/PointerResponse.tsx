import type { ReactNode } from 'react'
import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useIsCoarsePointer, useReducedMotion } from '../../accessibility/reducedMotion'

export type PointerMode = 'magnetic' | 'tilt' | 'follow' | 'press'

type Props = {
  children: ReactNode
  mode?: PointerMode
  strength?: number
  className?: string
}

export function PointerResponse({
  children,
  mode = 'magnetic',
  strength = 0.35,
  className,
}: Props) {
  const coarse = useIsCoarsePointer()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 260, damping: 26 })
  const sy = useSpring(my, { stiffness: 260, damping: 26 })
  const rotX = useTransform(sy, v => -v * 0.1)
  const rotY = useTransform(sx, v => v * 0.1)
  const pressScale = useTransform(sx, v => 1 - Math.min(Math.abs(v) * 0.001, 0.06))

  const inactive = coarse || reduce

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (inactive) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    mx.set((e.clientX - cx) * strength)
    my.set((e.clientY - cy) * strength)
  }

  function onMouseLeave() {
    mx.set(0)
    my.set(0)
  }

  if (inactive) {
    return <div className={className}>{children}</div>
  }

  const style =
    mode === 'tilt'  ? { rotateX: rotX, rotateY: rotY }
  : mode === 'press' ? { scale: pressScale }
  :                    { x: sx, y: sy }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{ display: 'inline-block' }}
    >
      <motion.div style={style}>{children}</motion.div>
    </div>
  )
}
