const BoxScore = ({ game }) => {
  const TeamRow = ({ team }) => (
    <tr>
      <td>{team}</td>
      <td>{game.getGoals(1, team).length}</td>
      <td>{game.getGoals(2, team).length}</td>
      <td>{game.getGoals(3, team).length}</td>
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
