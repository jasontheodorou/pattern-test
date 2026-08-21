import { describe, expect, it } from 'vitest'
import { resolveMotion } from './resolveMotion'
import { motionStyles } from './motionStyles'

describe('resolveMotion', () => {
  it('defaults to quiet · medium · normal', () => {
    const r = resolveMotion()
    expect(r.duration).toBeCloseTo(motionStyles.quiet.duration)
    expect(r.distance).toBeCloseTo(motionStyles.quiet.distance)
    expect(r.stagger).toBeCloseTo(motionStyles.quiet.stagger)
    expect(r.scale).toBe(1.0)
  })

  it('multiplies distance by energy.distance', () => {
    const r = resolveMotion('editorial', 'high', 'normal')
    expect(r.distance).toBeCloseTo(motionStyles.editorial.distance * 1.45)
  })

  it('multiplies stagger by energy.stagger', () => {
    const low  = resolveMotion('bold', 'low',  'normal')
    const high = resolveMotion('bold', 'high', 'normal')
    expect(high.stagger / low.stagger).toBeCloseTo(1.2 / 0.7)
  })

  it('multiplies duration by speed (fast < normal < slow)', () => {
    const fast   = resolveMotion('clear', 'medium', 'fast')
    const normal = resolveMotion('clear', 'medium', 'normal')
    const slow   = resolveMotion('clear', 'medium', 'slow')
    expect(fast.duration).toBeLessThan(normal.duration)
    expect(slow.duration).toBeGreaterThan(normal.duration)
    expect(fast.duration).toBeCloseTo(motionStyles.clear.duration * 0.75)
    expect(slow.duration).toBeCloseTo(motionStyles.clear.duration * 1.35)
  })

  it('passes ease and spring through unchanged from style base', () => {
    const r = resolveMotion('playful', 'high', 'fast')
    expect(r.ease).toEqual(motionStyles.playful.ease)
    expect(r.spring).toEqual(motionStyles.playful.spring)
  })

  it('scale reflects energy multiplier only', () => {
    expect(resolveMotion('quiet', 'low').scale).toBe(0.5)
    expect(resolveMotion('quiet', 'medium').scale).toBe(1.0)
    expect(resolveMotion('quiet', 'high').scale).toBe(1.3)
  })
})
