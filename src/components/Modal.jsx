import React from "react"

function Modal({ message, onClick = () => {}, hidden = false }) {
  return (
    <div hidden={hidden}>
      <p>{message}</p>
      <button onClick={onClick}>ok</button>
    </div>
  )
}

export default Modal
