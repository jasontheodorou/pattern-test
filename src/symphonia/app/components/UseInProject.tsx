import { useEffect, useState } from 'react'
import type { DesignerControls, SymphoniaPattern } from '../../registry/types'
import { renderPrompt, type AgentTool } from '../../agent/prompts'
import './UseInProject.css'

type Props = {
  pattern: SymphoniaPattern
  controls: DesignerControls
}

const STORAGE_KEY = 'symphonia:tool'

function readTool(): AgentTool {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v === 'codex' ? 'codex' : 'claude'
  } catch {
    return 'claude'
  }
}

export function UseInProject({ pattern, controls }: Props) {
  const [tool, setTool] = useState<AgentTool>(() => readTool())
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, tool) } catch { /* ignore */ }
  }, [tool])

  const text = renderPrompt(pattern, controls, tool)
  const label = tool === 'codex' ? 'Codex' : 'Claude'

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch { /* ignore */ }
  }

  return (
    <div className="s-uip">
      <div className="s-uip__toolbar">
        <div className="s-uip__tools" role="tablist" aria-label="Choose your AI">
          <button
            type="button"
            role="tab"
            aria-selected={tool === 'claude'}
            onClick={() => setTool('claude')}
            className={`s-uip__tool ${tool === 'claude' ? 's-uip__tool--active' : ''}`}
          >
            <ClaudeMark />
            <span>Claude</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tool === 'codex'}
            onClick={() => setTool('codex')}
            className={`s-uip__tool ${tool === 'codex' ? 's-uip__tool--active' : ''}`}
          >
            <CodexMark />
            <span>Codex</span>
          </button>
        </div>
        <button type="button" className="s-uip__copy" onClick={copy}>
          {copied ? 'Copied' : `Copy for ${label}`}
        </button>
      </div>

      <pre className="s-uip__pre" aria-label={`Prompt for ${label}`}>
        <code>{text}</code>
      </pre>
    </div>
  )
}

function ClaudeMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" />
    </svg>
  )
}

function CodexMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <circle cx="12" cy="5"  r="2.4" />
      <circle cx="18.06" cy="8.5"  r="2.4" />
      <circle cx="18.06" cy="15.5" r="2.4" />
      <circle cx="12" cy="19" r="2.4" />
      <circle cx="5.94"  cy="15.5" r="2.4" />
      <circle cx="5.94"  cy="8.5"  r="2.4" />
    </svg>
  )
}
