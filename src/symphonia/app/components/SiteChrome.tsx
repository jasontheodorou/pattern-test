import { NavLink, Link } from 'react-router'
import './SiteChrome.css'

const NAV = [
  { to: '/examples',              label: 'Patterns' },
  { to: '/collections/editorial', label: 'Collections' },
  { to: '/use',                   label: 'Use' },
  { to: '/about',                 label: 'About' },
]

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="s-chrome">
      <header className="s-chrome__header">
        <div className="s-chrome__row">
          <Link to="/" className="s-chrome__brand">Symphonia</Link>
          <nav className="s-chrome__nav" aria-label="Primary">
            {NAV.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `s-chrome__link ${isActive ? 'v-chrome__link--active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="s-chrome__main">{children}</main>

      <footer className="s-chrome__footer">
        <div className="s-chrome__row">
          <span className="s-chrome__muted">Symphonia · Reusable patterns for everyone</span>
        </div>
      </footer>
    </div>
  )
}
