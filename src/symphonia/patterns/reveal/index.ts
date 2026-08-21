import { metadata as base } from './metadata'
import { RevealDemo } from './Reveal.demo'
import type { SymphoniaPattern } from '../../registry/types'

export { Reveal } from './Reveal'
export { metadata } from './metadata'
export const pattern: SymphoniaPattern = { ...base, demo: RevealDemo }
