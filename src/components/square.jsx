import React from "react"
import { Rect } from "react-konva"

function Square({ unit, x, y, color }) {
  return (
    <Rect x={x * unit} y={y * unit} width={unit} height={unit} fill={color} />
  )
}

export default Square
