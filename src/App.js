import "./App.css";
import Game from "./components/Game";

const App = () => (
  <>
    <header>
      <h1 className="centered">Gym Shoe Hockey</h1>
    </header>
    <div className="centered">
      <main>
        <Game />
      </main>
    </div>
  </>
);

export default App;
