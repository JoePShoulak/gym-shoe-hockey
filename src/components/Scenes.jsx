import { useContext, useState } from "react";
import { capit } from "../lib/helper";
import { Game, Team } from "../lib/Hockey";
import { GameContext } from "../util/GameContext";
import { BasicScore, Header, BoxScore, PlayByPlay } from "./ScoreDisplay";
import TeamSelector from "./TeamSelector";

const SceneButton = ({ scene }) => {
  const GC = useContext(GameContext);

  return <button onClick={() => GC.setScene(scene)}>{capit(scene)}</button>;
};

const Menu = () => (
  <>
    <h3>Welcome!</h3>
    <p>
      Press Setup to create an exhibition match, or press Upload to add some
      custom teams!
    </p>

    <SceneButton scene="setup" />
    <SceneButton scene="upload" />
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
        setMessage("Team already exists.");
      } else {
        GC.setAll([...GC.all, team]);
        setCount(count + 1);
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
      <p>
        You have uploaded {count} file{count !== 1 && "s"}.
      </p>
      <SceneButton scene="menu" />
    </>
  );
};

export { Menu, Setup, Results, Upload };
