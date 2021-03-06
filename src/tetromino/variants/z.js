import { Tetromino } from "../index.js"
import { e1, e2 } from "../../vector.js"

// +---+---+
// |   |   |
// +---+---+---+
//     |   |   |
//     +---+---+
export class Z extends Tetromino {
  constructor() {
    const name = "Z"
    const color = 0xf44336
    const shapeVectors = [
      [-3, -3],
      [-1, -3],
      [-1, -1],
      [1, -1]
    ].map(([x, y]) => e1.mul(x).add(e2.mul(y)))
    const scale = 2
    const coreIndex = 2
    super(name, color, shapeVectors, scale, coreIndex)
  }
}
