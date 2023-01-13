import { useState } from "react";
import { Menu, Setup, Results } from "./Scenes";
import teamData from "../data/teams";

const Game = () => {
  const allTeams = teamData.map(team => team.name);

  const [mode, setMode] = useState("main");
  const [teams, setTeams] = useState({
    visitors: allTeams[0],
    home: allTeams[0],
  });

  switch (mode) {
    case "main":
      return <Menu setMode={setMode} />;
    case "setup":
      return (
        <Setup
          allTeams={allTeams}
          setMode={setMode}
          teams={teams}
          setTeams={setTeams}
        />
      );
    case "playing":
      return <Results teamData={teamData} setMode={setMode} teams={teams} />;
    default:
      break;
  }
};

export default Game;
