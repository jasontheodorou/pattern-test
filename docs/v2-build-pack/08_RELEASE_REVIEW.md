# Symphonia V2 Build Pack — Release Review

## Status

**Release-candidate brief: ready to hand to Claude Code after the manual decisions below.**

This review checked the pack against:

- the current Symphonia repository structure and package manifest;
- the current `App.tsx`, pattern registry, Vercel config and password gate;
- current Motion for React documentation;
- current React Router guidance;
- current Vercel Vite/deployment-protection guidance;
- current Claude Code project-instruction behaviour.

---

# Corrections made in this review

## 1. Corrected the current stack

The previous pack inherited a stale README claim about Mantine v7.

Current package baseline is Mantine 9.5.x. The pack now says so explicitly.

## 2. Standardised Motion terminology

The repo currently lists both `motion` and `framer-motion`.

V2 should use imports from:

```ts
import { motion } from "motion/react";
```

Do not remove `framer-motion` blindly. Claude must search the repository first. If no live imports remain, remove the duplicate dependency.

## 3. Added real routing as a V2 requirement

The current app uses local React state (`view`) instead of URL routing.

That is inadequate for a pattern library because:

- examples cannot be shared directly;
- refresh does not preserve location;
- browser back/forward is not first-class;
- Vercel deep links are not meaningful.

V2 should install `react-router` and use declarative SPA routing.

## 4. Kept Vite/Vercel architecture simple

The existing `vercel.json` SPA rewrite is correct for a Vite SPA and should be retained.

Do not migrate to React Router Framework mode or install `@vercel/react-router` merely for fashion. The recommended V2 architecture does not need it.

## 5. Fixed the Claude Code instruction architecture

Claude Code automatically loads root `CLAUDE.md` project instructions.

The pack previously centred `SYMPHONIA.md`, which would require the agent to be told to read it.

V2 should use:

```text
CLAUDE.md
  -> imports docs/SYMPHONIA.md
```

This makes the architecture durable across future Claude sessions.

## 6. Identified and corrected the password-gate security problem

The current gate uses `VITE_GATE_PASSWORD` and stores the entered password in `localStorage`.

That is not secure access control. Vite client environment variables are part of the browser-delivered application.

For internal use, use Vercel Deployment Protection/Vercel Authentication.

For public use, remove the gate.

## 7. Corrected hook usage in example code

`useMotionTemplate` was shown inline inside a JSX style object in two examples.

It is now evaluated at component scope like a normal React hook.

## 8. Replaced the bad shuffle example

`sort(() => Math.random() - 0.5)` was used as a compact illustration and then disclaimed.

That is not acceptable in a release brief. It has been replaced with an actual Fisher-Yates-style shuffle, with a note to inject seeded randomness for deterministic tests.

## 9. Strengthened reduced-motion strategy

V2 now uses a global:

```tsx
<MotionConfig reducedMotion="user">
```

as the baseline, with pattern-specific `useReducedMotion()` logic only when behaviour needs to be disabled entirely.

## 10. Added automated QA dependencies

A polished V2 needs repeatable checks, not only visual judgement.

The build brief now specifies:

- Vitest;
- Testing Library;
- jsdom;
- Playwright;
- axe integration for Playwright.

## 11. Separated maturity from freshness

The original public status model treated `New` as if it were mutually exclusive with `Ready`. V2 now keeps lifecycle as `draft | experimental | ready` and treats “New” as optional freshness metadata. This preserves the current repo's useful lifecycle semantics and avoids a future migration.

## 12. Prevented a duplicate registry

The current repository already has `PATTERNS` as a central registry. The architecture now explicitly migrates that source instead of creating a second registry. It also calls for the nine nested editorial-motion experiments to become individually routable entries while preserving their gallery.

## 13. Added zero-terminal Claude web preparation

V2 now includes a repository-owned Claude Code web setup hook so dependencies can prepare automatically in cloud sessions. This is important for the actual target audience: designers using Claude Code in the browser.

---

# Required manual decisions before Claude starts

## A. Decide whether Symphonia is internal or public

Recommended current choice: **internal**.

If internal:
- use Vercel Deployment Protection/Vercel Authentication;
- remove the client-side password gate as a security mechanism.

If public:
- remove the gate entirely.

Do not ask Claude to invent a custom login system for V2.

## B. Give Claude the pack and the repository

Attach/copy the full research pack into the Claude Code task context or place it in the repository, preferably under:

```text
docs/v2-build-pack/
```

Then tell Claude to read `05_CLAUDE_CODE_BUILD_BRIEF.md` first and use the other files as supporting specifications.

