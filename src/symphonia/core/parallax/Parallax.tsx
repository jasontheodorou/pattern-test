import type { ReactNode } from 'react'
import { motion, useTransform } from 'motion/react'
import { useSymphoniaScroll } from '../scroll/useSymphoniaScroll'
import { useReducedMotion } from '../../accessibility/reducedMotion'

export type ParallaxAmount = 'tiny' | 'small' | 'medium'

const AMOUNT_PX: Record<ParallaxAmount, number> = {
  tiny:   24,
  small:  56,
  medium: 96,
}

type Props = {
  children: ReactNode
  amount?: ParallaxAmount
  className?: string
}

export function Parallax({ children, amount = 'small', className }: Props) {
  const reduce = useReducedMotion()
  const { ref, progress } = useSymphoniaScroll<HTMLDivElement>()
  const range = AMOUNT_PX[amount]
  const y = useTransform(progress, [0, 1], [range, -range])

  if (reduce) {
    return <div ref={ref} className={className}>{children}</div>
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}
