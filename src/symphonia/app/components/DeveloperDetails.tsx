import { useState } from 'react'
import type { SymphoniaPattern } from '../../registry/types'
import './DeveloperDetails.css'

export function DeveloperDetails({ pattern }: { pattern: SymphoniaPattern }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`s-dev ${open ? 'v-dev--open' : ''}`}>
      <button className="s-dev__toggle" onClick={() => setOpen(v => !v)} aria-expanded={open}>
        Developer details {open ? '−' : '+'}
      </button>
      {open && (
        <div className="s-dev__body">
          <dl className="s-dev__list">
            <dt>Component</dt><dd><code>{pattern.component}</code></dd>
            <dt>Status</dt><dd>{pattern.status}</dd>
            <dt>Runtime</dt><dd>{pattern.runtime}</dd>
            <dt>Weight</dt><dd>{pattern.weight}</dd>
            <dt>Reduced motion</dt><dd>{pattern.accessibility.reducedMotion}</dd>
            <dt>Files</dt>
            <dd>
              <ul className="s-dev__files">
                {pattern.files.map(f => <li key={f}><code>{f}</code></li>)}
              </ul>
            </dd>
            <dt>Packages</dt><dd>{pattern.packages.length ? pattern.packages.join(', ') : 'none'}</dd>
          </dl>
        </div>
      )}
    </div>
  )
}
