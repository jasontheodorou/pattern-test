import type { PatternMetadata } from '../../registry/types'

export const metadata: PatternMetadata = {
  id: 'magnetic',
  name: 'Magnetic',
  description: 'An element that follows the cursor within a soft field.',
  goodFor: [
    'Primary CTAs',
    'Brand marks',
    'Playful specimens',
    'Interactive footnotes',
  ],
  collections: ['Experimental'],
  styles: ['clear', 'editorial'],
  status: 'experimental',
  component: 'Magnetic',
  prompt:
`Add Symphonia's "{{name}}" pattern to {{target}}.

Energy: {{energy}}  (controls how strongly the element follows)
Speed:  {{speed}}   (controls how snappy the spring feels)

Wrap the target element in the <Magnetic> component. It follows the
cursor within its bounding box with a soft spring. The effect disables
automatically on touch devices and under reduced-motion preferences.
Use sparingly — one hero button or one interactive specimen per page.

Preserve the project's existing colours and typography.
Run the project's build after integrating and fix any errors.`,
  runtime: 'dom',
  weight: 'light',
  accessibility: {
    reducedMotion: 'supported',
    keyboard: true,
    hoverOnly: true,
    autoplay: false,
  },
  files: [
    'src/symphonia/patterns/magnetic/Magnetic.tsx',
    'src/symphonia/patterns/magnetic/index.ts',
    'src/symphonia/styles/energy.ts',
    'src/symphonia/styles/speed.ts',
    'src/symphonia/accessibility/reducedMotion.ts',
  ],
  packages: ['motion'],
}
