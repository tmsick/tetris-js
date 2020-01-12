import React from "react"
import { Group, Line } from "react-konva"
import chroma from "chroma-js"

function OutsetSquare({ x, y, width, height, fill }) {
  const darkFill = chroma(fill)
    .darken()
    .hex()
  const lightFill = chroma(fill)
    .brighten()
    .hex()

  const bezelLength = (width < height ? width : height) / 10
  const upperLeftDot = [bezelLength, bezelLength]
  const upperRightDot = [width - bezelLength, bezelLength]
  const lowerLeftDot = [bezelLength, height - bezelLength]
  const lowerRightDot = [width - bezelLength, height - bezelLength]

  const upBezel = []
    .concat([0, 0])
    .concat(upperLeftDot)
    .concat(upperRightDot)
    .concat([width, 0])
  const leftBezel = []
    .concat([0, 0])
    .concat(upperLeftDot)
    .concat(lowerLeftDot)
    .concat([0, height])
  const bottomBezel = []
    .concat([0, height])
    .concat(lowerLeftDot)
    .concat(lowerRightDot)
    .concat([width, height])
  const rightBezel = []
    .concat([width, height])
    .concat(lowerRightDot)
    .concat(upperRightDot)
    .concat([width, 0])
  const rect = []
    .concat(upperLeftDot)
    .concat(lowerLeftDot)
    .concat(lowerRightDot)
    .concat(upperRightDot)

  return (
    <Group x={x} y={y}>
      <Line points={upBezel} fill={lightFill} strokeWidth={0} closed={true} />
      <Line points={leftBezel} fill={lightFill} strokeWidth={0} closed={true} />
      <Line
        points={bottomBezel}
        fill={darkFill}
        strokeWidth={0}
        closed={true}
      />
      <Line points={rightBezel} fill={darkFill} strokeWidth={0} closed={true} />
      <Line points={rect} fill={fill} strokeWidth={0} closed={true} />
    </Group>
  )
}

export default OutsetSquare
