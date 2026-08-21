import { describe, expect, it } from 'vitest'
import { renderPrompt } from './prompts'
import type { SymphoniaPattern } from '../registry/types'

const fake: SymphoniaPattern = {
  id: 'large-heading',
  name: 'Large heading',
  description: 'A large heading that moves.',
  goodFor: [],
  collections: ['Editorial'],
  styles: ['editorial', 'bold'],
  status: 'ready',
  component: 'KineticHeadline',
  demo: () => null,
  prompt:
    'Add Symphonia\'s "{{name}}" pattern to {{target}}.\nStyle: {{style}}\nEnergy: {{energy}}',
  runtime: 'dom',
  weight: 'light',
  accessibility: { reducedMotion: 'supported', keyboard: true, hoverOnly: false, autoplay: false },
  files: [],
  packages: [],
}

describe('renderPrompt', () => {
  it('fills placeholders from controls when present', () => {
    const out = renderPrompt(fake, { style: 'bold', energy: 'high', text: 'the homepage headline' })
    expect(out).toContain('"Large heading"')
    expect(out).toContain('Style: bold')
    expect(out).toContain('Energy: high')
    expect(out).toContain('the homepage headline')
  })

  it('falls back to first supported style when none provided', () => {
    const out = renderPrompt(fake, {})
    expect(out).toContain('Style: editorial')
    expect(out).toContain('Energy: medium')
  })

  it('leaves no unfilled placeholders', () => {
    const out = renderPrompt(fake, {})
    expect(out).not.toMatch(/\{\{[a-z]+\}\}/)
  })
})