## C. Tell Claude not to rewrite everything at once

Require incremental implementation and a passing build after each major phase.

## D. Decide whether the existing product/UI patterns remain in the same primary frontend

Recommended:

- keep them;
- make the new designer-facing Examples/Collections experience primary;
- put conventional UI controls in a quieter `Components` or developer-oriented area rather than deleting them.

## E. Confirm the Vercel project connection

The GitHub repo should be connected to a Vercel project with preview deployments enabled.

If the site is internal, configure Deployment Protection in Vercel manually. Claude cannot safely infer your organisation's desired access policy.

---

# Dependencies

## Already present — keep

- `react`
- `react-dom`
- `motion`
- `@mantine/core`
- `@mantine/hooks`
- `@mantine/notifications`
- `lucide-react`
- Vite/TypeScript tooling

## Add for V2

Runtime:

```bash
npm install react-router
```

Development/test:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @playwright/test @axe-core/playwright
```

Then install Playwright's browser binaries in environments where end-to-end tests will run:

```bash
npx playwright install
```

For Linux CI environments, the project may instead need:

```bash
npx playwright install --with-deps
```

## Review/remove if unused

- `framer-motion`

Do this only after a repository-wide import search confirms no live code depends on it.

## Do not add for V2 foundation

- GSAP
- Lenis
- Three.js
- a second component framework
- an MCP server
- `@vercel/react-router` for the recommended SPA architecture

Rive remains optional and pattern-specific.

---

# Claude Code on the web — manual actions

For browser-only users, no terminal setup should be required once V2 is built. Claude Code on the web clones the GitHub repo into a remote environment and can install packages/run tests there. Repo-owned `SessionStart` hooks can prepare dependencies automatically.

For the initial V2 build, you need to do only this:

1. Open Claude Code on the web and select `jasontheodorou/symphonia-pattern-library`.
2. Make sure the Claude/GitHub connection has access to the repository.
3. Use Trusted network access (or another policy that permits npm) so Claude can install dependencies.
4. Give Claude `09_CLAUDE_CODE_START_HERE.md` as the task instruction.
5. Review the branch/PR Claude produces rather than allowing an unreviewed direct production deployment.

After V2 contains the committed setup hook, later designers should not need to perform dependency setup themselves.

---

# Vercel checklist

- Keep the existing SPA rewrite in `vercel.json`.
- Verify direct URLs such as `/examples/large-heading` on a preview deployment.
- Verify refresh on nested routes.
- Verify back/forward navigation.
- Verify mobile layout on the deployed build, not just localhost.
- If internal, enable Deployment Protection/Vercel Authentication in Vercel project settings.
- Do not store access passwords in `VITE_` environment variables.

---

# Recommended V3

Do not begin V3 until designers have used V2 on real projects.

The best V3 candidates are:

## 1. Source-copy installer

A registry-driven installer similar in spirit to shadcn:

```bash
npx symphonia add large-heading
```

The important feature is not the CLI itself; it is that the manifest knows exactly which files and dependencies a pattern needs. The same manifest can drive Claude-based installation for browser users.

## 2. Brand setup

Allow a designer to provide:

- logo;
- colours;
- fonts;
- optional reference page.

Generate a Symphonia theme and preview every pattern in that brand.

## 3. Saved collections

Let teams save a small approved set such as:

- Our defaults
- Campaign
- Service design
- Editorial

This prevents pattern sprawl.

## 4. Copy-to-Claude from every live configuration

The playground should generate a precise prompt containing:

- pattern id;
- style;
- energy;
- trigger;
- target area;
- target repo conventions.

## 5. Visual regression service

Promote visual regression from local Playwright screenshots into CI/previews so a token or Motion upgrade cannot silently alter every pattern.

## 6. Compatibility adapters

Only after demand exists, add explicit adapters for:

- Next.js;
- Tailwind;
- CSS Modules;
- other internal stacks.

Do not compromise the core components to support every stack prematurely.

## 7. Optional Rive pack

Create a separate heavier collection for authored illustrative motion rather than making Rive a core dependency.

## 8. Pattern telemetry/research feedback

Track which patterns designers actually use and where they struggle. Use evidence to decide what graduates from Experimental to Ready.

## 9. Governance

Introduce:

- owners;
- deprecation policy;
- changelog;
- semantic versioning for portable patterns;
- contribution template;
- accessibility sign-off.

## 10. AI-native discovery

A designer should eventually be able to say:

> I need a calm way to explain a four-step process.

and Symphonia should return three appropriate live patterns rather than requiring the user to understand the catalogue taxonomy.

That is a V3 feature. V2 should first make the visual catalogue excellent.
