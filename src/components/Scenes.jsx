import { useContext, useState } from "react";
import { Game } from "../lib/Hockey";
import { GameContext } from "../util/GameContext";
import { parseUpload } from "../util/loadTeams";
import { BasicScore, Header, BoxScore, PlayByPlay } from "./ScoreDisplay";
import TeamSelector from "./TeamSelector";

const SceneButton = ({ scene }) => {
  const GC = useContext(GameContext);

  return <button onClick={() => GC.setScene(scene)}>{scene}</button>;
};

const Menu = () => {
  return (
    <>
      <SceneButton scene="setup" />
      <SceneButton scene="upload" />
    </>
  );
};

const Setup = () => {
  return (
    <>
      <p>Select your teams</p>
      {["visitors", "home"].map(team => (
        <TeamSelector key={team} id={team} />
      ))}
      <SceneButton scene="play" />
      <SceneButton scene="menu" />
    </>
  );
};

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
      <SceneButton scene="menu" />
    </>
  );
};

const Upload = () => {
  const GC = useContext(GameContext);

  const handleSubmit = e => {
    e.preventDefault();
    const file = e.target.files[0];
    parseUpload(file, true).then(csv => {
      console.log(csv);
      GC.setAll([...GC.all, csv]);
      console.log(GC.all);
    });
  };

  return (
    <>
      <input type="file" onChange={handleSubmit} accept=".csv" />
      <SceneButton scene="menu" />
    </>
  );
};

export { Menu, Setup, Results, Upload };
