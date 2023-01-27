import { useContext } from "react";
import { useState } from "react";
import { Game } from "../lib/Hockey";
import { GameContext } from "../util/GameContext";
import { BasicScore, Header, BoxScore, PlayByPlay } from "./ScoreDisplay";
import TeamSelector from "./TeamSelector";

const Menu = () => {
  const GC = useContext(GameContext);

  return <button onClick={() => GC.setScene("setup")}>Start</button>;
};

const Setup = () => {
  const GC = useContext(GameContext);

  return (
    <>
      <p>Select your teams</p>

      {["visitors", "home"].map(team => (
        <TeamSelector key={team} id={team} />
      ))}

      <button onClick={() => GC.setScene("playing")}>Play</button>
    </>
  );
};

const Results = () => {
  const GC = useContext(GameContext);

  const visitors = GC.all.filter(team => team.name === GC.selected.visitors)[0];
  const home = GC.all.filter(team => team.name === GC.selected.home)[0];

  const [game, setGame] = useState(new Game(visitors, home).play());

  return (
    <>
      <Header game={game} />
      <BasicScore game={game} />
      <BoxScore game={game} />
      <PlayByPlay game={game} />

      {/* TODO: Add replay button */}
      <button onClick={() => setGame(game.play())}>Replay</button>
      <button onClick={() => GC.setScene("main")}>Menu</button>
    </>
  );
};

export { Menu, Setup, Results };
