import { Box } from '@mantine/core'
import { C, font } from './tokens'

const NAV = [
  { id: 'patterns',  label: 'Patterns' },
  { id: 'templates', label: 'Templates' },
  { id: 'themes',    label: 'Themes' },
]

type Props = {
  children: React.ReactNode
  currentSection: string
  onNavigate: (id: string) => void
}

export function Layout({ children, currentSection, onNavigate }: Props) {
  return (
    <Box style={{ minHeight: '100vh', background: C.bg, display: 'flex', flexDirection: 'column' }}>

      <Box component="header" style={{ background: C.teal, borderBottom: `3px solid ${C.gold}` }}>
        <Box style={{ maxWidth: 1100, margin: '0 auto', padding: '14px 20px' }}>
          <button onClick={() => onNavigate('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <span style={{ color: C.surface, fontFamily: font, fontSize: 15, fontWeight: 600, letterSpacing: '0.01em' }}>
              Symphonia pattern library
            </span>
          </button>
        </Box>
      </Box>

      <Box component="nav" aria-label="Primary navigation" style={{ background: C.surface, borderBottom: `1px solid ${C.border}` }}>
        <Box style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px', display: 'flex' }}>
          {NAV.map(item => {
            const isActive = currentSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                aria-current={isActive ? 'page' : undefined}
                style={{
                  background: 'none', border: 'none',
                  borderBottom: isActive ? `4px solid ${C.teal}` : '4px solid transparent',
                  padding: '14px 16px', cursor: 'pointer', fontFamily: font,
                  fontSize: 15, fontWeight: isActive ? 600 : 400,
                  color: isActive ? C.teal : C.dark,
                  transition: 'color 150ms ease, border-color 150ms ease',
                }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = C.ink }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = C.dark }}
              >
                {item.label}
              </button>
            )
          })}
        </Box>
      </Box>

      <Box component="main" style={{ flex: 1 }}>{children}</Box>

      <Box component="footer" style={{ borderTop: `1px solid ${C.border}`, padding: '20px', background: C.bg }}>
        <Box style={{ maxWidth: 1100, margin: '0 auto' }}>
          <span style={{ fontSize: 13, color: C.gold, fontFamily: font }}>Transform UK — internal tooling</span>
        </Box>
      </Box>

    </Box>
  )
}
