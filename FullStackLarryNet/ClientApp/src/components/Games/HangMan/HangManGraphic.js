import React from "react"

import "./HangManGraphic.css"

function HangManGraphic(props) {
  const gridTiles = props.tilesHidden.map((tileHidden, index) => (
    <div
      key={index}
      data-hidden={tileHidden}
      className="hangman-graphic-tile"
    />
  ))

  return (
    <div
      className="hangman-graphic"
      data-won={props.won}
      data-lost={props.lost}
    >
      {gridTiles}
    </div>
  )
}

export default HangManGraphic
