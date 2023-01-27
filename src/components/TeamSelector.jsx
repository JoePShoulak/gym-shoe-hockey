import { useContext } from "react";
import { capit } from "../lib/helper";
import { GameContext } from "../util/GameContext";

const TeamSelector = ({ id }) => {
  const GC = useContext(GameContext);

  return (
    <div>
      <h4>{capit(id)}</h4>
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
