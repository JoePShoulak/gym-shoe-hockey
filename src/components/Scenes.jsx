import { Game } from "../lib/Hockey";
import { BasicScore, Header, BoxScore, PlayByPlay } from "./ScoreDisplay";
import TeamSelector from "./TeamSelector";

const Menu = ({ setMode }) => (
  <button onClick={() => setMode("setup")}>Start</button>
);

const Setup = ({ allTeams, setMode, teams, setTeams }) => {
  return (
    <div>
      <p>Select your teams</p>

      {["visitors", "home"].map(team => (
        <TeamSelector
          allTeams={allTeams}
          teams={teams}
          setTeams={setTeams}
          key={team}
          id={team}
        />
      ))}

      <button onClick={() => setMode("playing")}>Play</button>
    </div>
  );
};

const Results = ({ setMode, teams, teamData }) => {
  const visitors = teamData.filter(team => team.name === teams.visitors)[0];
  const home = teamData.filter(team => team.name === teams.home)[0];

  const game = new Game(visitors, home);

  return (
    <div>
      <Header game={game} />

      <BasicScore game={game} />

      <BoxScore game={game} />

      <PlayByPlay game={game} />

      <button onClick={() => setMode("main")}>Menu</button>
    </div>
  );
};

export { Menu, Setup, Results };
