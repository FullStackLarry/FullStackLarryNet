import React from "react"

import "./VideoPokerCardsArea.css"

function VideoPokerCardsArea(props) {
  const cards = props.hand.map((card, index) => {
    return (
      <div key={index} className="videopoker-card-wrapper">
        <div className="videopoker-card-held" data-held={card.held}>
          HELD
        </div>
        <div
          className="videopoker-card"
          data-index={card.index}
          data-hidden={card.hidden}
          data-disabled={!props.newHand}
          onClick={() => props.clickHandler(index)}
        />
      </div>
    )
  })

  return (
    <div className="videopoker-cards-area">
      {cards}
      <div
        className="videopoker-game-over"
        data-hidden={props.newHand}
      >
        {props.playerWon ? "YOU WON!" : "GAME OVER"}
      </div>
    </div>
  )
}

export default VideoPokerCardsArea
