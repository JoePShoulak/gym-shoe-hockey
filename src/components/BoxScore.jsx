import { doNTimes } from "../lib/helper";

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

export default BoxScore;
