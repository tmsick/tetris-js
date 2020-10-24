import { Tetromino } from "../index.js"
import { e1, e2 } from "../../vector.js"

// +---+
// |   |
// +---+---+---+
// |   |   |   |
// +---+---+---+
export class J extends Tetromino {
  constructor() {
    const name = "J"
    const color = 0x1976d2
    const shapeVectors = [
      [-3, -3],
      [-3, -1],
      [-1, -1],
      [1, -1]
    ].map(([x, y]) => e1.mul(x).add(e2.mul(y)))
    const scale = 2
    const coreIndex = 2
    super(name, color, shapeVectors, scale, coreIndex)
  }
}
