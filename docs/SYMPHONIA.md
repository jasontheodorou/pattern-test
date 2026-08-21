# Symphonia — architecture and integration guide for coding agents

This document tells any coding agent (Claude Code or otherwise) how to work with the Symphonia pattern library. Read it before adding or modifying patterns.

## What Symphonia is

A React + TypeScript + Vite + Motion for React pattern library. It ships:

- Eight **core motion behaviours** in `src/symphonia/core/` (Reveal, MaskReveal, Stagger, useSymphoniaScroll, StickyScene, Parallax, LayoutTransition, PointerResponse).
- Ten **Ready patterns** in `src/symphonia/patterns/` composed from the core.
- Five **semantic motion styles** in `src/symphonia/styles/` (Quiet · Clear · Editorial · Bold · Playful).
- An **abstract theme contract** in `src/symphonia/theme/` — every pattern reads `--s-*` CSS variables.
- A **single registry** in `src/symphonia/registry/patterns.ts` from which the site, collections, prompts, and manifest are derived.
- A **generated manifest** at `src/symphonia/registry/symphonia.manifest.json` (do not hand-edit).
- A **legacy chunk** at `/build1` containing 32 earlier UI patterns behind Mantine — lazy-loaded, unlinked from primary nav.

## Folder layout

```
src/symphonia/
├── accessibility/       reduced-motion + coarse-pointer + Fisher-Yates helpers
├── agent/               renderPrompt(pattern, controls) helper
├── app/                 the designer-facing site (pages + components)
│   ├── components/      SiteChrome, PatternCard, Controls, UseWithClaude, DeveloperDetails
│   └── pages/           Home, Examples, Pattern, Collection, Styles, Use, About
├── core/                8 reusable motion primitives
├── experimental/        Phase 7 — decomposed editorial-motion experiments
├── patterns/            10 Ready patterns; each is 5 files (see below)
├── registry/            types.ts, patterns.ts, collections.ts, symphonia.manifest.json
├── styles/              motionStyles.ts, energy.ts, speed.ts, resolveMotion.ts
└── theme/               contract.ts, defaultTheme.ts, SymphoniaThemeProvider.tsx
```

## Non-negotiables

These are the rules that keep the library coherent:

1. **Never mount `MantineProvider` or import `@mantine/core/styles.css`** above the legacy route boundary. Mantine only ships when a user hits `/build1/*`.
2. **`useMotionTemplate` at component scope only** — never inside a JSX `style={{ }}` literal. Assign to a `const` first.
3. **Shuffle uses Fisher-Yates** with an injectable RNG — `fisherYatesShuffle` in `src/symphonia/accessibility/reducedMotion.ts`. Never `sort(() => Math.random() - 0.5)`.
4. **Reduced motion is baseline**. The V2 subtree is wrapped in `<MotionConfig reducedMotion="user">`. Individual patterns must still surface content when motion is off — call `useReducedMotion()` when transform-only fallback is not enough.
5. **`useSymphoniaScroll` returns `MotionValue`**, not React state. Never set React state on every scroll frame.
6. **StickyScene is CSS `position: sticky` first**; JS only for derived progress.
7. **Energy and speed are separate multipliers**. The single `resolveMotion(style, energy, speed)` helper (`src/symphonia/styles/resolveMotion.ts`) is the sole consumer.
8. **Prompts are template strings** on the metadata (`prompt` field). `renderPrompt(pattern, controls)` in `src/symphonia/agent/prompts.ts` does interpolation. Never inline `{{...}}` per pattern.
9. **Manifest is generated** by `scripts/build-manifest.ts` (runs as `prebuild`). Never hand-edit `symphonia.manifest.json`.
10. **Every pattern folder ships exactly 5 files:** `<Internal>.tsx`, `<Internal>.demo.tsx`, `<Internal>.css`, `metadata.ts`, `index.ts`. Do not add `README.md`, `.presets.ts`, or `.types.ts` inside a pattern.

## The registry entry (source of truth)

Every pattern's `metadata.ts` exports a `SymphoniaPattern` conforming to `src/symphonia/registry/types.ts`. Fields:

