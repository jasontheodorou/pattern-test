import type { ReactNode } from 'react'
import { motion } from 'motion/react'

type Props = {
  children: ReactNode
  layoutId?: string
  className?: string
}

export function LayoutTransition({ children, layoutId, className }: Props) {
  return (
    <motion.div layout layoutId={layoutId} className={className}>
      {children}
    </motion.div>
  )
}
