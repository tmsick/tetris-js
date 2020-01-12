import _ from "lodash"
import React from "react"
import { Group } from "react-konva"
import Vector from "../vector"
import { e1, e2 } from "../vector/basis"
import * as Variants from "../tetromino/variants"
import OutsetSquare from "./OutsetSquare.jsx"

export function generateThumbnails() {
  const minoes = []
  for (const key of Object.keys(Variants)) {
    minoes.push(new Variants[key]())
  }
  let maxWidth = 0
  let maxHeight = 0
  for (const mino of minoes) {
    const vectors = mino.getVectors()
    const easternmost = _.max(vectors.map(v => v.x))
    const westernmost = _.min(vectors.map(v => v.x))
    const southernmost = _.max(vectors.map(v => v.y))
    const northernmost = _.min(vectors.map(v => v.y))
    const width = easternmost - westernmost
    const height = southernmost - northernmost
    maxWidth = width > maxWidth ? width : maxWidth
    maxHeight = height > maxHeight ? height : maxHeight
    mino.originVector = new Vector(westernmost, northernmost)
    mino.diagonalVector = new Vector(easternmost, southernmost)
  }
  const div = (maxWidth > maxHeight ? maxWidth : maxHeight) + 1
  const unit = 1 / div
  const squareDiagonalVector = e1.add(e2)
  const squareCenterVector = squareDiagonalVector.div(2)
  const thumbnails = {}
  for (const mino of minoes) {
    const centerVector = mino.diagonalVector.div(2)
    const vectors = mino.getVectors().map(v =>
      v
        .sub(mino.originVector)
        .sub(centerVector)
        .mul(unit)
        .add(squareCenterVector)
        .sub(
          e1
            .div(2)
            .add(e2.div(2))
            .mul(unit)
        )
    )
    thumbnails[mino.name] = ({ x, y, size }) => (
      <Group x={x} y={y} width={size} height={size}>
        {vectors.map(v => (
          <OutsetSquare
            key={v.id}
            x={v.x * size}
            y={v.y * size}
            width={unit * size}
            height={unit * size}
            fill={mino.getColor()}
          />
        ))}
      </Group>
    )
  }
  return thumbnails
}

export default generateThumbnails()
