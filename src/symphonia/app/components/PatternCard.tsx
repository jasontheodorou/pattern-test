import { Link } from 'react-router'
import type { SymphoniaPattern } from '../../registry/types'
import './PatternCard.css'

type Props = { pattern: SymphoniaPattern }

function collectionClass(pattern: SymphoniaPattern): string {
  const first = pattern.collections[0]?.toLowerCase() ?? 'clear'
  return `s-card__art--${first}`
}

export function PatternCard({ pattern }: Props) {
  const Demo = pattern.demo
  return (
    <Link to={`/examples/${pattern.id}`} className="s-card">
      <div className={`s-card__art ${collectionClass(pattern)}`} aria-hidden="true">
        <Demo />
      </div>
      <div className="s-card__caption">
        <h2 className="s-card__name">{pattern.name}</h2>
        <p className="s-card__desc">{pattern.description}</p>
      </div>
    </Link>
  )
}
