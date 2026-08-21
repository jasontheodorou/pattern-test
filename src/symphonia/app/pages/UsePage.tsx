import { Link } from 'react-router'
import './UsePage.css'

export function UsePage() {
  return (
    <div className="s-use">
      <header className="s-use__head">
        <h1 className="s-use__title">How to use Symphonia</h1>
        <p className="s-use__lede">
          Symphonia is not a package you install. It&apos;s a small catalogue of
          patterns, and each pattern comes with a prompt you can paste into
          Claude or Codex inside <em>your</em> project.
        </p>
      </header>

      <ol className="s-use__steps">
        <li>
          <h3>Open your project in Claude or Codex</h3>
          <p>
            Any project — a Next.js site, a React app, a plain HTML page. Point Claude Code
            (in a terminal) or Codex (in your OpenAI account) at that folder. Nothing
            Symphonia-specific to install.
          </p>
        </li>
        <li>
          <h3>Pick a pattern here</h3>
          <p>
            Browse <Link to="/examples">Patterns</Link> or start from a{' '}
            <Link to="/collections/clear">collection</Link>. Every pattern has a live
            demo so you can see it work before you commit.
          </p>
        </li>
        <li>
          <h3>Adjust the controls</h3>
          <p>
            Three chips — Style, Energy, Speed — let you tune the motion until it feels
            right. The canvas updates live.
          </p>
        </li>
        <li>
          <h3>Copy for Claude or Codex</h3>
          <p>
            At the bottom of the pattern page, choose <em>Claude</em> or <em>Codex</em>{' '}
            and click Copy. The prompt includes: the pattern&apos;s name, your control
            choices, the GitHub URL of the source, the exact files to copy, and any
            dependencies to install.
          </p>
        </li>
        <li>
          <h3>Paste into your AI chat</h3>
          <p>
            The AI fetches the source from GitHub, copies the files into your project,
            adapts colours and typography to your existing theme, installs anything
            missing, and runs the build.
          </p>
        </li>
      </ol>

      <section className="s-use__faq">
        <h2 className="s-use__faq-title">Common questions</h2>

        <details className="s-use__q">
          <summary>Do I have to install Symphonia?</summary>
          <p>
            No. Symphonia doesn&apos;t ship an npm package or an app. The prompt is the
            install: it tells your AI which files to fetch from this repo and how to
            wire them in.
          </p>
        </details>

        <details className="s-use__q">
          <summary>What if my project isn&apos;t React?</summary>
          <p>
            The current patterns are React + Motion for React. If you&apos;re on Vue,
            Svelte, or plain HTML, ask Claude or Codex to translate the pattern to your
            framework — the AI can read the source and port it.
          </p>
        </details>

        <details className="s-use__q">
          <summary>What dependencies do the patterns need?</summary>
          <p>
            The motion patterns use one small library called{' '}
            <code>motion</code>. The prompt tells your AI to install it if you don&apos;t
            already have it. CSS-only patterns need nothing.
          </p>
        </details>

        <details className="s-use__q">
          <summary>Can I just copy the code manually?</summary>
          <p>
            Yes — every pattern&apos;s source is public in{' '}
            <a href="https://github.com/jasontheodorou/pattern-test" target="_blank" rel="noreferrer">
              the Symphonia repo
            </a>. The AI workflow is faster because it also handles theme adaptation and
            file paths, but nothing stops you from copy-pasting yourself.
          </p>
        </details>

        <details className="s-use__q">
          <summary>Does Claude or Codex work better?</summary>
          <p>
            Either works. Symphonia&apos;s prompt is written to be tool-agnostic — the
            only real difference is the greeting line at the top. Pick whichever AI
            you already have set up.
          </p>
        </details>
      </section>
    </div>
  )
}
