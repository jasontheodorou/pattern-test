import type { ReactNode } from 'react'
import './StickyScene.css'

type Props = {
  children: ReactNode
  className?: string
  top?: string
}

export function StickyScene({ children, className, top = '0' }: Props) {
  return (
    <div className={`s-sticky-scene ${className ?? ''}`} style={{ ['--s-sticky-top' as string]: top }}>
      <div className="s-sticky-scene__inner">
        {children}
      </div>
    </div>
  )
}
