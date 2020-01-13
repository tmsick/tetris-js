import { e1, e2 } from "../vector"

class Tetromino {
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
    this.postures = this.genPostures()
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

  getColor() {
    return "#" + (this.color + 0x1000000).toString(0x10).slice(1)
  }

  //   posture 0      posture 1      posture 2     posture 3
  //
  //     +---+        +---+                            +---+
  //     |   |        |   |                            |   |
  // +---+---+---+    +---+---+    +---+---+---+   +---+---+
  // |   |   |   |    |   |   |    |   |   |   |   |   |   |
  // +---+---+---+    +---+---+    +---+---+---+   +---+---+
  //                  |   |            |   |           |   |
  //                  +---+            +---+           +---+
  genPostures() {
    const shiftVectors = [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 0]
    ]
      .map(([x, y]) => e1.mul(x).add(e2.mul(y)))
      .map(v => v.mul(this.scale))
    const rotUnit = Math.PI / 2
    const postures = []
    for (let posture = 0; posture < 4; posture++) {
      let vectors = this.shapeVectors
      vectors = vectors
        .map(v => v.add(shiftVectors[posture]))
        .map(v => v.rotate(rotUnit * posture))
      const normVector = vectors[this.coreIndex]
      vectors = vectors
        .map(v => v.sub(normVector))
        .map(v => v.div(this.scale))
        .map(v => this.fixPosture(v, posture))
        .map(v => v.round())
      postures.push(vectors)
    }
    return postures
  }
}

export default Tetromino
