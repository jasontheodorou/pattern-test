# Claude Code Brief — Build Symphonia Pattern Library V2

## Role

You are upgrading the existing repository:

`jasontheodorou/symphonia-pattern-library`

Do not start a replacement repository.

Preserve useful existing work and evolve it into Symphonia V2.

---

# 1. Product goal

Build a pattern library that feels extremely simple to a nontechnical public-sector designer while being rigorous, reusable and maintainable underneath.

The frontend should feel like a visual reference library.

The backend should behave like a mature component system.

The primary nontechnical workflow is:

1. Browse a live example.
2. Understand it immediately.
3. Choose a simple style.
4. Adjust a small number of understandable controls.
5. Click "Use with Claude".
6. Paste the generated instruction into Claude Code.
7. Claude installs/adapts the pattern in another repository.

---

# 2. Do not expose engineering language on the main UI

Primary public navigation:

- Examples
- Collections
- Styles
- Use
- About

Do not use these as primary frontend taxonomy:

- primitives
- recipes
- variants
- props
- API
- dependencies
- engine
- adapters
- spring
- easing

Developer detail can exist behind a secondary "Developer details" affordance.

---

# 3. Existing repo facts

The current project manifest reports:

- React 19.2.x;
- TypeScript 6.0.x;
- Vite 8.2.x;
- Mantine 9.5.x;
- Motion 12.43.x;
- Lucide React;
- central tokens/theme.

The existing README's reference to Mantine v7 is stale. Treat `package.json` as source of truth and update the README during V2.

Both `motion` and `framer-motion` are currently present in dependencies. Standardise new code on imports from `motion/react`. Before removing `framer-motion`, search the entire repository and remove it only if no live import remains.

It already contains:
- a central `PATTERNS` registry in `src/patterns/index.ts`;
- normal UI patterns;
- `src/experimental/editorial-motion`;
- chaos-grid;
- content-constellation;
- easing-playground;
- editorial-zoom;
- living-footnotes;
- meaning-machine;
- scroll-editorial-story;
- shuffle-glossary;
- thought-unfolding.

Preserve these concepts.

Do not throw away working experiments.

Do not create a second competing pattern registry. Evolve/migrate the existing `PATTERNS` source of truth. The current single `ExperimentalPatternsGallery` registry entry should be decomposed into individually routable experimental entries while keeping a gallery view.

The current npm package name is `design-sandbox` with `private: true`. During V2, rename the local package metadata to `symphonia-pattern-library` (still private) for clarity. Do not publish an npm package as part of V2.

## Phase 0 safety checkpoint

Before structural work:

1. Inspect the complete repository.
2. Run the current build and record the result.
3. Create a working branch/checkpoint.
4. Do not delete or rename existing patterns until their replacement route/demo works.
5. Keep commits/changes logically separable so regressions are easy to locate.

---

# 4. High-level architecture

Create a reusable Symphonia motion layer:

```text
src/symphonia/
  core/
  patterns/
  experimental/
  styles/
  theme/
  registry/
  accessibility/
  agent/
```

Migrate/refactor existing experimental motion work progressively.

Do not perform a giant rewrite in one commit.

## Routing is a required V2 change

The current `App.tsx` uses local `view` state for navigation. Replace this with real browser routes so every example and collection has a shareable URL and survives refresh/back/forward navigation.

Install:

```bash
npm install react-router
```

Use React Router declarative mode; do not migrate the whole app to React Router Framework mode. Keep Vite.

Suggested routes:

```text
/
/examples
/examples/:patternId
/collections/:collectionId
/styles/:styleId
/use
/about
```

Keep the existing Vercel SPA rewrite.

---

# 5. Build the foundation first

Implement these internal behaviours:

1. Reveal
2. Mask
3. Stagger
4. Scroll progress
5. Sticky scene
6. Parallax
7. Layout transition
8. Pointer response

Use Motion and normal CSS.

Do not add GSAP, Three.js, Lenis or another animation framework in V2 foundation work.

Rive may be added later only for patterns that genuinely benefit from authored vector state-machine animation.

---

# 6. Implement the first Ready patterns

Build/refactor these first:

1. Large heading
2. Text reveal
3. Image reveal
4. Moving image
5. Scroll story
6. Image zoom
7. Shuffle
8. Marquee
9. Magnetic object
10. Expanding panel

Internal component names can be technical.

Frontend names must remain plain.

Example:

- Frontend: `Large heading`
- Internal component: `KineticHeadline`

---

# 7. Motion styles

Create semantic motion styles:

- quiet
- clear
- editorial
- bold
- playful

A pattern should normally accept:

