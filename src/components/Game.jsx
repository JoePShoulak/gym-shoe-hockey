import { useState } from "react";
import { Menu, Setup, Results } from "./Scenes";
import teamData from "../data/teams";

import { TeamContext } from "../util/TeamContext";

const Game = () => {
  const teamNames = teamData.map(team => team.name);

  const [scene, setScene] = useState("main");
  const [teams, setTeams] = useState({
    visitors: teamNames[0],
    home: teamNames[1],
  });

  return (
    <TeamContext.Provider value={teamNames}>
      <>
        {scene === "main" && <Menu setScene={setScene} />}
        {scene === "setup" && (
          <Setup teams={teams} setTeams={setTeams} setScene={setScene} />
        )}
        {scene === "playing" && (
          <Results teamData={teamData} setScene={setScene} teams={teams} />
        )}
      </>
    </TeamContext.Provider>
  );
};

export default Game;
