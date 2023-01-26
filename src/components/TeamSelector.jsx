const TeamSelector = ({ teamNames, teams, setTeams, id }) => (
  <div>
    <p>{id}</p>
    <select
      value={teams[id]}
      onChange={e => {
        const newTeams = { ...teams };
        newTeams[id] = e.target.value;
        setTeams(newTeams);
      }}>
      {teamNames.map(name => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  </div>
);

export default TeamSelector;
