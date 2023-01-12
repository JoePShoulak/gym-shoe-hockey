import { useState } from "react";

const Game = () => {
  const [mode, setMode] = useState("main");

  switch (mode) {
    case "main":
      return <button onClick={() => setMode("setup")}>Start</button>;
    case "setup":
      return (
        <div>
          <p>Select your teams</p>
          <select>
            <option value="Team 1">Team 1</option>
            <option value="Team 2">Team 2</option>
          </select>
          <select>
            <option value="Team 1">Team 1</option>
            <option value="Team 2">Team 2</option>
          </select>
          <button onClick={() => setMode("playing")}>Play</button>
        </div>
      );
    case "playing":
      return (
        <div>
          <p>Results</p>
          <button onClick={() => setMode("main")}>Main Menu</button>
        </div>
      );
    default:
      break;
  }
};

export default Game;
