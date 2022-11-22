import React, { useState, useEffect } from "react";
import Modal from "react-modal";

import MemoryTiles from "./MemoryTiles";

import "../common/GameStyles.css";
import "./Memory.css";

const NUM_TILES = 16;

function Memory(props) {
  const [tiles, setTiles] = useState(null);
  const [displayTiles, setDisplayTiles] = useState(null);
  const [tilesClicked, setTilesClicked] = useState(0);
  const [guesses, setGuesses] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [changing, setChanging] = useState(false);

  let newTiles;
  let newDisplayTiles;
  let newTilesClicked;
  let newGuesses;

  const findEmptyTile = (tiles) => {
    let r;
    do {
      r = Math.floor(Math.random() * NUM_TILES);
    } while (tiles[r] !== 0);
    return r;
  };

  const initGame = () => {
    newTiles = new Array(NUM_TILES);
    newDisplayTiles = new Array(NUM_TILES);
    let t = 0;

    newTiles.fill(0);
    newDisplayTiles.fill(0);

    for (let i = 0; i < NUM_TILES / 2; i++) {
      t = findEmptyTile(newTiles);
      newTiles[t] = i + 1;
      t = findEmptyTile(newTiles);
      newTiles[t] = i + 1;
    }

    setTiles(newTiles);
    setDisplayTiles(newDisplayTiles);
    setGuesses(0);
    setTilesClicked(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleTileClick = (index) => {
    if (displayTiles[index] !== 0) return;

    newTiles = tiles;
    newDisplayTiles = displayTiles;
    newTilesClicked = tilesClicked;
    newGuesses = guesses;

    newDisplayTiles[index] = newTiles[index];
    setChanging(true);
    setDisplayTiles([...newDisplayTiles]);
    setTimeout(() => {
      newTilesClicked++;
      if (newTilesClicked === 2) {
        const clickedTiles = newDisplayTiles.filter((t) => t > 0);
        if (clickedTiles.length === 2 && clickedTiles[0] === clickedTiles[1]) {
          for (let i = 0; i < NUM_TILES; i++) {
            if (newDisplayTiles[i] === clickedTiles[0]) newDisplayTiles[i] = -1;
          }
        } else {
          for (let i = 0; i < NUM_TILES; i++) {
            if (newDisplayTiles[i] > 0) newDisplayTiles[i] = 0;
          }
        }
        newTilesClicked = 0;
        newGuesses++;
      }
      setDisplayTiles(newDisplayTiles);
      setTilesClicked(newTilesClicked);
      setGuesses(newGuesses);
      setChanging(false);
    }, 500);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="memory">
      <h2>Memory</h2>
      <button className="game-button" onClick={() => openModal()}>
        Help
      </button>
      <Modal
        isOpen={modalOpen}
        contentLabel="Memory Help"
        className="modal"
        overlayClassName="overlay"
        appElement={document.getElementById("root")}
      >
        <p>
          Click on two tiles. If the tiles match, then they&nbsp;will be
          removed. The game ends when all tiles are removed.
        </p>
        <button className="game-button" onClick={() => closeModal()}>
          Close
        </button>
      </Modal>
      {tiles && (
        <MemoryTiles
          tiles={displayTiles}
          clickHandler={handleTileClick}
          changing={changing}
        />
      )}
      <span className="memory-information">Guesses: {guesses}</span>
      <button className="game-button" onClick={() => initGame()}>
        New Game
      </button>
    </div>
  );
}

export default Memory;
