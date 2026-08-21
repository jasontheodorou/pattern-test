import type { PatternMetadata } from '../../registry/types'

export const metadata: PatternMetadata = {
  id: 'reveal',
  name: 'Reveal',
  description: 'Content that arrives with a gentle rise.',
  goodFor: [
    'Section openings',
    'Hero statements',
    'Card entrances',
    'Empty-state cues',
  ],
  collections: ['Clear'],
  styles: ['clear', 'editorial'],
  status: 'ready',
  component: 'Reveal',
  prompt:
`Add Symphonia's "{{name}}" pattern to {{target}}.

Style: {{style}}
Energy: {{energy}}
Speed: {{speed}}

Wrap the target content in the <Reveal> component; do not rewrite its
markup. Reveal accepts one child element and fades + rises it into view
when it mounts. Preserve the project's existing colours and typography.
Respect reduced-motion preferences — the content stays visible when
motion is disabled.

Run the project's build after integrating and fix any errors.`,
  runtime: 'dom',
  weight: 'light',
  accessibility: {
    reducedMotion: 'supported',
    keyboard: true,
    hoverOnly: false,
    autoplay: false,
  },
  files: [
    'src/symphonia/patterns/reveal/Reveal.tsx',
    'src/symphonia/patterns/reveal/index.ts',
    'src/symphonia/styles/motionStyles.ts',
    'src/symphonia/styles/energy.ts',
    'src/symphonia/styles/speed.ts',
    'src/symphonia/styles/resolveMotion.ts',
    'src/symphonia/accessibility/reducedMotion.ts',
  ],
  packages: ['motion'],
}
