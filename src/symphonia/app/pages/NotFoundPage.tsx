import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <div style={{ padding: 48, fontFamily: "'Inter', arial, sans-serif" }}>
      <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700 }}>Not found</h1>
      <p style={{ marginTop: 12, opacity: 0.7 }}>
        <Link to="/">Back to home</Link>
      </p>
    </div>
  )
}
