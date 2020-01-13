import React from "react"
import { Group } from "react-konva"
import OutsetSquare from "./OutsetSquare"
import Vector from "../vector"

function Field({ x, y, unit, width, height, mino, squares }) {
  const rects = []
  for (const { x, y, id } of mino.getVectors()) {
    rects.push(
      <OutsetSquare
        key={id}
        x={x * unit}
        y={y * unit}
        width={unit}
        height={unit}
        fill={mino.getColor()}
      />
    )
  }
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const color = squares[y][x]
      if (color) {
        const v = new Vector(x, y)
        rects.push(
          <OutsetSquare
            key={v.id}
            x={x * unit}
            y={y * unit}
            width={unit}
            height={unit}
            fill={color}
          />
        )
      }
    }
  }

  return (
    <Group x={x} y={y} width={width * unit} height={height * unit}>
      {rects}
    </Group>
  )
}

export default Field
