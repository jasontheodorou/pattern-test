import type { DesignerControls, SymphoniaPattern } from '../../registry/types'
import type { SymphoniaStyle } from '../../styles/motionStyles'
import type { SymphoniaEnergy } from '../../styles/energy'
import type { SymphoniaSpeed } from '../../styles/speed'
import './Controls.css'

type Props = {
  pattern: SymphoniaPattern
  value: DesignerControls
  onChange: (next: DesignerControls) => void
}

const ENERGIES: SymphoniaEnergy[] = ['low', 'medium', 'high']
const SPEEDS: SymphoniaSpeed[] = ['slow', 'normal', 'fast']

export function Controls({ pattern, value, onChange }: Props) {
  return (
    <div className="s-controls">
      <fieldset className="s-controls__group">
        <legend className="s-controls__legend">Style</legend>
        <div className="s-controls__row">
          {pattern.styles.map(s => (
            <button
              key={s}
              type="button"
              onClick={() => onChange({ ...value, style: s as SymphoniaStyle })}
              className={`s-controls__chip ${value.style === s ? 'v-controls__chip--active' : ''}`}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="s-controls__group">
        <legend className="s-controls__legend">Energy</legend>
        <div className="s-controls__row">
          {ENERGIES.map(e => (
            <button
              key={e}
              type="button"
              onClick={() => onChange({ ...value, energy: e })}
              className={`s-controls__chip ${value.energy === e ? 'v-controls__chip--active' : ''}`}
            >
              {e}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="s-controls__group">
        <legend className="s-controls__legend">Speed</legend>
        <div className="s-controls__row">
          {SPEEDS.map(s => (
            <button
              key={s}
              type="button"
              onClick={() => onChange({ ...value, speed: s })}
              className={`s-controls__chip ${value.speed === s ? 'v-controls__chip--active' : ''}`}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>
    </div>
  )
}
