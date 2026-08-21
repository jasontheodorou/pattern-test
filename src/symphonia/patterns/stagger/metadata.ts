import type { PatternMetadata } from '../../registry/types'

export const metadata: PatternMetadata = {
  id: 'stagger',
  name: 'Stagger',
  description: 'A list of lines that arrive one after another.',
  goodFor: [
    'Editorial statements',
    'Value propositions',
    'Feature lists',
    'Long-form intros',
  ],
  collections: ['Editorial'],
  styles: ['editorial', 'clear'],
  status: 'ready',
  component: 'Stagger',
  prompt:
`Add Symphonia's "{{name}}" pattern to {{target}}.

Style: {{style}}
Energy: {{energy}}
Speed: {{speed}}

Wrap the target content in the <Stagger> component. Each direct child
fades and rises into view in sequence. Preserve the project's existing
colours, typography, and semantic HTML (Stagger only adds motion).
Respect reduced-motion preferences — content stays visible when motion
is disabled.

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
    'src/symphonia/patterns/stagger/Stagger.tsx',
    'src/symphonia/patterns/stagger/index.ts',
    'src/symphonia/styles/motionStyles.ts',
    'src/symphonia/styles/energy.ts',
    'src/symphonia/styles/speed.ts',
    'src/symphonia/styles/resolveMotion.ts',
    'src/symphonia/accessibility/reducedMotion.ts',
  ],
  packages: ['motion'],
}
