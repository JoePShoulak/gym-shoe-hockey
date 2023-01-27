import { useContext } from "react";
import { GameContext } from "../util/GameContext";

const TeamSelector = ({ id }) => {
  const GC = useContext(GameContext);
  console.log(GC.all);

  return (
    <div>
      <p>{id}</p>
      <select
        value={GC.selected[id]}
        onChange={e => {
          const newTeams = { ...GC.selected };
          newTeams[id] = e.target.value;
          GC.setSelected(newTeams);
        }}>
        {GC.all.map(t => (
          <option key={t.name} value={t.name}>
            {t.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TeamSelector;
