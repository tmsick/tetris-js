import { e1, e2 } from "../vector.js"

/**
 * Tetromino abstract class
 */
export class Tetromino {
  constructor(
    name,
    color,
    shapeVectors,
    scale,
    coreIndex,
    fixPosture = vector => vector,
    posture = 0
  ) {
    this.name = name
    this.color = color
    this.shapeVectors = shapeVectors
    this.scale = scale
    this.coreIndex = coreIndex
    this.fixPosture = fixPosture
    this.posture = posture
    this.postures = this.generatePostures()
    this.position = e1.mul(0)
  }

  copy() {
    const copied = new Tetromino(
      this.name,
      this.color,
      this.shapeVectors,
      this.scale,
      this.coreIndex,
      this.fixPosture,
      this.posture
    )
    copied.move(this.position)
    return copied
  }

  getVectors() {
    return this.postures[this.posture].map(v => v.add(this.position))
  }

  moveNorth() {
    this.move(e2.mul(-1))
  }

  moveSouth() {
    this.move(e2)
  }

  moveEast() {
    this.move(e1)
  }

  moveWest() {
    this.move(e1.mul(-1))
  }

  move(vector) {
    this.position = this.position.add(vector)
  }

  rotateClockwise() {
    this.posture = (this.posture + 1) % 4
  }

  rotateAnticlockwise() {
    this.posture = (this.posture + 3) % 4
  }

  /**
   * Generates 4 postures of the tetromino.
   *
   *     +---+        +---+                            +---+
   *     |   |        |   |                            |   |
   * +---+---+---+    +---+---+    +---+---+---+   +---+---+
   * |   |   |   |    |   |   |    |   |   |   |   |   |   |
   * +---+---+---+    +---+---+    +---+---+---+   +---+---+
   *                  |   |            |   |           |   |
   *                  +---+            +---+           +---+
   *   posture 0      posture 1      posture 2     posture 3
   */
  generatePostures() {
    const shiftVectors = [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 0]
    ].map(([x, y]) =>
      e1
        .mul(x)
        .add(e2.mul(y))
        .mul(this.scale)
    )
    const rotationUnit = Math.PI / 2
    const postures = []
    for (let p = 0; p < 4; p++) {
      let vectors = this.shapeVectors
        // shift the point of view
        .map(v => v.add(shiftVectors[p]))
        // rotate, and consequently, the point of view gets back
        .map(v => v.rotate(rotationUnit * p))
      const relativeVector = vectors[this.coreIndex]
      vectors = vectors
        // shift the tetromino to the normalized position
        .map(v => v.sub(relativeVector))
        // normalize the scale
        .map(v => v.div(this.scale))
        // fix for tetromino I and O
        .map(v => this.fixPosture(v, p))
        // we can safely round the vectors as all the vectors' coordinates are logically integers
        .map(v => v.round())
      postures.push(vectors)
    }
    return postures
  }
}
