import { useState } from "react";
import { Menu, Setup, Results } from "./Scenes";
import teamData from "../data/teams";

const Game = () => {
  const teamNames = teamData.map(team => team.name);

  const [mode, setMode] = useState("main");
  const [teams, setTeams] = useState({
    visitors: teamNames[0],
    home: teamNames[1],
  });

  switch (mode) {
    case "main":
      return <Menu setMode={setMode} />;
    case "setup":
      return (
        <Setup
          teamNames={teamNames}
          teams={teams}
          setTeams={setTeams}
          setMode={setMode}
        />
      );
    case "playing":
      return <Results teamData={teamData} setMode={setMode} teams={teams} />;
    default:
      break;
  }
};

export default Game;
