import { useState } from "react";
import { Menu, Setup, Results } from "./Scenes";
import { TeamContext } from "../util/TeamContext";
import { useEffect } from "react";
import { loadTeams } from "../util/loadTeams";

const Game = () => {
  const [teamData, setTeamData] = useState();
  const [scene, setScene] = useState("main");
  const [teams, setTeams] = useState();

  useEffect(() => {
    loadTeams().then(setTeamData);
  }, []);

  useEffect(() => {
    if (!teams && teamData) {
      setTeams({
        home: teamData[0].name,
        visitors: teamData[1].name,
      });
    }
  }, [teams, teamData]);

  return (
    teamData && (
      <TeamContext.Provider value={teamData.map(team => team.name)}>
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
    )
  );
};

export default Game;
