import { useState, useEffect } from "react";
import { local } from "@toolz/local-storage";

import { Menu, Setup, Results, Upload, Edit } from "./Scenes";

import { ExhibitionContext } from "../../util/ExhibitionContext";
import { loadTeams } from "../../util/loadTeams";

const Exhibition = () => {
  const [teamData, setTeamData] = useState();
  const [scene, setScene] = useState("menu");
  const [selectedTeams, setSelectedTeams] = useState();

  useEffect(() => {
    const localData = local.getItem("teamData");

    if (localData && localData.length > 0) {
      setTeamData(localData);
    } else {
      loadTeams().then(data => {
        setTeamData(data);
        local.setItem("teamData", data);
      });
    }
  }, []);

  useEffect(() => {
    if (!selectedTeams && teamData) {
      setSelectedTeams({
        visitors: teamData[0].name,
        home: teamData[1].name,
      });
    }
  }, [selectedTeams, teamData]);

  return (
    teamData && (
      <ExhibitionContext.Provider
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
          {scene === "edit" && <Edit />}
        </>
      </ExhibitionContext.Provider>
    )
  );
};

export default Exhibition;
