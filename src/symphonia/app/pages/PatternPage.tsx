import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { PATTERNS } from '../../registry/patterns'
import { Controls } from '../components/Controls'
import { UseWithClaude } from '../components/UseWithClaude'
import { DeveloperDetails } from '../components/DeveloperDetails'
import type { DesignerControls } from '../../registry/types'
import './PatternPage.css'

function collectionSlug(collections: string[]): string {
  return (collections[0] ?? 'Clear').toLowerCase()
}

export function PatternPage() {
  const { patternId } = useParams()
  const pattern = PATTERNS.find(p => p.id === patternId)

  const [controls, setControls] = useState<DesignerControls>({
    style: pattern?.styles[0],
    energy: 'medium',
    speed: 'normal',
    when: 'load',
  })
  const [playKey, setPlayKey] = useState(0)

  if (!pattern) {
    return (
      <div className="s-pp">
        <p className="s-pp__missing">
          Pattern not found. <Link to="/examples">Back to patterns</Link>
        </p>
      </div>
    )
  }

  const Demo = pattern.demo
  const collection = collectionSlug(pattern.collections)

  return (
    <div className="s-pp">

      <nav className="s-pp__crumb" aria-label="Breadcrumb">
        <Link to={`/collections/${collection}`}>{pattern.collections[0]}</Link>
        <span aria-hidden="true"> / </span>
        <span>{pattern.name}</span>
      </nav>

      <div className={`s-pp__canvas s-pp__canvas--${collection}`}>
        <Demo
          playKey={playKey}
          style={controls.style}
          energy={controls.energy}
          speed={controls.speed}
        />
        <button
          type="button"
          className="s-pp__play"
          onClick={() => setPlayKey(k => k + 1)}
        >
          <span aria-hidden="true">▶</span> Play again
        </button>
      </div>

      <div className="s-pp__body">

        <header className="s-pp__head">
          <h1 className="s-pp__title">{pattern.name}</h1>
          <p className="s-pp__desc">{pattern.description}</p>
        </header>

        <section className="s-pp__section">
          <h2 className="s-pp__section-title">Use for</h2>
          <ul className="s-pp__list">
            {pattern.goodFor.map(g => <li key={g}>{g}</li>)}
          </ul>
        </section>

        <section className="s-pp__section">
          <h2 className="s-pp__section-title">Try it</h2>
          <Controls pattern={pattern} value={controls} onChange={setControls} />
        </section>

        <section className="s-pp__section s-pp__section--use">
          <h2 className="s-pp__section-title">Use in your project</h2>
          <p className="s-pp__use-lede">
            Copy the prompt and paste it into Claude Code in your project. Claude will read your theme and adapt the pattern to fit.
          </p>
          <UseWithClaude pattern={pattern} controls={controls} />
        </section>

        <DeveloperDetails pattern={pattern} />
      </div>
    </div>
  )
}
