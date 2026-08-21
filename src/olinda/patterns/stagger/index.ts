import { metadata as base } from './metadata'
import { StaggerDemo } from './Stagger.demo'
import type { OlindaPattern } from '../../registry/types'

export { Stagger } from './Stagger'
export { metadata } from './metadata'
export const pattern: OlindaPattern = { ...base, demo: StaggerDemo }
