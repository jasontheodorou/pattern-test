import type { SymphoniaTheme } from './contract'

export const defaultTheme: SymphoniaTheme = {
  colour: {
    background: '#F1F0E4',
    surface:    '#FFFFFF',
    text:       '#1A1F14',
    muted:      '#5F6350',
    primary:    '#4A5A32',
    accent:     '#C9A54A',
  },
  type: {
    display: "'Inter', arial, sans-serif",
    body:    "'Inter', arial, sans-serif",
    mono:    "ui-monospace, 'SF Mono', Menlo, Monaco, monospace",
  },
  radius: {
    small:  6,
    medium: 14,
    large:  28,
  },
  spacing: {
    page:    'clamp(24px, 4vw, 48px)',
    section: 'clamp(48px, 8vw, 128px)',
  },
}
