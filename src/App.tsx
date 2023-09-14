import { useState } from "react";
import "./App.scss";
import ServerTest from "./ServerTest";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mirrors = {
    "osu.direct": "https://osu.direct/api/search?limit=50",
    "catboy.best": "https://catboy.best/api/search?amount=50",
    "chimu.moe": "https://api.chimu.moe/cheesegull/search?amount=50",
    "nerinyan.moe": "https://api.nerinyan.moe/search?ps=50",
  };
  const [running, setRunning] = useState(false);

  const startTest = async () => {
    setRunning(true);
  };
  return (
    <>
      <h1>osu! Mirror Speed-Test</h1>
      {!running && <button onClick={startTest}>Start Test</button>}
      {running && (
        <div className="test-list">
          {Object.entries(mirrors).map(([key, value]) => (
            <ServerTest serverName={key} apiUrl={value} />
          ))}
        </div>
      )}
    </>
  );
}

export default App;
