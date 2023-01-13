const TeamSelector = ({ allTeams, teams, setTeams, id }) => (
  <div>
    <p>{id}</p>
    <select
      value={teams[id]}
      onChange={e => {
        const newTeams = { ...teams };
        newTeams[id] = e.target.value;
        setTeams(newTeams);
      }}>
      {allTeams.map(t => (
        <option key={t} value={t}>
          {t}
        </option>
      ))}
    </select>
  </div>
);

export default TeamSelector;
