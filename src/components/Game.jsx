import { useState } from "react";

const Game = () => {
  const teamList = ["Team 1", "Team 2"];

  const [mode, setMode] = useState("main");
  const [teams, setTeams] = useState({
    visitors: teamList[0],
    home: teamList[0],
  });

  const Menu = () => <button onClick={() => setMode("setup")}>Start</button>;

  const Setup = () => {
    const TeamSelector = ({ teams, id }) => (
      <div>
        <p>{id}</p>
        <select
          value={teams[id]}
          onChange={e => {
            const newTeams = { ...teams };
            newTeams[id] = e.target.value;
            setTeams(newTeams);
          }}>
          {teams.map(t => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
    );

    return (
      <div>
        <p>Select your teams</p>

        <TeamSelector teams={teamList} id="visitors" />
        <TeamSelector teams={teamList} id="home" />

        <button
          onClick={() => {
            setMode("playing");
            console.log(teams);
          }}>
          Play
        </button>
      </div>
    );
  };

  const Results = () => (
    <div>
      <p>Results</p>

      <button onClick={() => setMode("main")}>Menu</button>
    </div>
  );

  switch (mode) {
    case "main":
      return <Menu />;
    case "setup":
      return <Setup />;
    case "playing":
      return <Results />;
    default:
      break;
  }
};

export default Game;
