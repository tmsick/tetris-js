import React from "react"

function Modal({ hidden, onClick }) {
  return (
    <div hidden={hidden}>
      <h1>Tetris</h1>
      <ul>
        <li>Rotate: ↑</li>
        <li>Move left: ←</li>
        <li>Move right: →</li>
        <li>Move down: ↓</li>
      </ul>
      <div>
        <span>Click to start:</span>
        <button onClick={onClick}>Start</button>
      </div>
    </div>
  )
}

export default Modal
