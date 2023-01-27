import { doNTimes } from "../lib/helper";

const Header = ({ game }) => (
  <>
    <h3>{`${game.teams.vis.name} is playing ${game.teams.home.name}...`}</h3>
    <p>{game.result}</p>
  </>
);

const BasicScore = ({ game }) => (
  <>
    <p>{`${game.teams.vis.name} scored ${game.score.vis} goals`}</p>
    <p>{`${game.teams.home.name} scored ${game.score.home} goals`}</p>
  </>
);

const byPeriod = p => g => g.period === p + 1;

const BoxScore = ({ game }) => {
  const Header = () => (
    <thead>
      <tr>
        <th>Team</th>
        <th>1</th>
        <th>2</th>
        <th>3</th>
        <th>F</th>
      </tr>
    </thead>
  );

  const TeamRow = ({ teamType }) => (
    <tr>
      <td>{game.teams[teamType].name}</td>
      {doNTimes(3, (_, i) => (
        <td key={i}>{game.teamGoals(teamType).filter(byPeriod(i)).length}</td>
      ))}
      <td>{game.score[teamType] ?? 0}</td>
    </tr>
  );

  return (
    <table>
      <Header />
      <tbody>
        {["vis", "home"].map(team => (
          <TeamRow key={team} teamType={team} />
        ))}
      </tbody>
    </table>
  );
};

const PlayByPlay = ({ game }) => (
  <ul>
    {game.goals.map((goal, index) => (
      <li
        key={
          index
        }>{`${goal.player.lName} scored for ${goal.team.name} in period ${goal.period}`}</li>
    ))}
  </ul>
);

export { Header, BasicScore, BoxScore, PlayByPlay };
