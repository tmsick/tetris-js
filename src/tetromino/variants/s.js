import Tetromino from ".."
import { e1, e2 } from "../../vector"

//     +---+---+
//     |   |   |
// +---+---+---+
// |   |   |
// +---+---+
class S extends Tetromino {
  constructor() {
    const name = "S"
    const color = 0x66bb6a
    const shapeVectors = [
      [-1, -3],
      [1, -3],
      [-3, -1],
      [-1, -1]
    ].map(([x, y]) => e1.mul(x).add(e2.mul(y)))
    const scale = 2
    const coreIndex = 3
    super(name, color, shapeVectors, scale, coreIndex)
  }
}

export default S
