import React from "react"

import "./HangManAlphabet.css"

function HangManAlphabet(props) {
  const alphabetLetters = props.alphabet.map((letter, index) => (
    <div
      key={index}
      className="hangman-alphabet-letter"
      data-valid={letter.valid}
      data-invalid={letter.invalid}
      data-disabled={letter.disabled}
      onClick={() => props.letterClickHandler(letter, index)}
    >
      {letter.value}
    </div>
  ))

  return (
    <div
      className="hangman-alphabet"
      data-disabled={props.gameOver}
    >
      {alphabetLetters}
    </div>
  )
}

export default HangManAlphabet
