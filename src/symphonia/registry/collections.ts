import { COLLECTIONS, type Collection, type SymphoniaPattern } from './types'

export function collectionsFrom(
  patterns: SymphoniaPattern[],
): Record<Collection, SymphoniaPattern[]> {
  const out = Object.fromEntries(
    COLLECTIONS.map(c => [c, [] as SymphoniaPattern[]]),
  ) as Record<Collection, SymphoniaPattern[]>

  for (const p of patterns) {
    for (const c of p.collections) {
      if (out[c]) out[c].push(p)
    }
  }
  return out
}
