# Symphonia V2 — Standard Pattern Specification

Every Symphonia pattern should be documented using this structure.

---

# 1. Human-facing fields

## Name

Plain language.

Examples:
- Large heading
- Image reveal
- Scroll story
- Shuffle

## Description

One sentence.

Example:

> A large heading that changes gently as you move through the page.

## Good for

Maximum three or four items.

Example:
- Homepages
- Section openings
- Campaign pages

## Collections

Any of:
- Quiet
- Clear
- Bold
- Playful
- Editorial
- Experimental

## Status

Lifecycle:
- Ready
- Experimental

Draft patterns stay out of the normal designer catalogue.

Freshness is separate:
- optional New badge (`isNew`/`publishedAt`)

---

# 2. Designer controls

Keep the default surface to approximately four controls.

Recommended common controls:

```ts
type DesignerControls = {
  style?: "quiet" | "clear" | "editorial" | "bold" | "playful";
  energy?: "low" | "medium" | "high";
  speed?: "slow" | "normal" | "fast";
  when?: "load" | "scroll" | "hover" | "click";
};
```

Pattern-specific controls can be added when genuinely useful.

Example:

```ts
type LargeHeadingControls = DesignerControls & {
  text: string;
  align?: "left" | "center" | "right";
};
```

Do not expose implementation parameters on the main designer surface.

---

# 3. Internal component contract

Example:

```ts
export interface LargeHeadingProps {
  text: string;
  style?: SymphoniaStyle;
  energy?: SymphoniaEnergy;
  speed?: SymphoniaSpeed;
  trigger?: SymphoniaTrigger;
  align?: "left" | "center" | "right";
  className?: string;
}
```

All components should:
- accept className where practical;
- preserve semantic HTML;
- avoid owning page-wide styling;
- use theme variables.

---

# 4. Accessibility declaration

Metadata:

```ts
accessibility: {
  reducedMotion: "supported",
  keyboard: "not-applicable",
  hoverOnly: false,
  autoplay: false
}
```

If a pattern is not fully accessible, it cannot be Ready.

---

# 5. Runtime declaration

```ts
runtime: {
  technology: "dom",
  weight: "light"
}
```

Technology:
- dom
- rive
- canvas

Weight:
- light
- medium
- heavy

---

# 6. Dependency declaration

```ts
dependencies: {
  packages: ["motion"],
  core: ["mask", "stagger"]
}
```

This is agent/developer metadata, not designer-facing information.

---

# 7. Files declaration

```ts
files: [
  "src/symphonia/core/mask/Mask.tsx",
  "src/symphonia/core/stagger/Stagger.tsx",
  "src/symphonia/patterns/large-heading/LargeHeading.tsx",
  "src/symphonia/patterns/large-heading/LargeHeading.css"
]
```

This enables source-copy installation.

---

# 8. Claude prompt

Every pattern must generate a useful instruction.

Template:

```text
Add Symphonia's "{{name}}" pattern to this project.

Apply it to:
{{target}}

Style:
{{style}}

Energy:
{{energy}}

Use the project's existing colours and typography.
Preserve the existing visual language.
Do not change unrelated components.
Respect reduced-motion preferences.
Make the mobile behaviour deliberate.
Run the project's build after implementation and fix integration errors.
```

---

# 9. Demo data

Every pattern includes default demo content that is clearly generic and not brand-specific.

Avoid lorem ipsum if a short realistic example is easy.

For public-sector context, examples might be:

- Apply for support
- Find local services
- Understand your options
- Designing better public services
- What happens next

Do not make every demonstration government-themed. Symphonia should remain useful beyond one sector.

---

# 10. Quality checklist

A Ready pattern must pass:

- [ ] Arbitrary content works
- [ ] Brand values are not hard-coded
- [ ] Desktop looks intentional
- [ ] Mobile looks intentional
- [ ] Reduced motion works
- [ ] Keyboard checked
- [ ] Hover equivalents checked
- [ ] No critical content depends on animation
- [ ] Build passes
- [ ] Typecheck passes
- [ ] Demo exists
- [ ] Registry metadata exists
- [ ] Claude prompt exists
- [ ] Pattern can be used outside the gallery
- [ ] No Dropbox assets/code copied

---

# 11. Research provenance

Optional internal metadata:

```ts
reference: {
  source: "Dropbox Brand Guidelines",
  page: "Typography",
  lesson: "Treat typography as interactive material",
  implementation: "clean-room"
}
```

This is useful for future maintainers.

It should not appear prominently on the public Symphonia frontend.
