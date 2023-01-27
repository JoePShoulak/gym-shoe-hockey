import { Game } from "../lib/Hockey";
import { BasicScore, Header, BoxScore, PlayByPlay } from "./ScoreDisplay";
import TeamSelector from "./TeamSelector";

const Menu = ({ setScene }) => {
  return <button onClick={() => setScene("setup")}>Start</button>;
};

const Setup = ({ setScene, teams, setTeams }) => {
  return (
    <>
      <p>Select your teams</p>

      {["visitors", "home"].map(team => (
        <TeamSelector teams={teams} setTeams={setTeams} key={team} id={team} />
      ))}

      <button onClick={() => setScene("playing")}>Play</button>
    </>
  );
};

const Results = ({ setScene, teams, teamData }) => {
  const visitors = teamData.filter(team => team.name === teams.visitors)[0];
  const home = teamData.filter(team => team.name === teams.home)[0];

  const game = new Game(visitors, home);

  return (
    <>
      <Header game={game} />
      <BasicScore game={game} />
      <BoxScore game={game} />
      <PlayByPlay game={game} />

      <button onClick={() => setScene("main")}>Menu</button>
    </>
  );
};

export { Menu, Setup, Results };
