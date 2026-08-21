import { metadata as base } from './metadata'
import { StaggerDemo } from './Stagger.demo'
import type { SymphoniaPattern } from '../../registry/types'

export { Stagger } from './Stagger'
export { metadata } from './metadata'
export const pattern: SymphoniaPattern = { ...base, demo: StaggerDemo }
