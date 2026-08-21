import { Link } from 'react-router'
import './HomePage.css'

type Chapter = {
  id: string
  label: string
  description: string
  art: 'quiet' | 'clear' | 'bold' | 'playful' | 'editorial' | 'experimental'
}

const CHAPTERS: Chapter[] = [
  { id: 'clear',        label: 'Clear',        description: 'Direct and functional. For task interfaces and dashboards.',          art: 'clear' },
  { id: 'editorial',    label: 'Editorial',    description: 'Slower rhythm, longer arcs. For story-led pages and long-form work.', art: 'editorial' },
  { id: 'experimental', label: 'Experimental', description: 'Ideas in progress. Motion still being figured out.',                  art: 'experimental' },
]

export function HomePage() {
  return (
    <div className="s-home">

      <section className="s-home__hero">
        <h1 className="s-home__title">
          reusable patterns<br />for everyone
        </h1>
        <p className="s-home__lede">
          A small pattern library for public-sector design work. Motion where it means something. Restraint where it doesn&apos;t.
        </p>
      </section>

      <section className="s-home__chapters">
        {CHAPTERS.map((c) => (
          <Link to={`/collections/${c.id}`} className="s-chapter" key={c.id}>
            <div className={`s-chapter__art s-chapter__art--${c.art}`} aria-hidden="true">
              <ChapterArt variant={c.art} />
            </div>
            <div className="s-chapter__caption">
              <h2 className="s-chapter__title">{c.label}</h2>
              <p className="s-chapter__desc">{c.description}</p>
            </div>
          </Link>
        ))}
      </section>

    </div>
  )
}

function ChapterArt({ variant }: { variant: Chapter['art'] }) {
  switch (variant) {
    case 'quiet':
      return (
        <>
          <span className="s-art-shape s-art-shape--soft-a" />
          <span className="s-art-shape s-art-shape--soft-b" />
        </>
      )
    case 'clear':
      return (
        <>
          <span className="s-art-shape s-art-shape--grid-a" />
          <span className="s-art-shape s-art-shape--grid-b" />
          <span className="s-art-shape s-art-shape--grid-c" />
        </>
      )
    case 'bold':
      return (
        <>
          <span className="s-art-shape s-art-shape--bold-a" />
          <span className="s-art-shape s-art-shape--bold-b" />
        </>
      )
    case 'playful':
      return (
        <>
          <span className="s-art-shape s-art-shape--play-a" />
          <span className="s-art-shape s-art-shape--play-b" />
          <span className="s-art-shape s-art-shape--play-c" />
          <span className="s-art-shape s-art-shape--play-d" />
        </>
      )
    case 'editorial':
      return (
        <>
          <span className="s-art-shape s-art-shape--ed-a" />
          <span className="s-art-shape s-art-shape--ed-b" />
        </>
      )
    case 'experimental':
      return (
        <>
          <span className="s-art-shape s-art-shape--xp-a" />
          <span className="s-art-shape s-art-shape--xp-b" />
          <span className="s-art-shape s-art-shape--xp-c" />
        </>
      )
  }
}
