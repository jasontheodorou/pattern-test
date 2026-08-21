import { useRef } from 'react'
import { useScroll, type MotionValue } from 'motion/react'

type Options = {
  offset?: [string, string]
}

export function useSymphoniaScroll<T extends HTMLElement = HTMLDivElement>(
  options: Options = {},
): { ref: React.RefObject<T | null>; progress: MotionValue<number> } {
  const ref = useRef<T>(null)
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    offset: (options.offset ?? ['start end', 'end start']) as ['start end', 'end start'],
  })
  return { ref, progress: scrollYProgress }
}
