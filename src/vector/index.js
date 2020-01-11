import * as math from "mathjs"

class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.id = `__vec__${x}_${y}`
  }

  equal(other) {
    return this.x === other.x && this.y === other.y
  }

  add(other) {
    return new Vector(this.x + other.x, this.y + other.y)
  }

  sub(other) {
    return this.add(other.mul(-1))
  }

  mul(scaler) {
    return new Vector(this.x * scaler, this.y * scaler)
  }

  div(scaler) {
    return new Vector(this.x / scaler, this.y / scaler)
  }

  rotate(theta) {
    const R = math.matrix([
      [math.cos(theta), -math.sin(theta)],
      [math.sin(theta), math.cos(theta)]
    ])
    const { x, y } = this
    return new Vector(...math.multiply(R, [x, y])._data)
  }

  round() {
    return new Vector(math.round(this.x), math.round(this.y))
  }
}

export default Vector
