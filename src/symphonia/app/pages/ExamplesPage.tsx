import { PATTERNS } from '../../registry/patterns'
import { PatternCard } from '../components/PatternCard'
import './ExamplesPage.css'

export function ExamplesPage() {
  const ready = PATTERNS.filter(p => p.status === 'ready')

  return (
    <div className="s-examples">
      <header className="s-examples__head">
        <h1 className="s-examples__title">Examples</h1>
        <p className="s-examples__lede">
          {ready.length === 0
            ? 'No patterns yet. This is the shell.'
            : `${ready.length} live patterns. Pick one to explore, adjust the controls, and generate a Claude prompt.`}
        </p>
      </header>

      {ready.length > 0 && (
        <div className="s-examples__grid">
          {ready.map(p => <PatternCard key={p.id} pattern={p} />)}
        </div>
      )}
    </div>
  )
}
