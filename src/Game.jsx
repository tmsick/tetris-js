import React from "react"
import { Stage, Layer } from "react-konva"
import Loader from "./loader"
import { getHexColor, generateArray } from './util'
import Vector from "./vector"
import Field from "./components/Field"
import Modal from "./components/Modal"
import NextPane from "./components/NextPane"
import * as Variants from "./tetromino/variants"

class Game extends React.Component {
  constructor(props) {
    super(props)

    // parameters
    this.unit = 30
    this.field = { width: 10, height: 20 }
    this.nextPane = { width: 3, queueSize: 3 }
    this.initVector = Object.freeze(new Vector(Math.floor((this.field.width + 1) / 2) - 1, 1))
    this.timerInterval = 1000

    // loader
    const loader = new Loader(Variants, this.nextPane.queueSize, V => {
      const mino = new V()
      mino.move(this.initVector)
      return mino
    })

    // verge
    const verge = new Set()
    for (let x = 0; x < this.field.width; x++)
      verge.add(new Vector(x, -1).id).add(new Vector(x, this.field.height).id)
    for (let y = 0; y < this.field.height; y++)
      verge.add(new Vector(-1, y).id).add(new Vector(this.field.width, y).id)
    this.verge = Object.freeze(verge)

    // squares
    const squares = generateArray(this.field.height, () => generateArray(this.field.width, null))

    // mino
    const mino = loader.load()

    // React state
    this.state = { mino, squares, loader }

    // React event handler
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.startGame = this.startGame.bind(this)

    // flags
    this.isModalHidden = false
    this.isGameVisible = false
    this.doesGameRun = false
  }

  startGame() {
    this.isModalHidden = true
    this.isGameVisible = true
    this.doesGameRun = true
    this.startClock()
  }

  moveEast() {
    const mino = this.state.mino.copy()
    mino.moveEast()
    if (this.canPlace(mino))
      this.setState({ mino })
  }

  moveWest() {
    const mino = this.state.mino.copy()
    mino.moveWest()
    if (this.canPlace(mino))
      this.setState({ mino })
  }

  moveSouth() {
    const mino = this.state.mino.copy()
    mino.moveSouth()
    if (this.canPlace(mino))
      this.setState({ mino })
    else
      this.settle()
  }

  rotate() {
    const mino = this.state.mino.copy()
    mino.rotateClockwise()
    if (this.canPlace(mino))
      this.setState({ mino })
  }

  canPlace(mino, squares = this.state.squares) {
    for (const { x, y, id } of mino.getVectors())
      // if ( the tetromino is at the edge of the field || the tetromino is touching the accumulated tetrominoes )
      if (this.verge.has(id) || squares[y][x])
        return false
    return true
  }

  settle() {
    let { mino, squares, loader } = this.state

    // add settled squares to `this.state.squares`
    for (const { x, y } of mino.getVectors())
      squares[y][x] = getHexColor(mino.color)

    // clear rows
    new Set(mino.getVectors().map(({ y }) => y)).forEach(y => {
      let clear = true
      for (let x = 0; x < this.field.width; x++)
        if (!squares[y][x]) {
          clear = false
          break
        }
      if (clear)
        squares[y] = null
    })
    let y = 0
    while (y < squares.length)
      if (!squares[y])
        squares.splice(y, 1)
      else
        y++
    for (; y < this.field.height; y++)
      squares.unshift(generateArray(this.field.width, null))

    // reload mino
    mino = loader.load()

    // if the new mino cannot be placed, the game is over
    if (!this.canPlace(mino, squares)) {
      this.gameOver()
      return
    }

    this.setState({ mino, squares, loader })
  }

  gameOver() {
    this.doesGameRun = false
    this.stopClock()
    alert("game over")
  }

  handleKeyDown(event) {
    if (!this.doesGameRun)
      return

    const key = {
      32: "space",
      37: "left arrow",
      38: "up arrow",
      39: "right arrow",
      40: "down arrow"
    }

    switch (key[event.keyCode]) {
      case "space":
        this.rotate()
        break
      case "left arrow":
        this.moveWest()
        break
      case "right arrow":
        this.moveEast()
        break
      case "down arrow":
        this.moveSouth()
        break
    }
  }

  componentWillUnmount() {
    this.stopClock()
  }

  startClock() {
    if (this.timerID)
      return

    this.timerID = setInterval(this.tick.bind(this), this.timerInterval)
  }

  stopClock() {
    if (this.timerID) {
      clearInterval(this.timerID)
      delete this.timerID
    }
  }

  tick() {
    this.moveSouth()
  }

  render() {
    const { unit } = this
    const { mino, squares, loader } = this.state
    return (
      <div tabIndex="0" onKeyDown={this.handleKeyDown}>
        <Modal onClick={this.startGame} hidden={this.isModalHidden} message="click to start" />
        <Stage
          visible={this.isGameVisible}
          width={(this.field.width + this.nextPane.width) * unit}
          height={
            (this.field.height > this.nextPane.width * this.nextPane.queueSize
              ? this.field.height
              : this.nextPane.width * this.nextPane.queueSize) * unit
          }
        >
          <Layer>
            <Field x={0} y={0} unit={unit} width={this.field.width} height={this.field.height} mino={mino} squares={squares} />
            <NextPane x={this.field.width * unit} y={0} width={this.nextPane.width * unit} height={this.nextPane.width * unit * this.nextPane.queueSize} loader={loader} />
          </Layer>
        </Stage>
      </div>
    )
  }
}

export default Game
