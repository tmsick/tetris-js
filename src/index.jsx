import React from "react"
import ReactDOM from "react-dom"
import Game from "./Game.jsx"
// import { Stage, Layer, Rect } from "react-konva"

// DEBUG
// import Thumbnail from "./components/Thumbnail.jsx"
// Thumbnail({ x: 0, y: 0, size: 30 })
// DEBUG

// ReactDOM.render(
//   <Stage width={500} height={500 * 7}>
//     <Layer>
//       <Thumbnail x={0} y={0} size={500} />
//     </Layer>
//   </Stage>,
//   document.getElementById("root")
// )

ReactDOM.render(<Game />, document.getElementById("root"))
