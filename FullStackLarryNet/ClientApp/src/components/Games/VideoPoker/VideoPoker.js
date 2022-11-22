import React, { Component } from "react"
import Modal from "react-modal"

import VideoPokerPayouts from "./VideoPokerPayouts"
import VideoPokerCardsArea from "./VideoPokerCardsArea"
import VideoPokerControls from "./VideoPokerControls"
import {
  HandPayouts,
  HandPayoutAmounts,
  Payouts,
  GameState,
  evaluateHand,
} from "./VideoPokerCommon"

import "../common/GameStyles.css"
import "./VideoPoker.css"

const INITIAL_CREDITS = 500
const MIN_BET = 5
const MAX_BET = 50

let deck = new Array(52)
let currentCard = 0

export default class VideoPoker extends Component {

  constructor(props) {
    super(props)

    let i = 0
    for (let s = 0; s < 4; s++) {
      for (let v = 0; v < 13; v++) {
        deck[i] = {
          index: i++,
          value: v,
          suit: s,
        }
      }
    }

    this.state = {
      payouts: Payouts,
      payoutMade: "",
      hand: undefined,
      credits: INITIAL_CREDITS,
      bet: MIN_BET,
      win: 0,
      gameState: GameState.Initialized,
    }
  }

  delay = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  saveStats() {
    localStorage.setItem("videopoker.credits", this.state.credits.toString())
  }

  resetCredits() {
    this.setState({
      credits: INITIAL_CREDITS,
      bet: MIN_BET,
    })
  }

