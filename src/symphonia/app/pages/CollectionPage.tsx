import { useParams, Link } from 'react-router'
import { PATTERNS } from '../../registry/patterns'
import { collectionsFrom } from '../../registry/collections'
import { COLLECTIONS, type Collection } from '../../registry/types'
import { PatternCard } from '../components/PatternCard'
import './CollectionPage.css'

function normalize(input: string | undefined): Collection | null {
  if (!input) return null
  const match = COLLECTIONS.find(c => c.toLowerCase() === input.toLowerCase())
  return match ?? null
}

export function CollectionPage() {
  const { collectionId } = useParams()
  const collection = normalize(collectionId)
  const bag = collectionsFrom(PATTERNS)

  if (!collection) {
    return (
      <div className="s-coll">
        <p className="s-coll__missing">
          Unknown collection. <Link to="/examples">Back to examples</Link>
        </p>
      </div>
    )
  }

  const items = bag[collection]

  return (
    <div className="s-coll">
      <header className="s-coll__head">
        <div className="s-coll__crumb">
          <Link to="/examples">Examples</Link> · Collections
        </div>
        <h1 className="s-coll__title">{collection}</h1>
        <p className="s-coll__lede">{items.length} pattern{items.length === 1 ? '' : 's'} in this collection.</p>
      </header>

      <div className="s-coll__grid">
        {items.map(p => <PatternCard key={p.id} pattern={p} />)}
      </div>

      <nav className="s-coll__sibs" aria-label="Other collections">
        {COLLECTIONS.filter(c => c !== collection).map(c => (
          <Link key={c} to={`/collections/${c.toLowerCase()}`} className="s-coll__sib">{c}</Link>
        ))}
      </nav>
    </div>
  )
}
