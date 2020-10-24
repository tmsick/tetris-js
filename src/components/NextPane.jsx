import React from "react"
import { Group } from "react-konva"
import { Thumbnails } from "./Thumbnails.jsx"

export function NextPane({ x, y, width, height, loader }) {
  return (
    <Group x={x} y={y} width={width} height={height}>
      {loader.queue.slice(0, loader.size).map((mino, i) => {
        const Thumb = Thumbnails[mino.name]
        return <Thumb key={i} x={0} y={width * i} size={width} />
      })}
    </Group>
  )
}