  componentDidMount() {
    let newPayouts = this.state.payouts
    this.calcPayouts(newPayouts, this.state.bet)
    this.setState({ payouts: newPayouts })

    let newHand = this.dealCards(true)
    const savedCredits = localStorage.getItem("videopoker.credits")
    this.setState({
      hand: newHand,
      credits: savedCredits === null ? INITIAL_CREDITS : parseInt(savedCredits),
    })
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault()
      return this.saveStats()
    })
  }

  componentWillUnmount() {
    this.saveStats()
  }

  getNextCard() {
    return deck[currentCard++]
  }

  handleBetClick = (sign) => {
    let newBet = this.state.bet
    let newPayouts = this.state.payouts

    newBet += MIN_BET * sign

    this.calcPayouts(newPayouts, newBet)
    this.setState({ payouts: newPayouts, bet: newBet })
  }

  calcPayouts = (payouts, bet) => {
    let minPayout = 0

    for (let p of payouts) {
      switch (p.description) {
        case HandPayouts.RoyalFlush:
          minPayout = HandPayoutAmounts.RoyalFlush
          break
        case HandPayouts.StraightFlush:
          minPayout = HandPayoutAmounts.StraightFlush
          break
        case HandPayouts.FourOfAKind:
          minPayout = HandPayoutAmounts.FourOfAKind
          break
        case HandPayouts.FullHouse:
          minPayout = HandPayoutAmounts.FullHouse
          break
        case HandPayouts.Flush:
          minPayout = HandPayoutAmounts.Flush
          break
        case HandPayouts.Straight:
          minPayout = HandPayoutAmounts.Straight
          break
        case HandPayouts.ThreeOfAKind:
          minPayout = HandPayoutAmounts.ThreeOfAKind
          break
        case HandPayouts.TwoPair:
          minPayout = HandPayoutAmounts.TwoPair
          break
        case HandPayouts.JacksOrBetter:
          minPayout = HandPayoutAmounts.JacksOrBetter
          break
        default:
          break
      }
      p.amount = minPayout * bet
    }
  }

  handleHandClick = (index) => {
    let newHand = this.state.hand
    newHand[index].held = !newHand[index].held
    this.setState({ hand: newHand })
  }

  flipCards = (hand, hide) => {
    for (let i = 0; i < 5; i++) {
      hand[i].hidden = hide
    }
  }

  dealCards = (initial) => {
    deck.sort(() => Math.random() - 0.5)
    currentCard = 0

    let newHand = new Array(5)
    newHand.fill({
      index: 0,
      value: 0,
      suit: 0,
      hidden: false,
      held: false,
    })

    for (let i = 0; i < 5; i++) {
      const nextCard = this.getNextCard()
      newHand[i] = {
        index: nextCard.index,
        value: nextCard.value,
        suit: nextCard.suit,
        hidden: initial,
        held: false,
      }
    }

    return newHand
  }

  handleDealClick = () => {
    let newHand = this.state.hand
    let newCredits = this.state.credits
    let newBet = this.state.bet
    let newPayouts = this.state.payouts
    let newWin = 0

    if (this.state.gameState === GameState.Initialized) {
      newCredits -= this.state.bet
      
      this.flipCards(newHand, false)
      let newPayoutMade = evaluateHand(newHand)

      this.setState({
        hand: newHand,
        payoutMade: newPayoutMade,
        credits: newCredits,
        gameState: GameState.NewDeal,
      })
      return
    }
    
    if (this.state.gameState === GameState.NewDeal) {
      for (let i = 0; i < 5; i++) {
        if (!newHand[i].held) {
          const nextCard = this.getNextCard()
          newHand[i].index = nextCard.index
          newHand[i].value = nextCard.value
          newHand[i].suit = nextCard.suit
        }
      }

      let newPayoutMade = evaluateHand(newHand)
      if (newPayoutMade !== "") {
        for (let i = 0; i < newPayouts.length; i++) {
          if (newPayouts[i].description === newPayoutMade) {
            newWin = newPayouts[i].amount
            newCredits += newWin
          }
        }
      }

      if (newBet > newCredits) newBet = newCredits

      this.setState({
        hand: newHand,
        payouts: newPayouts,
        payoutMade: newPayoutMade,
        win: newWin,
        credits: newCredits,
        bet: newBet,
        gameState: GameState.HandOver,
      })
      return
    }

    if (this.state.gameState === GameState.HandOver) {
      for (let p of newPayouts) {
        p.handMade = false
      }
  
      newHand = this.dealCards(false)
      let newPayoutMade = evaluateHand(newHand)
      newCredits -= this.state.bet

      this.setState({
        hand: newHand,
        payouts: newPayouts,
        payoutMade: newPayoutMade,
        credits: newCredits,
        win: 0,
        gameState: GameState.NewDeal,
      })
      return
    }
  }

  openModal = () => {
    this.setState({modalOpen: true})
  }

 closeModal = () => {
    this.setState({modalOpen: false})
  }

  render() {
    if (!this.state.hand) return <div />

    return (
      <div className="videopoker">
        <h2>Video Poker</h2>
        <button
          className="game-button"
          onClick={() => this.openModal()}
        >
          Help
        </button>
        <Modal isOpen={this.state.modalOpen}
               contentLabel="Hangman Help"
               className="modal"
               overlayClassName="overlay"
               appElement={document.getElementById('root')}
        >
          <p>
             This game is a simulation of the old style video poker machines.
             Try to make the best 5-card poker hand. After the deal, click on cards to hold and click Draw.
             If you make a valid hand, then you will be paid the amount shown in the payout table at the top.
          </p>
          <button className="game-button"
                  onClick={() => this.closeModal()}>Close</button>
        </Modal>
        <button
          className="game-button"
          onClick={() => this.resetCredits()}
        >
          Reset Credits
        </button>
        <VideoPokerPayouts
          payouts={this.state.payouts}
          handMade={this.state.payoutMade}
        />
        <VideoPokerCardsArea
          hand={this.state.hand}
          newHand={this.state.gameState === GameState.NewDeal}
          playerWon={this.state.win > 0}
          clickHandler={this.handleHandClick}
        />
        <VideoPokerControls
          credits={this.state.credits}
          gameState={this.state.gameState}
          bet={this.state.bet}
          win={this.state.win}
          newHand={this.state.gameState === GameState.NewDeal}
          decrementDisabled={
            this.state.credits === 0 ||
            this.state.bet === MIN_BET ||
            this.state.gameState === GameState.NewDeal
          }
          incrementDisabled={
            this.state.credits === 0 ||
            this.state.bet === MAX_BET ||
            this.state.bet === this.state.credits ||
            this.state.gameState === GameState.NewDeal
          }
          betClickHandler={this.handleBetClick}
          dealClickHandler={this.handleDealClick}
        />
      </div>
    )
  }
}
