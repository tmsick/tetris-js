import * as math from "mathjs"

export class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y

    /**
     * Each vector has its unique, immutable identifier that can be an object's
     * key or a member of a set.
     */
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

  /**
   * Rotates the receiver around the origin (0, 0).
   */
  rotate(theta) {
    // rotation matrix
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

export const e1 = new Vector(1, 0)
export const e2 = new Vector(0, 1)
