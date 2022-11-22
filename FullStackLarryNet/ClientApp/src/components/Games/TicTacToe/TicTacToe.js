import React, { Component } from "react"
import Modal from "react-modal"

import TicTacToeGrid from "./TicTacToeGrid"

import "../common/GameStyles.css"
import "./TicTacToe.css"

const player = "x"
const ai = "o"
const empty = " "

const cellLines = [
  [ [1, 2], [3, 6], [4, 8] ],
  [ [0, 2], [4, 7] ],
  [ [0, 1], [5, 8], [4, 6] ],
  [ [4, 5], [0, 6] ],
  [ [3, 5], [1, 7], [0, 8], [2, 6] ],
  [ [3, 4], [2, 8] ],
  [ [7, 8], [0, 3], [2, 4] ],
  [ [6, 8], [1, 4] ],
  [ [6, 7], [2, 5], [0, 4] ]
]

const winLines = [
  [0, 1, 2], [3, 4, 5],
  [6, 7, 8], [0, 3, 6],
  [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [6, 4, 2]
]

let grid = new Array(9)

export default class TicTacToe extends Component {
  constructor(props) {
    super(props)
    
    grid.fill(empty)
    
      this.state = {
        grid: grid,
        moves: 0,
        playerWon: false,
        playerLost: false,
        wins: 0,
        losses: 0,
        ties: 0,
        modalOpen: false,
      }
  }

  saveStats() {
    localStorage.setItem("tictactoe.wins", this.state.wins.toString())
    localStorage.setItem("tictactoe.losses", this.state.losses.toString())
    localStorage.setItem("tictactoe.ties", this.state.ties.toString())
  }

  resetStats() {
    this.setState({
      wins: 0,
      losses: 0,
      ties: 0,
    })
  }

  componentDidMount() {
    this.initGame()
    const savedWins = localStorage.getItem("tictactoe.wins")
    const savedLosses = localStorage.getItem("tictactoe.losses")
    const savedTies = localStorage.getItem("tictactoe.ties")
    this.setState({
      wins: savedWins === null ? 0 : parseInt(savedWins),
      losses: savedLosses === null ? 0 : parseInt(savedLosses),
      ties: savedLosses === null ? 0 : parseInt(savedTies),
    })
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault()
      return this.saveStats()
    })
  }

  componentWillUnmount() {
    this.saveStats()
  }

  checkForWin(value, grid) {
    for (const l of winLines) {
      if (grid[l[0]] === value && grid[l[1]] === value && grid[l[2]] === value)
        return true
    }

    return false
  }

  getBestMove(grid) {
    let winner = -1
    let canBlockWin = -1
    let oneAway = -1
    let twoAway = -1
    let noChance = -1
    let temp = []
    
    for (let i = 0; i < 9; i++) {
      if (grid[i] === empty) {
        // select an empty cell if no other solution is found
        noChance = i
        // get lines current cell is in
        const lines = cellLines[i]
        // check for winner
        for (const l of lines) {
          if (grid[l[0]] === ai && grid[l[1]] === ai) {
            winner = i
            break
          }
        }
        // check for block win
        temp = []
        for (const l of lines) {
          if (grid[l[0]] === player && grid[l[1]] === player) {
            temp.push(i)
          }
        }
        if (temp.length > 0) canBlockWin = temp[Math.floor(Math.random() * temp.length)]
        // check for one away from win
        temp = []
        for (const l of lines) {
          if (
            (grid[l[0]] === ai && grid[l[1]] === empty) ||
            (grid[l[1]] === ai && grid[l[0]] === empty)
          ) {
            temp.push(i)
          }
        }
        if (temp.length > 0) oneAway = temp[Math.floor(Math.random() * temp.length)]
        // check for two away from win
        temp = []
        for (const l of lines) {
          if (grid[l[0]] === empty && grid[l[1]] === empty) {
            temp.push(i)
          }
        }
        if (temp.length > 0) twoAway = temp[Math.floor(Math.random() * temp.length)]
      }
    }

    if (winner >= 0) return winner
    if (canBlockWin >= 0) return canBlockWin
    if (oneAway >= 0) return oneAway
    if (twoAway >= 0) return twoAway
    
    return noChance
  }

  handleCellClick = (value, index) => {
    if (value !== empty) return

    let newGrid = this.state.grid
    let newMoves = this.state.moves
    let newPlayerWon = this.state.playerWon
    let newPlayerLost = this.state.playerLost
    let newWins = this.state.wins
    let newLosses = this.state.losses
    let newTies = this.state.ties

    newGrid[index] = player
    newMoves++

    if (this.checkForWin(player, newGrid)) {
      newWins++
      newPlayerWon = true
    } else if (newMoves <= 9) {
      const bestMove = this.getBestMove(newGrid)
      newGrid[bestMove] = ai
      newMoves++
      if (this.checkForWin(ai, newGrid)) {
        newLosses++
        newPlayerLost = true
      }
    }

    if (newMoves > 9 && !(newPlayerWon || newPlayerLost)) newTies++

    this.setState({
      grid: newGrid,
      moves: newMoves,
      playerWon: newPlayerWon,
      playerLost: newPlayerLost,
      wins: newWins,
      losses: newLosses,
      ties: newTies,
    })
  }

  initGame() {
    let newGrid = this.state.grid
    newGrid.fill(empty)
    this.setState({
      grid: newGrid,
      moves: 0,
      playerWon: false,
      playerLost: false,
      wins: this.state.wins,
      losses: this.state.losses,
      ties: this.state.ties,
    })
  }

  openModal = () => {
    this.setState({modalOpen: true})
  }

 closeModal = () => {
    this.setState({modalOpen: false})
  }

  render() {
    return (
      <div className="tictactoe">
        <h2>Tic Tac Toe</h2>
        <span className="tictactoe-information">
          Wins:&nbsp;{this.state.wins}&nbsp;Losses:&nbsp;{this.state.losses}&nbsp;Ties:&nbsp;{this.state.ties}
        </span>
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
             The object of the game is to draw a line of three X's while not letting
             the computer draw a line of three O's. If you succeed, you will win.
             If the computer succeeds, you will lose. If neither succeeds, the game is a tie.
          </p>
          <button className="game-button"
                  onClick={() => this.closeModal()}>Close</button>
        </Modal>
        <button
          className="game-button"
          onClick={() => this.resetStats()}>
          Reset Stats
        </button>
        {this.state.grid && (
          <TicTacToeGrid
            grid={this.state.grid}
            gameOver={
              this.state.playerWon ||
              this.state.playerLost ||
              this.state.moves === 9
            }
            cellClickHandler={this.handleCellClick}
          />
        )}
        <h4
          className={!this.state.playerWon ? "hidden": ""}>
          YOU WON!
        </h4>
        <h4
          className={!this.state.playerLost ? "hidden": ""}>
          YOU LOST...
        </h4>
        <h4
          className={this.state.moves < 9 || this.state.playerWon || this.state.playerLost ? "hidden": ""}>
          TIE GAME
        </h4>
        <button
          className="game-button"
          onClick={() => this.initGame()}>
          New Game
        </button>
      </div>
    )
  }
}
