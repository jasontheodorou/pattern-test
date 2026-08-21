// ─── Symphonia palette (used by existing pattern-library patterns) ──────────
export const C = {
  ink:     '#202221',
  dark:    '#3C3531',
  muted:   '#654922',
  teal:    '#405748',
  gold:    '#998848',
  bg:      '#F5F2EE',
  surface: '#FFFFFF',
  border:  '#E0DAD3',
}

export const font = "'Inter', arial, sans-serif"

// ─── Transform brand (used by learning patterns designed for RSD Playbook) ──
// Ripped from rsd-playbook/src/theme.ts. Any pattern in this repo that targets
// the "Master your practice" modular learning screens should use these tokens
// so it drops in without visual re-work.

export const T = {
  // Type
  font: '"Open Sans", -apple-system, "Segoe UI", sans-serif',

  // Foreground
  fg: {
    primary:      '#333333',
    secondary:    '#5C5C5C',
    muted:        '#8A8583',    // 13px+ only
    onDark:       '#FFFFFF',
    onDarkMuted:  '#C9C7C5',
  },

  // Surfaces (never pure black; never orange rectangles)
  surface: {
    white:     '#FFFFFF',
    offWhite:  '#FAF8F6',
    cardAlt:   '#F5F3F0',
    dark:      '#333333',
  },

  // Borders
  border: {
    default: '#E6E3DF',
    muted:   '#F5F3F0',
  },

  // Semantic accents
  navy:    '#213D59',    // primary CTA, tabs indicator, links
  navyDeep:'#172C45',
  teal:    '#3E7070',
  purple:  '#673D8A',
  sky:     '#619CBA',
  yellow:  '#F1D46E',
  red:     '#C0392B',    // destructive / error only

  // Orange — RESTRICTED. Circles and headline underlines only. Never fills.
  orange:  '#EC671B',

  // Soft accent tints — for content-context callouts (lessons, docs, app UI).
  soft: {
    mist:   '#E5EDEE',   // cool / technical
    blush:  '#F2E2D6',   // warm / human
    yellow: '#F9F0CE',   // tip / highlight
  },

  // Motion
  motion: {
    fast: '120ms',
    base: '220ms',
    slow: '360ms',
    ease: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
  },

  // Radius — buttons pill by default, cards 12px, inputs 8px
  radius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    pill: 999,
  },

  // Spacing
  space: {
    xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48,
  },
}
