import type { OlindaPattern } from './types'

import { pattern as reveal }   from '../patterns/reveal'
import { pattern as stagger }  from '../patterns/stagger'
import { pattern as magnetic } from '../patterns/magnetic'

export const PATTERNS: OlindaPattern[] = [
  reveal,
  stagger,
  magnetic,
]