| field | purpose |
| --- | --- |
| `id` | URL slug and manifest key. |
| `name` | Designer-facing plain-English name. |
| `description` | One sentence, no jargon. |
| `goodFor` | 2–4 short usage hints. |
| `collections` | Any of `Clear`, `Editorial`, `Experimental`. |
| `styles` | Which of the five motion styles the pattern supports. |
| `status` | `draft` \| `experimental` \| `ready`. |
| `component` | Internal component name (`KineticHeadline`, etc.). |
| `demo` | Direct component reference used by `PatternCard` and `PatternPage`. |
| `prompt` | Template string with `{{name}} {{style}} {{energy}} {{speed}} {{when}} {{target}}` placeholders. |
| `runtime` | `dom` \| `rive` \| `canvas`. |
| `weight` | `light` \| `medium` \| `heavy`. |
| `accessibility` | `{ reducedMotion, keyboard, hoverOnly, autoplay }`. |
| `files` | Source paths — used by the manifest, the developer-details panel, and installers. |
| `packages` | Runtime npm packages required (e.g. `['motion']`). |

To add a pattern:

1. Create the folder `src/symphonia/patterns/<slug>/` with the 5 files.
2. Consume `motionStyles`, `energy`, `speed`, and `resolveMotion` from `src/symphonia/styles/`.
3. Read colours and type from `--s-*` CSS variables; never hardcode Transform brand values.
4. Support `prefers-reduced-motion` — content must be visible without motion.
5. Register in `src/symphonia/registry/patterns.ts`.
6. Run `npm run build` — the `prebuild` script regenerates the manifest.

## Theme contract

`SymphoniaTheme` in `src/symphonia/theme/contract.ts` is the abstract shape:

```ts
{
  colour: { background, surface, text, muted, primary, accent? },
  type:   { display, body, mono? },
  radius: { small, medium, large },
  spacing:{ page, section },
}
```

`SymphoniaThemeProvider` emits `--s-bg`, `--s-surface`, `--s-text`, `--s-muted`, `--s-primary`, `--s-accent`, `--s-font-display`, `--s-font-body`, `--s-font-mono`, `--s-radius-sm|md|lg`, `--s-space-page`, `--s-space-section` on a wrapper `div`. Patterns consume these via CSS. Any hardcoded colour in a pattern file is a bug.

## Reduced motion + accessibility

`src/symphonia/accessibility/reducedMotion.ts`:

- Re-exports `useReducedMotion` from `motion/react`.
- `useIsCoarsePointer()` — live `matchMedia('(hover: none)')` hook. Used by `PointerResponse` and `MagneticObject` to disable pointer effects on touch devices.
- `fisherYatesShuffle<T>(input, rng?)` — deterministic when a seeded RNG is passed.

Every Ready pattern must answer these before being marked Ready:

- What happens under `prefers-reduced-motion: reduce`?
- Is all content available without animation?
- Does keyboard interaction work?
- Does hover have an equivalent action?

## Using a pattern in another repo

The primary distribution mode is **source-copy via Claude**:

1. Designer picks a pattern in the Symphonia site.
2. Designer adjusts style / energy / speed / when.
3. Designer clicks **Use with Claude** — copies the generated prompt.
4. Designer opens Claude Code in the target repo and pastes the prompt.
5. Claude:
   - reads the pattern's `files` (listed in the prompt);
   - copies them to the target repo, preserving folder shape;
   - maps `--s-*` variables to whatever theme the target already has, or installs `SymphoniaThemeProvider`;
   - runs the target repo's build.

`npx symphonia add <id>` and package-import modes are V3, not V2. Do not implement them.

## Legacy

`/build1/*` renders the previous 32 UI patterns behind `LegacyShell.tsx`, which imports `MantineProvider`, `@mantine/core/styles.css`, and the old registry. It is `React.lazy`'d in `src/AppRouter.tsx` and unlinked from primary nav. Do not import from `src/build1/*` anywhere in the V2 tree.

## Testing

- `npm run test` — vitest unit tests.
  - `resolveMotion.test.ts`, `reducedMotion.test.ts` (Fisher-Yates), `prompts.test.ts`.
- `npm run e2e` (Phase 8) — Playwright smoke: routes, direct URL, back/forward, reduced motion.
- `npm run e2e:a11y` (Phase 8) — axe scan on every Ready pattern.
- `npm run build` — must succeed. The `prebuild` script regenerates `symphonia.manifest.json`.
