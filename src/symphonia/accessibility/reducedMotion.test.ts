import { describe, expect, it } from 'vitest'
import { fisherYatesShuffle } from './reducedMotion'

function seeded(seed: number) {
  let x = seed | 0
  return () => {
    x = (x * 1664525 + 1013904223) | 0
    return ((x >>> 0) / 0x100000000)
  }
}

describe('fisherYatesShuffle', () => {
  it('preserves length and contents', () => {
    const input = [1, 2, 3, 4, 5]
    const out = fisherYatesShuffle(input, seeded(42))
    expect(out).toHaveLength(input.length)
    expect(out.sort()).toEqual([1, 2, 3, 4, 5])
  })

  it('is deterministic under a seeded RNG', () => {
    const a = fisherYatesShuffle([1, 2, 3, 4, 5, 6, 7, 8], seeded(7))
    const b = fisherYatesShuffle([1, 2, 3, 4, 5, 6, 7, 8], seeded(7))
    expect(a).toEqual(b)
  })

  it('produces different orderings from different seeds', () => {
    const a = fisherYatesShuffle([1, 2, 3, 4, 5, 6, 7, 8], seeded(1))
    const b = fisherYatesShuffle([1, 2, 3, 4, 5, 6, 7, 8], seeded(2))
    expect(a).not.toEqual(b)
  })

  it('does not mutate the input', () => {
    const input = [1, 2, 3, 4, 5]
    const snap = [...input]
    fisherYatesShuffle(input, seeded(1))
    expect(input).toEqual(snap)
  })
})
