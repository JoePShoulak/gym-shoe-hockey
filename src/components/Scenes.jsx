import { useContext, useState } from "react";
import { Game, Team } from "../lib/Hockey";
import { GameContext } from "../util/GameContext";
import { BasicScore, Header, BoxScore, PlayByPlay } from "./ScoreDisplay";
import TeamSelector from "./TeamSelector";

const capit = s => s.charAt(0).toUpperCase() + s.slice(1);

const SceneButton = ({ scene }) => {
  const GC = useContext(GameContext);

  return <button onClick={() => GC.setScene(scene)}>{capit(scene)}</button>;
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
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    const file = document.getElementById("file").files[0];

    Team.parseCSV(file).then(team => {
      if (GC.all.map(t => t.name).includes(team.name)) {
        console.log("dupe");
        setMessage("Team already exists.");
      } else {
        GC.setAll([...GC.all, team]);
        setCount(count + 1);
        setMessage("");
      }
    });
  };

  return (
    <>
      <input type="file" id="file" accept=".csv" />
      <button onClick={handleSubmit}>Submit</button>
      <p>You have uploaded {count} files.</p>
      <p>{message}</p>
      <SceneButton scene="menu" />
    </>
  );
};

export { Menu, Setup, Results, Upload };
