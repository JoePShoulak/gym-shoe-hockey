import { useState, useEffect } from "react";

import { Menu, Setup, Results, Upload } from "./Scenes";

import { GameContext } from "../util/GameContext";
import { loadTeams } from "../util/loadTeams";

const Game = () => {
  const [teamData, setTeamData] = useState();
  const [scene, setScene] = useState("menu");
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
          setAll: setTeamData,
          selected: selectedTeams,
          setSelected: setSelectedTeams,
          setScene,
        }}>
        <>
          {scene === "menu" && <Menu />}
          {scene === "setup" && <Setup />}
          {scene === "play" && <Results />}
          {scene === "upload" && <Upload />}
        </>
      </GameContext.Provider>
    )
  );
};

export default Game;
