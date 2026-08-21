import type { OlindaStyle } from '../../styles/motionStyles'
import type { OlindaEnergy } from '../../styles/energy'
import type { OlindaSpeed } from '../../styles/speed'
import { Stagger } from './Stagger'
import './Stagger.css'

type Props = {
  playKey?: number
  style?: OlindaStyle
  energy?: OlindaEnergy
  speed?: OlindaSpeed
}

export function StaggerDemo({
  playKey = 0,
  style = 'editorial',
  energy = 'medium',
  speed = 'normal',
}: Props) {
  return (
    <div className="o-stagger-demo">
      <Stagger
        style={style}
        energy={energy}
        speed={speed}
        playKey={playKey}
        className="o-stagger-demo__block"
      >
        <p className="o-stagger-demo__kicker">Editorial motion</p>
        <p className="o-stagger-demo__line">Slower rhythm.</p>
        <p className="o-stagger-demo__line">Longer arcs.</p>
        <p className="o-stagger-demo__line">Room to breathe.</p>
      </Stagger>
    </div>
  )
}
