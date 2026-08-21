import { metadata as base } from './metadata'
import { MagneticDemo } from './Magnetic.demo'
import type { SymphoniaPattern } from '../../registry/types'

export { Magnetic } from './Magnetic'
export { metadata } from './metadata'
export const pattern: SymphoniaPattern = { ...base, demo: MagneticDemo }
