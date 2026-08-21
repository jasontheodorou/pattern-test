import type { OlindaEnergy } from '../../styles/energy'
import type { OlindaSpeed } from '../../styles/speed'
import { Magnetic } from './Magnetic'
import './Magnetic.css'

type Props = {
  playKey?: number
  style?: unknown
  energy?: OlindaEnergy
  speed?: OlindaSpeed
}

export function MagneticDemo({
  playKey = 0,
  energy = 'medium',
  speed = 'normal',
}: Props) {
  return (
    <div className="o-magnetic-demo" key={playKey}>
      <p className="o-magnetic-demo__hint">Move your cursor</p>
      <div className="o-magnetic-demo__field">
        <Magnetic energy={energy} speed={speed}>
          <div className="o-magnetic-demo__disc" />
        </Magnetic>
      </div>
    </div>
  )
}
