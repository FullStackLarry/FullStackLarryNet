import React from "react"

import "./VideoPokerPayouts.css"

function VideoPokerPayouts(props) {
  const payoutsTable = props.payouts.map((p, index) => (
    <div className="videopoker-payout-wrapper" key={index}>
      <div
        className="videopoker-payout-description"
        data-handmade={p.description === props.handMade}
      >
        {p.description}
      </div>
      <div
        className="videopoker-payout-amount"
        data-handmade={p.description === props.handMade}
      >
        {p.amount}
      </div>
    </div>
  ))

  return (
    <>
      <div className="videopoker-payouts">{payoutsTable}</div>
      <div className="videopoker-payout-made">{props.handMade}</div>
    </>
  )
}

export default VideoPokerPayouts
