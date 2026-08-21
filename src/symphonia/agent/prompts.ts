import type { SymphoniaPattern, DesignerControls } from '../registry/types'

export type AgentTool = 'claude' | 'codex'

const REPO_URL = 'https://github.com/jasontheodorou/pattern-test'
const REPO_BRANCH = 'main'

function fill(template: string, pattern: SymphoniaPattern, controls: DesignerControls): string {
  return template
    .replace(/\{\{name\}\}/g, pattern.name)
    .replace(/\{\{id\}\}/g, pattern.id)
    .replace(/\{\{style\}\}/g,  controls.style  ?? pattern.styles[0]  ?? 'clear')
    .replace(/\{\{energy\}\}/g, controls.energy ?? 'medium')
    .replace(/\{\{speed\}\}/g,  controls.speed  ?? 'normal')
    .replace(/\{\{when\}\}/g,   controls.when   ?? 'load')
    .replace(/\{\{text\}\}/g,   controls.text   ?? '')
    .replace(/\{\{target\}\}/g, controls.text   ?? 'the target section')
}

export function renderPrompt(
  pattern: SymphoniaPattern,
  controls: DesignerControls = {},
  tool: AgentTool = 'claude',
): string {
  const salutation = tool === 'codex' ? 'Codex' : 'Claude Code'

  const preamble =
`${salutation} — you are integrating a Symphonia pattern into this project.

Fetch the source files listed below from ${REPO_URL} (branch: ${REPO_BRANCH})
and copy them into this project, preserving folder shape. Adapt colours,
typography, and radii to match the project's existing theme. Install any
listed dependencies if they aren't already present. Preserve unrelated code.
`

  const body = fill(pattern.prompt, pattern, controls)

  const files =
`\nFiles to copy:
${pattern.files.map(f => `- ${f}`).join('\n')}`

  const deps = pattern.packages.length
    ? `\n\nDependencies (install if missing): ${pattern.packages.join(', ')}`
    : ''

  const closer = `\n\nAfter the pattern is in place, run the project's build and fix any errors.`

  return `${preamble}\n${body}${files}${deps}${closer}\n`
}
