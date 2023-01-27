import { useState, useEffect } from "react";
import { local } from "@toolz/local-storage";

import { Menu, Setup, Results, Upload } from "./Scenes";

import { GameContext } from "../util/GameContext";
import { loadTeams } from "../util/loadTeams";

const Game = () => {
  const [teamData, setTeamData] = useState();
  const [scene, setScene] = useState("menu");
  const [selectedTeams, setSelectedTeams] = useState();

  useEffect(() => {
    const localData = local.getItem("teamData");

    if (localData) {
      console.log("loaded from local");
      setTeamData(localData);
    } else {
      console.log("loaded from csv");
      loadTeams().then(data => {
        setTeamData(data);
        local.setItem("teamData", data);
      });
    }
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
