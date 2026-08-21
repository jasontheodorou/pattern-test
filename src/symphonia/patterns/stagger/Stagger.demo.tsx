import type { SymphoniaStyle } from '../../styles/motionStyles'
import type { SymphoniaEnergy } from '../../styles/energy'
import type { SymphoniaSpeed } from '../../styles/speed'
import { Stagger } from './Stagger'
import './Stagger.css'

type Props = {
  playKey?: number
  style?: SymphoniaStyle
  energy?: SymphoniaEnergy
  speed?: SymphoniaSpeed
}

export function StaggerDemo({
  playKey = 0,
  style = 'editorial',
  energy = 'medium',
  speed = 'normal',
}: Props) {
  return (
    <div className="s-stagger-demo">
      <Stagger
        style={style}
        energy={energy}
        speed={speed}
        playKey={playKey}
        className="s-stagger-demo__block"
      >
        <p className="s-stagger-demo__kicker">Editorial motion</p>
        <p className="s-stagger-demo__line">Slower rhythm.</p>
        <p className="s-stagger-demo__line">Longer arcs.</p>
        <p className="s-stagger-demo__line">Room to breathe.</p>
      </Stagger>
    </div>
  )
}
