import type { SymphoniaPattern, DesignerControls } from '../registry/types'

export function renderPrompt(pattern: SymphoniaPattern, controls: DesignerControls = {}): string {
  return pattern.prompt
    .replace(/\{\{name\}\}/g, pattern.name)
    .replace(/\{\{id\}\}/g, pattern.id)
    .replace(/\{\{style\}\}/g,  controls.style  ?? pattern.styles[0]  ?? 'quiet')
    .replace(/\{\{energy\}\}/g, controls.energy ?? 'medium')
    .replace(/\{\{speed\}\}/g,  controls.speed  ?? 'normal')
    .replace(/\{\{when\}\}/g,   controls.when   ?? 'scroll')
    .replace(/\{\{text\}\}/g,   controls.text   ?? '')
    .replace(/\{\{target\}\}/g, controls.text   ?? 'the target section')
}
