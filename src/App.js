import "./App.css";
import WeatherApp from "./component/MeteoComponent";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WeatherApp></WeatherApp>
      </header>
    </div>
  );
}

export default App;
