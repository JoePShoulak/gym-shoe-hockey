import { useContext, useState } from "react";
import { local } from "@toolz/local-storage";

import { BasicScore, Header, BoxScore, PlayByPlay } from "./ScoreDisplay";
import TeamSelector from "./TeamSelector";

import { ExhibitionContext } from "../util/ExhibitionContext";
import { Game, Team } from "../lib/Hockey";
import { capit } from "../lib/helper";
import { loadTeams } from "../util/loadTeams";

const SceneButton = ({ scene, label }) => {
  const EC = useContext(ExhibitionContext);

  return (
    <button onClick={() => EC.setScene(scene)}>{label ?? capit(scene)}</button>
  );
};

const Menu = () => (
  <>
    <h3>Welcome to the Exhibition!</h3>
    <p>Press Pick Teams to create an exhibition match!</p>
    <p>
      If you want to change teams, you can click New Team to upload a new team,
      or Edit Teams to remove teams.
    </p>

    <SceneButton scene="setup" label="Pick Teams" />
    <SceneButton scene="upload" label="New Team" />
    <SceneButton scene="edit" label="Edit Teams" />
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
  const EC = useContext(ExhibitionContext);

  const visitors = EC.all.filter(team => team.name === EC.selected.visitors)[0];
  const home = EC.all.filter(team => team.name === EC.selected.home)[0];

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
  const EC = useContext(ExhibitionContext);
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    const file = document.getElementById("file").files[0];
    if (!file) return;

    Team.parseCSV(file).then(team => {
      if (EC.all.map(t => t.name).includes(team.name))
        setMessage("Team already exists.");
      else {
        const newData = [...EC.all, team];

        EC.setAll(newData);
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
  const EC = useContext(ExhibitionContext);

  const updateTeams = data => {
    EC.setAll(data);
    local.setItem("teamData", data);
  };

  const removeTeam = e => {
    let newData = EC.all.filter(team => team.name !== e.target.dataset.name);

    updateTeams(newData);
  };

  const RemoveButton = ({ name }) => (
    <button data-name={name} onClick={removeTeam} disabled={EC.all.length <= 2}>
      Remove
    </button>
  );

  const TeamListEntry = ({ name }) => (
    <li style={{ display: "flex" }}>
      <p>{name}</p>
      <RemoveButton />
    </li>
  );

  const resetTeams = () => loadTeams().then(updateTeams);

  return (
    <>
      <h3>Remove uploaded teams</h3>
      <ul>
        {EC.all.map(({ name }) => (
          <TeamListEntry key={name} name={name} />
        ))}
      </ul>

      <SceneButton scene="menu" />
      <button onClick={resetTeams}>Reload Core</button>
    </>
  );
};

export { Menu, Setup, Results, Upload, Edit };
