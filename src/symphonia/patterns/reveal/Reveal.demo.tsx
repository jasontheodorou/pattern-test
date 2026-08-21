import type { SymphoniaStyle } from '../../styles/motionStyles'
import type { SymphoniaEnergy } from '../../styles/energy'
import type { SymphoniaSpeed } from '../../styles/speed'
import { Reveal } from './Reveal'
import './Reveal.css'

type Props = {
  playKey?: number
  style?: SymphoniaStyle
  energy?: SymphoniaEnergy
  speed?: SymphoniaSpeed
}

export function RevealDemo({
  playKey = 0,
  style = 'clear',
  energy = 'medium',
  speed = 'normal',
}: Props) {
  return (
    <div className="s-reveal-demo">
      <Reveal style={style} energy={energy} speed={speed} playKey={playKey}>
        <div className="s-reveal-demo__block">
          <p className="s-reveal-demo__kicker">Apply for support</p>
          <h2 className="s-reveal-demo__title">Better public services, made together.</h2>
        </div>
      </Reveal>
    </div>
  )
}
