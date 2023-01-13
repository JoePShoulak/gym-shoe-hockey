import { Game } from "../lib/Hockey";
import BoxScore from "./BoxScore";
import TeamSelector from "./TeamSelector";

const Menu = ({ setMode }) => (
  <button onClick={() => setMode("setup")}>Start</button>
);

const Setup = ({ allTeams, setMode, teams, setTeams }) => {
  return (
    <div>
      <p>Select your teams</p>

      <TeamSelector
        allTeams={allTeams}
        teams={teams}
        setTeams={setTeams}
        id="visitors"
      />

      <TeamSelector
        allTeams={allTeams}
        teams={teams}
        setTeams={setTeams}
        id="home"
      />

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
      <h2>{`${visitors.name} is playing ${home.name}...`}</h2>

      <p>{`${visitors.name} scored ${game.score.visitors} goals`}</p>
      <p>{`${home.name} scored ${game.score.home} goals`}</p>

      <p>{game.result}</p>

      <BoxScore game={game} />

      <button onClick={() => setMode("main")}>Menu</button>
    </div>
  );
};

export { Menu, Setup, Results };
