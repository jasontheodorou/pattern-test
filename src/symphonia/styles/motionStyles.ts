export type SymphoniaStyle = 'quiet' | 'clear' | 'editorial' | 'bold' | 'playful'

export type MotionStyleTokens = {
  duration: number
  distance: number
  stagger: number
  ease: [number, number, number, number]
  spring: { stiffness: number; damping: number }
}

export const motionStyles: Record<SymphoniaStyle, MotionStyleTokens> = {
  quiet: {
    duration: 0.55,
    distance: 16,
    stagger: 0.035,
    ease: [0.2, 0.8, 0.2, 1],
    spring: { stiffness: 220, damping: 30 },
  },
  clear: {
    duration: 0.32,
    distance: 20,
    stagger: 0.03,
    ease: [0.4, 0, 0.2, 1],
    spring: { stiffness: 300, damping: 32 },
  },
  editorial: {
    duration: 0.72,
    distance: 48,
    stagger: 0.065,
    ease: [0.65, 0, 0.45, 1],
    spring: { stiffness: 180, damping: 24 },
  },
  bold: {
    duration: 0.68,
    distance: 80,
    stagger: 0.075,
    ease: [0.65, 0, 0.35, 1],
    spring: { stiffness: 200, damping: 20 },
  },
  playful: {
    duration: 0.5,
    distance: 40,
    stagger: 0.05,
    ease: [0.2, 0.9, 0.25, 1],
    spring: { stiffness: 250, damping: 17 },
  },
}
