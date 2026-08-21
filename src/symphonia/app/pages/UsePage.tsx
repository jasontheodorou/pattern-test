import './UsePage.css'

export function UsePage() {
  return (
    <div className="s-use">
      <header className="s-use__head">
        <h1 className="s-use__title">Use with Claude</h1>
        <p className="s-use__lede">
          Every Symphonia pattern comes with a prompt you can paste into Claude Code inside another project.
          Claude will adapt the pattern to your colours, typography, and content.
        </p>
      </header>

      <ol className="s-use__steps">
        <li>
          <h3>Find a pattern that fits</h3>
          <p>Browse <a href="/examples">Patterns</a> or start from a <a href="/collections/clear">collection</a>. Every entry has a live demo.</p>
        </li>
        <li>
          <h3>Adjust the controls</h3>
          <p>Pick a collection (Clear · Editorial · Experimental), an energy, and a speed. Watch the demo update.</p>
        </li>
        <li>
          <h3>Copy the prompt</h3>
          <p>Click <em>Copy</em> on the &quot;Use with Claude&quot; block. It carries the pattern name, your control choices, and installation instructions.</p>
        </li>
        <li>
          <h3>Paste it into Claude Code in your project</h3>
          <p>Open Claude Code in the target repository, paste the prompt, and let Claude wire the pattern in. It will preserve your existing content and match your theme.</p>
        </li>
      </ol>
    </div>
  )
}
