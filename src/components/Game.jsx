import { useState, useEffect } from "react";
import { Menu, Setup, Results } from "./Scenes";
import { GameContext } from "../util/GameContext";
import { loadTeams } from "../util/loadTeams";

const Game = () => {
  const [teamData, setTeamData] = useState();
  const [scene, setScene] = useState("main");
  const [selectedTeams, setSelectedTeams] = useState();

  useEffect(() => {
    loadTeams().then(setTeamData);
  }, []);

  useEffect(() => {
    if (!selectedTeams && teamData) {
      setSelectedTeams({
        home: teamData[0].name,
        visitors: teamData[1].name,
      });
    }
  }, [selectedTeams, teamData]);

  return (
    teamData && (
      <GameContext.Provider
        value={{
          all: teamData,
          selected: selectedTeams,
          setSelected: setSelectedTeams,
          setScene,
        }}>
        <>
          {scene === "main" && <Menu />}
          {scene === "setup" && <Setup />}
          {scene === "playing" && <Results />}
        </>
      </GameContext.Provider>
    )
  );
};

export default Game;
