import { useContext } from "react";
import { TeamContext } from "../util/TeamContext";

const TeamSelector = ({ teams, setTeams, id }) => {
  const names = useContext(TeamContext);

  return (
    <div>
      <p>{id}</p>
      <select
        value={teams[id]}
        onChange={e => {
          const newTeams = { ...teams };
          newTeams[id] = e.target.value;
          setTeams(newTeams);
        }}>
        {names.map(name => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TeamSelector;
