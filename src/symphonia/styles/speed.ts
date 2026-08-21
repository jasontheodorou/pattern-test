export type SymphoniaSpeed = 'slow' | 'normal' | 'fast'

export const speed: Record<SymphoniaSpeed, number> = {
  slow:   1.35,
  normal: 1.0,
  fast:   0.75,
}
