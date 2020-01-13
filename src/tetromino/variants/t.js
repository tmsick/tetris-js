import Tetromino from ".."
import { e1, e2 } from "../../vector"

//     +---+
//     |   |
// +---+---+---+
// |   |   |   |
// +---+---+---+
class T extends Tetromino {
  constructor() {
    const name = "T"
    const color = 0x9c27b0
    const shapeVectors = [
      [-1, -3],
      [-3, -1],
      [-1, -1],
      [1, -1]
    ].map(([x, y]) => e1.mul(x).add(e2.mul(y)))
    const scale = 2
    const coreIndex = 2
    super(name, color, shapeVectors, scale, coreIndex)
  }
}

export default T
