import React from "react"

import "./TicTacToeGrid.css"

function TicTacToeGrid(props) {
  const gridCells = props.grid.map((value, index) => (
    <div
      key={index}
      className="tictactoe-cell"
      data-value={value}
      onClick={() => props.cellClickHandler(value, index)}
    >
      {value}
    </div>
  ))

  return (
    <div className="tictactoe-grid" data-disabled={props.gameOver}>
      {gridCells}
    </div>
  )
}

export default TicTacToeGrid
