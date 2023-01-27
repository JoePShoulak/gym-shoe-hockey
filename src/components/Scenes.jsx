import { useContext, useState } from "react";
import { local } from "@toolz/local-storage";

import { BasicScore, Header, BoxScore, PlayByPlay } from "./ScoreDisplay";
import TeamSelector from "./TeamSelector";

import { GameContext } from "../util/GameContext";
import { Game, Team } from "../lib/Hockey";
import { capit } from "../lib/helper";
import { loadTeams } from "../util/loadTeams";

const SceneButton = ({ scene, label }) => {
  const GC = useContext(GameContext);

  return (
    <button onClick={() => GC.setScene(scene)}>{label ?? capit(scene)}</button>
  );
};

const Menu = () => (
  <>
    <h3>Welcome!</h3>
    <p>
      Press Setup to create an exhibition match, or press Upload to add some
      custom teams!
    </p>

    <SceneButton scene="setup" label="Pick Teams" />
    <SceneButton scene="upload" />
    <SceneButton scene="edit" />
  </>
);

const Setup = () => (
  <>
    <h3>Select your teams</h3>

    {["visitors", "home"].map(team => (
      <TeamSelector key={team} id={team} />
    ))}

    <SceneButton scene="play" />
    <SceneButton scene="menu" />
  </>
);

const Results = () => {
  const GC = useContext(GameContext);

  const visitors = GC.all.filter(team => team.name === GC.selected.visitors)[0];
  const home = GC.all.filter(team => team.name === GC.selected.home)[0];

  const [game, setGame] = useState(new Game(visitors, home));

  return (
    <>
      <Header game={game} />
      <BasicScore game={game} />
      <BoxScore game={game} />
      <PlayByPlay game={game} />

      <button onClick={() => setGame(new Game(visitors, home))}>Replay</button>
      <SceneButton scene="setup" label="Change Teams" />
      <SceneButton scene="menu" />
    </>
  );
};

const Upload = () => {
  const GC = useContext(GameContext);
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    const file = document.getElementById("file").files[0];
    if (!file) return;

    Team.parseCSV(file).then(team => {
      if (GC.all.map(t => t.name).includes(team.name))
        setMessage("Team already exists.");
      else {
        const newData = [...GC.all, team];

        GC.setAll(newData);
        local.setItem("teamData", newData);

        setMessage(`Uploaded team: ${team.name}`);
      }
    });
  };

  return (
    <>
      <h3>Upload a roster as a CSV!</h3>

      <input type="file" id="file" accept=".csv" />
      <button onClick={handleSubmit}>Upload</button>
      <p>{message}</p>

      <SceneButton scene="menu" />
    </>
  );
};

const Edit = () => {
  const GC = useContext(GameContext);

  const removeTeam = e => {
    let newData = GC.all.filter(team => team.name !== e.target.dataset.name);

    GC.setAll(newData);
    local.setItem("teamData", newData);
  };

  const resetTeams = () => {
    loadTeams().then(data => {
      GC.setAll(data);
      local.setItem("teamData", data);
    });
  };

  return (
    <>
      <h3>Remove uploaded teams</h3>
      <ul>
        {GC.all.map(({ name }) => (
          <li key={name} style={{ display: "flex" }}>
            <p>{name}</p>
            <button
              data-name={name}
              onClick={removeTeam}
              disabled={GC.all.length <= 2}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <SceneButton scene="menu" />
      <button onClick={resetTeams}>Reload Core</button>
    </>
  );
};

export { Menu, Setup, Results, Upload, Edit };
