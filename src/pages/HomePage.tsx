import { Box, Container, SimpleGrid, Stack, Text } from '@mantine/core'
import { motion } from 'motion/react'
import { C, font } from '../tokens'
import { PATTERNS } from '../patterns'

type Props = { onNavigate: (id: string) => void }

const SECTIONS = [
  { id: 'patterns',  label: 'Patterns',  count: PATTERNS.length },
  { id: 'templates', label: 'Templates', count: 0 },
  { id: 'themes',    label: 'Themes',    count: 0 },
]

export function HomePage({ onNavigate }: Props) {
  return (
    <Container size={1100} py={52} px={20}>
      <Stack gap={48}>

        {/* Hero */}
        <Box style={{ display: 'flex', gap: 40, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <Stack gap={16} style={{ flex: 1, minWidth: 280, maxWidth: 560 }}>
            <Text component="h1" style={{ fontSize: 36, fontWeight: 700, color: C.ink, fontFamily: font, margin: 0, lineHeight: 1.15 }}>
              Symphonia pattern library
            </Text>
            <Text style={{ fontSize: 17, color: C.dark, fontFamily: font, lineHeight: 1.65, margin: 0 }}>
              Symphonia is a pattern library and plugin system for Claude Code, for use across Transform.
              Patterns, templates, and themes — built here, used everywhere.
            </Text>
          </Stack>
          <img
            src="/orange.svg"
            alt=""
            aria-hidden="true"
            style={{ width: 120, height: 120, flexShrink: 0, marginTop: 4 }}
          />
        </Box>

        {/* Section cards */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        >
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={16}>
            {SECTIONS.map(s => (
              <motion.div
                key={s.id}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 280, damping: 22 } },
                }}
              >
                <Box
                  component="button"
                  onClick={() => onNavigate(s.id)}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    background: C.surface, border: `1px solid ${C.border}`,
                    borderTop: `4px solid ${C.teal}`, padding: '22px', cursor: 'pointer',
                    transition: 'border-top-color 150ms ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderTopColor = C.ink }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderTopColor = C.teal }}
                >
                  <Stack gap={6}>
                    <Text style={{ fontSize: 18, fontWeight: 700, color: C.teal, fontFamily: font, textDecoration: 'underline' }}>
                      {s.label}
                    </Text>
                    <Text style={{ fontSize: 13, color: C.muted, fontFamily: font }}>
                      {s.count === 0 ? 'None yet' : `${s.count} item${s.count !== 1 ? 's' : ''}`}
                    </Text>
                  </Stack>
                </Box>
              </motion.div>
            ))}
          </SimpleGrid>
        </motion.div>

      </Stack>
    </Container>
  )
}
