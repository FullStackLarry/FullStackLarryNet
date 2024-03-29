import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import { APIUrl } from "./components/Apps/Data/api";

import HeaderMenu from "./components/HeaderMenu/HeaderMenu";
import Home from "./components/Home/Home";
import TaskManager from "./components/Apps/TaskManager/TaskManager";
import HangMan from "./components/Games/HangMan/HangMan";
import Memory from "./components/Games/Memory/Memory";
import MilleBornes from "./components/Games/MilleBornes/MilleBornes";
import TicTacToe from "./components/Games/TicTacToe/TicTacToe";
import VideoPoker from "./components/Games/VideoPoker/VideoPoker";
import "./global.css";
import "./App.css";

function App() {
  useEffect(() => {
    axios.post(`${APIUrl()}log/`).catch((error) => {
      if (process.env.NODE_ENV === "development")
        alert(error.response.data.error);
    });
  }, []);

  return (
    <BrowserRouter>
      <header className="container header-container">
        <HeaderMenu />
      </header>
      <main className="container content-container">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/apps/taskmanager" element={<TaskManager />} />
          <Route path="/games/hangman" element={<HangMan />} />
          <Route path="/games/memory" element={<Memory />} />
          <Route path="/games/millebornes" element={<MilleBornes />} />
          <Route path="/games/tictactoe" element={<TicTacToe />} />
          <Route path="/games/videopoker" element={<VideoPoker />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
