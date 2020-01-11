import Tetromino from ".."
import { e1, e2 } from "../../vector/basis"

// +---+---+
// |   |   |
// +---+---+
// |   |   |
// +---+---+
class O extends Tetromino {
  constructor() {
    const name = "O"
    const color = 0xffee58
    const shapeVectors = [
      [-1, -1],
      [0, -1],
      [-1, 0],
      [0, 0]
    ].map(([x, y]) => e1.mul(x).add(e2.mul(y)))
    const scale = 1
    const coreIndex = 2
    const fixPosture = (vector, posture) => {
      const fixers = [
        [0, 0],
        [0, -1],
        [1, -1],
        [1, 0]
      ].map(([x, y]) => e1.mul(x).add(e2.mul(y)))
      return vector.add(fixers[posture])
    }
    super(name, color, shapeVectors, scale, coreIndex, fixPosture)
  }
}

export default O