```ts
style?: SymphoniaStyle;
energy?: "low" | "medium" | "high";
speed?: "slow" | "normal" | "fast";
```

Do not require designers to configure raw spring physics.

---

# 8. Theme contract

Patterns must not hard-code Transform brand values.

Create an abstract theme contract and CSS variables.

Patterns should consume values such as:

- background
- surface
- text
- primary
- display font
- body font

The Symphonia application's own default theme may use the current Symphonia/Transform styling, but pattern code must remain brand-independent.

---

# 9. Registry

Create a single registry that powers:

- browsing;
- search;
- collections;
- pattern routes;
- status;
- generated prompts.

Each entry should include:

```ts
{
  id,
  name,
  description,
  goodFor,
  collections,
  status,       // draft | experimental | ready
  isNew,        // optional freshness flag, not lifecycle
  styles,
  component,
  prompt
}
```

---

# 10. Collections

Initial collections:

- Quiet
- Clear
- Bold
- Playful
- Editorial
- Experimental

A pattern can appear in multiple collections.

Collections must be curated from registry metadata rather than hard-coded as separate pages of duplicated content.

---

# 11. Frontend redesign

## Homepage

Keep it minimal.

Suggested content:

### Symphonia

Patterns for digital experiences.

### Examples

Large live examples.

### Collections

Quiet / Clear / Bold / Playful / Editorial / Experimental

### Use

Brief instruction for using a pattern with Claude.

Avoid a large marketing hero.

Avoid developer explanation.

## Example cards

Card content:

- live movement;
- simple name;
- one-line description.

Avoid technical badges.

## Pattern page

Primary content:

- large live demo;
- simple explanation;
- Good for;
- Styles;
- Try it;
- Use with Claude.

Controls should use human concepts:
- words;
- energy;
- speed;
- when;
- style.

Developer details can reveal:
- imports;
- files;
- API;
- dependencies.

---

# 12. Use with Claude

Every pattern page must have a primary "Use with Claude" action.

Generate a clear instruction that tells Claude to:

- use the named Symphonia pattern;
- adapt to the current project's colours/type;
- preserve unrelated design;
- respect reduced motion;
- run the build.

Example:

```text
Add Symphonia's "Large heading" pattern to this project.

Apply it to the homepage heading.
Style: Quiet
Energy: Medium

Use the project's existing colours and typography.
Preserve existing content and layout unless needed for the pattern.
Respect reduced-motion preferences.
Do not change unrelated components.
Run the build and fix integration errors.
```

---

# 13. Agent documentation

Create:

- root `CLAUDE.md`;
- `docs/SYMPHONIA.md`;
- `src/symphonia/registry/symphonia.manifest.json`.

Claude Code automatically loads root `CLAUDE.md`, so keep it concise and import the fuller guide:

```md
# Symphonia

Read @docs/SYMPHONIA.md before changing Symphonia architecture or adding patterns.
Read @package.json for current commands and versions.
```

`docs/SYMPHONIA.md` must explain to an AI coding agent:

- how Symphonia is structured;
- how to inspect the registry;
- how to install/copy a pattern;
- how to theme it;
- how to preserve the target repo;
- how to handle reduced motion;
- how to validate work.

The manifest should expose file/dependency information for agents.

## Claude Code web setup

Browser users should not need terminal knowledge. Commit a repo-owned cloud setup hook:

```text
.claude/settings.json
scripts/claude-cloud-setup.sh
```

The `SessionStart` hook should invoke the script. The script should:

- exit immediately outside Claude Code remote/cloud sessions;
- run `npm ci` when `node_modules` is absent or stale;
- avoid reinstalling unnecessarily on every resume;
- fail loudly if dependency installation fails;
- contain no secrets.

This makes Claude Code on the web self-preparing for designers.

---

# 14. Vercel access control

The existing `PasswordGate.tsx` is not secure access control: `VITE_GATE_PASSWORD` is bundled into client code and the entered password is stored in `localStorage`.

Choose one deployment model explicitly:

## Internal Symphonia (recommended for current Transform use)

- remove the client password gate as a security boundary;
- enable Vercel Deployment Protection / Vercel Authentication in the Vercel project;
- optionally keep a non-security welcome screen only if useful.

## Public Symphonia

- remove the gate entirely.

Do not build a custom authentication backend as part of V2 unless the product requirement changes.

---

# 15. Accessibility

Ready patterns must:

- support `prefers-reduced-motion`;
- not hide required content behind motion;
- support keyboard interaction;
- provide click/focus equivalents for hover-only demonstrations when required;
- preserve semantic HTML;
- avoid focus traps;
- avoid inaccessible autoplay.

Create shared accessibility utilities rather than fixing this individually in every pattern.

