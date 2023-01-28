import { useContext } from "react";
import { capit } from "../../lib/helper";
import { ExhibitionContext } from "../../util/ExhibitionContext";

const TeamSelector = ({ id }) => {
  const EC = useContext(ExhibitionContext);

  return (
    <div>
      <h4>{capit(id)}</h4>
      <select
        value={EC.selected[id]}
        onChange={e => {
          const newTeams = { ...EC.selected };
          newTeams[id] = e.target.value;
          EC.setSelected(newTeams);
        }}>
        {EC.all.map(t => (
          <option key={t.name} value={t.name}>
            {t.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TeamSelector;
