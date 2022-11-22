import React from "react"

import "./HangManWord.css"

function HangManWord(props) {
  const wordLetters = props.word.map((letter, index) => (
    <div
      key={index}
      className="hangman-word-letter"
      data-show={letter.show}
      data-small={props.small}
    >
      {letter.value}
    </div>
  ))

  return <div className="hangman-word">{wordLetters}</div>
}

export default HangManWord