---

# 16. Responsive behaviour

Every Ready pattern must have deliberate mobile behaviour.

Do not simply scale desktop down.

Examples:

- large type becomes smaller but retains composition;
- pointer-only effects disable;
- multi-column scroll story can become a stacked sequence;
- sticky scenes should not create unusably long mobile scroll;
- marquees become static if needed.

---

# 17. Performance

Core patterns should normally animate:

- transform;
- opacity;
- clip/mask where appropriate.

Avoid:
- React state updates on every scroll frame;
- expensive filter animations;
- huge always-running loops;
- large canvas/WebGL payloads in core.

Lazy-load heavy experimental patterns.

---

# 18. Quality gates for `Ready`

A pattern may be marked Ready only if:

- it works with arbitrary content;
- it uses theme variables;
- it works at mobile sizes;
- reduced motion works;
- keyboard/focus behaviour is correct;
- it has a demo;
- its generated Claude instruction is sensible;
- build/typecheck pass;
- it can be copied/used outside the Symphonia gallery without manual surgery.

---

# 19. Refactor existing experiments

For each existing experiment:

1. Identify reusable behaviour.
2. Replace duplicated animation logic with core behaviours where practical.
3. Keep its visual identity.
4. Move it under `src/symphonia/experimental`.
5. Add registry metadata.
6. Give it a simple frontend name if needed.
7. Add reduced-motion behaviour.
8. Add a short "Good for" description.

Do not destroy interesting work merely to enforce abstraction.

If an experiment genuinely needs bespoke logic, keep it bespoke.

---

# 20. Implementation phases

## Phase 1 — Audit and scaffold

- inspect current routes/components;
- create V2 folder structure;
- preserve existing functionality;
- create registry types;
- create theme contract;
- create semantic motion styles.

## Phase 2 — Core behaviours

Implement/test the eight core behaviours.

## Phase 3 — First Ready patterns

Build the first ten patterns.

## Phase 4 — Frontend redesign

Build:
- minimal home;
- examples index;
- collections;
- pattern detail;
- Use with Claude.

## Phase 5 — Agent layer

Create:
- root `CLAUDE.md`;
- `docs/SYMPHONIA.md`;
- manifest;
- prompt generation.

## Phase 6 — Experimental migration

Move and improve existing editorial-motion experiments.

## Phase 7 — QA

Install a minimal automated quality stack if it is not already present:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @playwright/test @axe-core/playwright
```

Then add scripts for:

- unit/component tests;
- production build;
- Playwright smoke tests;
- accessibility smoke tests.

QA must cover:

- desktop;
- mobile;
- keyboard;
- reduced motion;
- direct deep links;
- back/forward navigation;
- Vercel preview build;
- visual polish.

---

# 21. Design quality

The target quality bar is the Dropbox Brand Guidelines site's confidence and craft, not its exact visual identity.

Use these principles:

- visual examples over long explanation;
- strong editorial composition;
- purposeful motion;
- interaction as demonstration;
- few controls;
- discovery without confusion;
- restraint;
- excellent spacing;
- no generic SaaS-dashboard look.

For public-sector design, bias toward calm and clarity.

---

# 22. Things not to do

Do not:

- clone Dropbox layouts;
- copy Dropbox assets;
- copy Dropbox type;
- add complex dependencies without a demonstrated need;
- put implementation jargon in the primary UI;
- make every element animate;
- make experimental patterns appear production-safe;
- embed Transform-specific colours/fonts in reusable pattern code;
- require a command line to understand or use Symphonia.

---

# 23. Deliverables

At completion, the repository should contain:

- redesigned Symphonia site;
- live pattern gallery;
- collections;
- simple pattern controls;
- semantic motion styles;
- reusable core behaviours;
- first Ready pattern set;
- migrated experimental patterns;
- theme contract;
- registry;
- machine-readable manifest;
- root `CLAUDE.md`;
- `docs/SYMPHONIA.md`;
- repo-owned Claude Code web setup hook/script;
- generated "Use with Claude" prompts;
- accessibility/reduced-motion handling;
- passing typecheck/build;
- passing automated smoke/accessibility tests;
- working direct URLs on a Vercel preview.

Before declaring V2 complete, report exactly:

1. dependencies added/removed;
2. files/routes migrated;
3. tests run and results;
4. known limitations;
5. Vercel/manual settings still required.

---

# 24. Final test

Give the site to a designer who has never opened the repository.

They should be able to answer within a few minutes:

- What is Symphonia?
- What can I use?
- Which things are calm?
- Which things are more expressive?
- What would work for my page?
- How do I put one into my project?

If those answers require explaining React, the frontend is not finished.
