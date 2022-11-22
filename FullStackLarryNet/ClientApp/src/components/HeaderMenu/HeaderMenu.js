import React from "react";
import { useNavigate, Link } from "react-router-dom";

import "./HeaderMenu.css";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="header-menu">
      <div className="logo-wrapper" onClick={() => navigate("/")}>
        <div className="header-image"></div>
        <label className="header-label">Full Stack Larry</label>
      </div>
      <div>{process.env.NODE_ENV === "development" ? "development" : ""}</div>
      <div className="menu-wrapper">
        <div className="dropdown">
          <div className="drop-button">
            Apps&nbsp;<div className="drop-button-image"></div>
          </div>
          <div className="dropdown-content">
            <Link to="/apps/taskmanager">Task Manager</Link>
          </div>
        </div>
        <div className="dropdown">
          <div className="drop-button">
            Games&nbsp;<div className="drop-button-image"></div>
          </div>
          <div className="dropdown-content">
            <Link to="/games/hangman">Hang Man</Link>
            <Link to="/games/memory">Memory</Link>
            <Link to="/games/tictactoe">Tic Tac Toe</Link>
            <Link to="/games/videopoker">Video Poker</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
