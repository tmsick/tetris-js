import Tetromino from ".."
import { e1, e2 } from "../../vector/basis"

//         +---+
//         |   |
// +---+---+---+
// |   |   |   |
// +---+---+---+
class L extends Tetromino {
  constructor() {
    const name = "L"
    const color = 0xff9800
    const shapeVectors = [
      [1, -3],
      [-3, -1],
      [-1, -1],
      [1, -1]
    ].map(([x, y]) => e1.mul(x).add(e2.mul(y)))
    const scale = 2
    const coreIndex = 2
    super(name, color, shapeVectors, scale, coreIndex)
  }
}

export default L
