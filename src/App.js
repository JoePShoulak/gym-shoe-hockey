import "./App.css";
import Exhibition from "./components/Exhibition";

const App = () => (
  <>
    <header>
      <h1 className="centered">Gym Shoe Hockey</h1>
    </header>
    <div className="centered">
      <main>
        <Exhibition />
      </main>
    </div>
  </>
);

export default App;
