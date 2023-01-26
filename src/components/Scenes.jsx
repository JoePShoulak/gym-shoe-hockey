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
      <h2>{`${game.teams.vis.name} is playing ${game.teams.home.name}...`}</h2>

      <p>{`${game.teams.vis.name} scored ${game.score.vis} goals`}</p>
      <p>{`${game.teams.home.name} scored ${game.score.home} goals`}</p>

      <p>{game.result}</p>

      <BoxScore game={game} />

      {game.goals.map((goal, index) => (
        <p
          key={
            index
          }>{`${goal.player.lName} scored for ${goal.team.name} in period ${goal.period}`}</p>
      ))}

      <button onClick={() => setMode("main")}>Menu</button>
    </div>
  );
};

export { Menu, Setup, Results };
