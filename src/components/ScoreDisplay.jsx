import { doNTimes } from "../lib/helper";

const Header = ({ game }) => (
  <>
    <h2>{`${game.teams.vis.name} is playing ${game.teams.home.name}...`}</h2>
    <p>{game.result}</p>
  </>
);

const BasicScore = ({ game }) => (
  <>
    <p>{`${game.teams.vis.name} scored ${game.score.vis} goals`}</p>
    <p>{`${game.teams.home.name} scored ${game.score.home} goals`}</p>
  </>
);

const byPeriod = p => g => g.period === p;

const BoxScore = ({ game }) => {
  const Header = () => (
    <tr>
      <th>Team</th>
      <th>1</th>
      <th>2</th>
      <th>3</th>
      <th>F</th>
    </tr>
  );

  const TeamRow = ({ teamType }) => (
    <tr>
      <td>{game.teams[teamType].name}</td>
      {doNTimes(3, (_, i) => (
        <td key={i}>
          {game.teamGoals(teamType).filter(byPeriod(i + 1)).length}
        </td>
      ))}
      <td>{game.score[teamType] ?? 0}</td>
    </tr>
  );

  return (
    <table>
      <thead>
        <Header />
      </thead>
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
