const BoxScore = ({ game }) => {
  console.log(game.goals);

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
        <tr>
          <td>Visitors</td>
          <td>
            {game.goals.visitors.filter(goal => goal.period === 1).length}
          </td>
          <td>
            {game.goals.visitors.filter(goal => goal.period === 2).length}
          </td>
          <td>
            {game.goals.visitors.filter(goal => goal.period === 3).length}
          </td>
          <td>{game.score.visitors}</td>
        </tr>
        <tr>
          <td>Home</td>
          <td>{game.goals.home.filter(goal => goal.period === 1).length}</td>
          <td>{game.goals.home.filter(goal => goal.period === 2).length}</td>
          <td>{game.goals.home.filter(goal => goal.period === 3).length}</td>
          <td>{game.score.home}</td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
  );
};

export default BoxScore;
