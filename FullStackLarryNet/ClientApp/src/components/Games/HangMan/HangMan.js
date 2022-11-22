import React, { Component } from "react"
import Modal from "react-modal"

import HangManGraphic from "./HangManGraphic"
import HangManWord from "./HangManWord"
import HangManAlphabet from "./HangManAlphabet"

import getRandomWord from "./words"

import "../common/GameStyles.css"
import "./HangMan.css"

const TOTAL_GUESSES = 10
const ALPHA_LETTERS = 26
const showOrder = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
let tilesHidden
let alphabet

export default class HangMan extends Component {
  constructor(props) {
    super(props)

    tilesHidden = new Array(TOTAL_GUESSES)
    tilesHidden.fill(false)

    alphabet = new Array(ALPHA_LETTERS)
    for (let i = 0; i < ALPHA_LETTERS; i++) {
      alphabet[i] = String.fromCharCode(i + 65)
    }

    this.state = {
      wordString: "",
      word: undefined,
      uniqueLetters: 0,
      correctGuesses: 0,
      guessesLeft: 0,
      tilesHidden: undefined,
      alphabet: undefined,
      gameWon: false,
      gameLost: false,
      wins: 0,
      losses: 0,
      modalOpen: false,
    }
  }

  saveStats() {
    localStorage.setItem("hangman.wins", this.state.wins.toString())
    localStorage.setItem("hangman.losses", this.state.losses.toString())
  }

  resetStats() {
    this.setState({
      wins: 0,
      losses: 0,
    })
  }

  componentDidMount() {
    this.initGame()
    const savedWins = localStorage.getItem("hangman.wins")
    const savedLosses = localStorage.getItem("hangman.losses")
    this.setState({
      wins: savedWins === null ? 0 : parseInt(savedWins),
      losses: savedLosses === null ? 0 : parseInt(savedLosses),
    })
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault()
      return this.saveStats()
    })
  }

  componentWillUnmount() {
    this.saveStats()
  }

  createWordArray(word) {
    return word.split("").map((letter) => {
      return { value: letter, show: false }
    })
  }

  createAlphabetArray() {
    return alphabet.map((letter) => {
      return { value: letter, valid: false, invalid: false, disabled: false }
    })
  }

  handleLetterClick = (letter, index) => {
    if (this.state.alphabet[index].disabled) return

    let newWord = this.state.word
    let newCorrectGuesses = this.state.correctGuesses
    let newGuessesLeft = this.state.guessesLeft
    let newTilesHidden = this.state.tilesHidden
    let newAlphabet = this.state.alphabet
    let newGameWon = this.state.gameWon
    let newGameLost = this.state.gameLost
    let newWins = this.state.wins
    let newLosses = this.state.losses

    if (!this.state.wordString.includes(letter.value)) {
      newGuessesLeft--
      if (newGuessesLeft >= 0) {
        newAlphabet[index].invalid = true
        newAlphabet[index].disabled = true
        newTilesHidden[showOrder[newGuessesLeft]] = false
        if (newGuessesLeft === 0) {
          newGameLost = true
          newLosses++
          newWord.forEach((l) => {
            l.show = true
          })
        }
      }
    } else {
      newCorrectGuesses++
      if (newCorrectGuesses <= this.state.uniqueLetters) {
        newWord.forEach((l) => {
          if (l.value === letter.value) {
            l.show = true
          }
        })
        newAlphabet[index].valid = true
        newAlphabet[index].disabled = true
        if (newCorrectGuesses === this.state.uniqueLetters) {
          newGameWon = true
          newWins++
          newTilesHidden.fill(false)
          newAlphabet.forEach((a) => {
            a.disabled = true
          })
        }
      }
    }

    this.setState({
      word: newWord,
      correctGuesses: newCorrectGuesses,
      guessesLeft: newGuessesLeft,
      tilesHidden: newTilesHidden,
      alphabet: newAlphabet,
      gameWon: newGameWon,
      gameLost: newGameLost,
      wins: newWins,
      losses: newLosses,
    })
  }

  initGame = () => {
    let newWordString = getRandomWord()
    let newWord = this.createWordArray(newWordString)
    let newUniqueLetters = [...new Set(newWordString.split(""))].length
    tilesHidden.fill(true)

    this.setState({
      wordString: newWordString,
      word: newWord,
      uniqueLetters: newUniqueLetters,
      correctGuesses: 0,
      guessesLeft: TOTAL_GUESSES,
      tilesHidden: tilesHidden,
      alphabet: this.createAlphabetArray(),
      gameWon: false,
      gameLost: false,
      wins: this.state.wins,
      losses: this.state.losses,
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
      <div className="hangman">
        <h2>Hang Man</h2>
        <span className="hangman-information">
          Wins: {this.state.wins} Losses: {this.state.losses}
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
             Click on a letter to see if it is in the hidden word.
             You have ten tries to find all of the letters and solve the word.
             If you solve the word, you will be freed. If not, you will be hanged.
          </p>
          <button className="game-button"
                  onClick={() => this.closeModal()}>Close</button>
        </Modal>
        <button
          className="game-button"
          onClick={() => this.resetStats()}
        >
          Reset Stats
        </button>
        {this.state.tilesHidden && (
          <HangManGraphic
            tilesHidden={this.state.tilesHidden}
            won={this.state.gameWon}
            lost={this.state.gameLost}
          />
        )}
        {this.state.word && (
          <HangManWord
            word={this.state.word}
            small={this.state.word.length > 9}
          />
        )}
        <span className="hangman-information">
          Guesses Left: {this.state.guessesLeft}
        </span>
        {this.state.alphabet && (
          <HangManAlphabet
            alphabet={this.state.alphabet}
            gameOver={this.state.gameWon || this.state.gameLost}
            letterClickHandler={this.handleLetterClick}
          />
        )}
        <button
          className="game-button"
          onClick={() => this.initGame()}
        >
          New Game
        </button>
      </div>
    )
  }
}
