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

  const visitorGoals = visitors.takeAllShots();
  const homeGoals = home.takeAllShots();

  const visitorScore = visitorGoals.reduce((acc, val) => acc + val.points, 0);
  const homeScore = homeGoals.reduce((acc, val) => acc + val.points, 0);

  let message;
  if (visitorScore === homeScore) message = "It's a draw!";
  else {
    const winner = visitorScore > homeScore ? visitors.name : home.name;
    message = `${winner} won!`;
  }

  return (
    <div>
      <h2>{`${visitors.name} is playing ${home.name}...`}</h2>

      <p>{`${visitors.name} scored ${visitorScore} goals`}</p>
      <p>{`${home.name} scored ${homeScore} goals`}</p>

      <p>{message}</p>

      <button onClick={() => setMode("main")}>Menu</button>
    </div>
  );
};

export { Menu, Setup, Results };
