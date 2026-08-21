import type { SymphoniaPattern } from './types'

import { pattern as reveal }   from '../patterns/reveal'
import { pattern as stagger }  from '../patterns/stagger'
import { pattern as magnetic } from '../patterns/magnetic'

export const PATTERNS: SymphoniaPattern[] = [
  reveal,
  stagger,
  magnetic,
]
