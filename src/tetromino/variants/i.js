import { Tetromino } from "../index.js"
import { e1, e2 } from "../../vector.js"

// +---+---+---+---+
// |   |   |   |   |
// +---+---+---+---+
export class I extends Tetromino {
  constructor() {
    const name = "I"
    const color = 0xb3e5fc
    const shapeVectors = [
      [-2, 1],
      [-1, 1],
      [0, 1],
      [1, 1]
    ].map(([x, y]) => e1.mul(x).add(e2.mul(y)))
    const scale = 1
    const coreIndex = 1
    const fixPosture = (vector, posture) => {
      const fixers = [
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1]
      ].map(([x, y]) => e1.mul(x).add(e2.mul(y)))
      return vector.add(fixers[posture])
    }
    super(name, color, shapeVectors, scale, coreIndex, fixPosture)
  }
}
