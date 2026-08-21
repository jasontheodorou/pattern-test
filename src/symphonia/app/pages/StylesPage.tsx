import { motion } from 'motion/react'
import { Link, useParams } from 'react-router'
import { motionStyles, type SymphoniaStyle } from '../../styles/motionStyles'
import './StylesPage.css'

const STYLES: { id: SymphoniaStyle; name: string; description: string }[] = [
  { id: 'quiet',     name: 'Quiet',     description: 'Barely-there movement. For calm surfaces and long reads.' },
  { id: 'clear',     name: 'Clear',     description: 'Direct and functional. For task interfaces and dashboards.' },
  { id: 'editorial', name: 'Editorial', description: 'Slower rhythm, longer arcs. For story-led pages.' },
  { id: 'bold',      name: 'Bold',      description: 'Louder distance, more weight. For declarative headlines.' },
  { id: 'playful',   name: 'Playful',   description: 'Springy and light. For lighter marketing touches.' },
]

export function StylesPage() {
  const { styleId } = useParams()
  const active = styleId ? STYLES.find(s => s.id === styleId) : null

  if (active) {
    return (
      <div className="s-styles s-styles--detail">
        <div className="s-styles__crumb">
          <Link to="/styles">Styles</Link> · {active.name}
        </div>
        <h1 className="s-styles__title">{active.name}</h1>
        <p className="s-styles__lede">{active.description}</p>

        <section className="s-styles__preview">
          <motion.h2
            key={active.id}
            initial={{ opacity: 0, y: motionStyles[active.id].distance }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: motionStyles[active.id].duration,
              ease: motionStyles[active.id].ease,
            }}
            className="s-styles__preview-headline"
          >
            A large heading, in this style.
          </motion.h2>
        </section>

        <dl className="s-styles__tokens">
          <div><dt>Duration</dt><dd>{motionStyles[active.id].duration}s</dd></div>
          <div><dt>Distance</dt><dd>{motionStyles[active.id].distance}px</dd></div>
          <div><dt>Stagger</dt><dd>{motionStyles[active.id].stagger}s</dd></div>
          <div><dt>Spring</dt><dd>k {motionStyles[active.id].spring.stiffness} · c {motionStyles[active.id].spring.damping}</dd></div>
        </dl>
      </div>
    )
  }

  return (
    <div className="s-styles">
      <header className="s-styles__head">
        <h1 className="s-styles__title">Styles</h1>
        <p className="s-styles__lede">
          Five semantic motion styles. Pick a mood; the numbers behind it are the same everywhere.
        </p>
      </header>

      <div className="s-styles__grid">
        {STYLES.map(s => (
          <Link key={s.id} to={`/styles/${s.id}`} className="s-styles__card">
            <div className="s-styles__card-name">{s.name}</div>
            <div className="s-styles__card-desc">{s.description}</div>
            <div className="s-styles__card-nums">
              {motionStyles[s.id].duration}s · {motionStyles[s.id].distance}px
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
