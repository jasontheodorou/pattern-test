import type { SymphoniaEnergy } from '../../styles/energy'
import type { SymphoniaSpeed } from '../../styles/speed'
import { Magnetic } from './Magnetic'
import './Magnetic.css'

type Props = {
  playKey?: number
  style?: unknown
  energy?: SymphoniaEnergy
  speed?: SymphoniaSpeed
}

export function MagneticDemo({
  playKey = 0,
  energy = 'medium',
  speed = 'normal',
}: Props) {
  return (
    <div className="s-magnetic-demo" key={playKey}>
      <p className="s-magnetic-demo__hint">Move your cursor</p>
      <div className="s-magnetic-demo__field">
        <Magnetic energy={energy} speed={speed}>
          <div className="s-magnetic-demo__disc" />
        </Magnetic>
      </div>
    </div>
  )
}
