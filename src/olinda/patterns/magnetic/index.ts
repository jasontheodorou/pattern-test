import { metadata as base } from './metadata'
import { MagneticDemo } from './Magnetic.demo'
import type { OlindaPattern } from '../../registry/types'

export { Magnetic } from './Magnetic'
export { metadata } from './metadata'
export const pattern: OlindaPattern = { ...base, demo: MagneticDemo }
