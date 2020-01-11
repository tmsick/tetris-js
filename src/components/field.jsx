import React from "react"
import Square from "./Square.jsx"
import Vector from "../vector"

function Field({ unit, width, height, mino, squares }) {
  const rects = []
  for (const { x, y, id } of mino.getVectors()) {
    rects.push(
      <Square key={id} unit={unit} x={x} y={y} color={mino.getColor()} />
    )
  }
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const color = squares[y][x]
      if (color) {
        const v = new Vector(x, y)
        rects.push(<Square key={v.id} unit={unit} x={x} y={y} color={color} />)
      }
    }
  }

  return rects
}

export default Field
