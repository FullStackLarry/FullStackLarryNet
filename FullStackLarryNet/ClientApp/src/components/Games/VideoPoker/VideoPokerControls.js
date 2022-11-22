import React from "react"
import { GameState } from "./VideoPokerCommon"

import "./VideoPokerControls.css"

function VideoPokerControls(props) {
  
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  })

  return (
    <div className="videopoker-controls">
      <div className="videopoker-win">
        <span>WIN {props.win}</span>
      </div>
      <div className="videopoker-bet-wrapper">
        <div className="videopoker-bet">
          <span>BET</span>
          <button
            className="game-button"
            disabled={props.decrementDisabled}
            onClick={() => props.betClickHandler(-1)}
          >-</button>
          <span>{props.bet}</span>
          <button
            className="game-button"
            disabled={props.incrementDisabled}
            onClick={() => props.betClickHandler(1)}
          >+</button>
        </div>
      </div>
      <div className="videopoker-credits">
        <span>{currencyFormatter.format(props.credits)}</span>
      </div>
      <div className="videopoker-deal-button-wrapper">
        <button
            className="game-button"
            disabled={(props.credits === 0 && props.gameState === GameState.HandOver)}
            onClick={() => props.dealClickHandler()}
        >
          {props.newHand ? "DRAW" : "DEAL"}
        </button>
      </div>
    </div>
  )
}

export default VideoPokerControls
