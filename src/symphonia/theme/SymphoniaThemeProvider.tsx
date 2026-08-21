import type { CSSProperties, ReactNode } from 'react'
import type { SymphoniaTheme } from './contract'

type Props = {
  theme: SymphoniaTheme
  children: ReactNode
}

function toCssVars(theme: SymphoniaTheme): CSSProperties {
  return {
    '--s-bg':           theme.colour.background,
    '--s-surface':      theme.colour.surface,
    '--s-text':         theme.colour.text,
    '--s-muted':        theme.colour.muted,
    '--s-primary':      theme.colour.primary,
    '--s-accent':       theme.colour.accent ?? theme.colour.primary,
    '--s-font-display': theme.type.display,
    '--s-font-body':    theme.type.body,
    '--s-font-mono':    theme.type.mono ?? theme.type.body,
    '--s-radius-sm':    `${theme.radius.small}px`,
    '--s-radius-md':    `${theme.radius.medium}px`,
    '--s-radius-lg':    `${theme.radius.large}px`,
    '--s-space-page':   theme.spacing.page,
    '--s-space-section': theme.spacing.section,
    minHeight: '100vh',
    background: theme.colour.background,
    color: theme.colour.text,
    fontFamily: theme.type.body,
  } as CSSProperties
}

export function SymphoniaThemeProvider({ theme, children }: Props) {
  return (
    <div data-symphonia-theme style={toCssVars(theme)}>
      {children}
    </div>
  )
}
