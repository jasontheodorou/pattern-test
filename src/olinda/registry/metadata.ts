import type { PatternMetadata } from './types'

import { metadata as reveal }   from '../patterns/reveal/metadata'
import { metadata as stagger }  from '../patterns/stagger/metadata'
import { metadata as magnetic } from '../patterns/magnetic/metadata'

export const PATTERN_METADATA: PatternMetadata[] = [
  reveal,
  stagger,
  magnetic,
]
