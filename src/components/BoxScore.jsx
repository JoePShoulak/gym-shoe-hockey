const BoxScore = ({ game }) => {
  console.log(game.goals);

  const getGoals = (team, period) =>
    game.goals[team].filter(goal => goal.period === period).length;

  const TeamRow = ({ team }) => (
    <tr>
      <td>{team}</td>
      <td>{getGoals(team, 1)}</td>
      <td>{getGoals(team, 2)}</td>
      <td>{getGoals(team, 3)}</td>
      <td>{game.score[team]}</td>
    </tr>
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Team</th>
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>F</th>
        </tr>
      </thead>
      <tbody>
        <TeamRow team="visitors" />
        <TeamRow team="home" />
      </tbody>
    </table>
  );
};

export default BoxScore;
