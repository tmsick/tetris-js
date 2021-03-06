import React from "react"
import { Variants } from "../tetromino/variants/index.js"
import { Group } from "react-konva"
import { OutsetSquare } from "./OutsetSquare.jsx"
import { Vector, e1, e2 } from "../vector.js"
import { getHexColor } from "../util.js"
import { max, min } from "lodash"

export const Thumbnails = generateThumbnails()

export function generateThumbnails() {
  const minoes = []
  for (const [_, V] of Object.entries(Variants)) minoes.push(new V())
  let maxWidth = 0
  let maxHeight = 0
  for (const mino of minoes) {
    const vectors = mino.getVectors()
    const easternmost = max(vectors.map(v => v.x))
    const westernmost = min(vectors.map(v => v.x))
    const southernmost = max(vectors.map(v => v.y))
    const northernmost = min(vectors.map(v => v.y))
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
            fill={getHexColor(mino.color)}
          />
        ))}
      </Group>
    )
  }
  return thumbnails
}
