import { describe, expect, it } from 'vitest'
import { renderPrompt } from './prompts'
import type { SymphoniaPattern } from '../registry/types'

const fake: SymphoniaPattern = {
  id: 'reveal',
  name: 'Reveal',
  description: 'Content that arrives.',
  goodFor: [],
  collections: ['Clear'],
  styles: ['clear', 'editorial'],
  status: 'ready',
  component: 'Reveal',
  demo: () => null,
  prompt:
`Add Symphonia's "{{name}}" pattern to {{target}}.
Style: {{style}}
Energy: {{energy}}`,
  runtime: 'dom',
  weight: 'light',
  accessibility: { reducedMotion: 'supported', keyboard: true, hoverOnly: false, autoplay: false },
  files: ['src/symphonia/patterns/reveal/Reveal.tsx'],
  packages: ['motion'],
}

describe('renderPrompt', () => {
  it('addresses Claude Code by default', () => {
    const out = renderPrompt(fake, {})
    expect(out.startsWith('Claude Code —')).toBe(true)
  })

  it('addresses Codex when tool = codex', () => {
    const out = renderPrompt(fake, {}, 'codex')
    expect(out.startsWith('Codex —')).toBe(true)
  })

  it('fills placeholders in the pattern body from controls', () => {
    const out = renderPrompt(fake, { style: 'editorial', energy: 'high', text: 'the hero section' })
    expect(out).toContain('Style: editorial')
    expect(out).toContain('Energy: high')
    expect(out).toContain('the hero section')
  })

  it('falls back to first supported style when no style provided', () => {
    const out = renderPrompt(fake, {})
    expect(out).toContain('Style: clear')
  })

  it('lists files and dependencies', () => {
    const out = renderPrompt(fake, {})
    expect(out).toContain('- src/symphonia/patterns/reveal/Reveal.tsx')
    expect(out).toContain('Dependencies (install if missing): motion')
  })

  it('leaves no unfilled placeholders', () => {
    const out = renderPrompt(fake, {})
    expect(out).not.toMatch(/\{\{[a-z]+\}\}/)
  })
})
