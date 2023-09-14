import { useState } from "react";
import "./App.scss";
import ServerTest from "./ServerTest";
import "@fontsource/urbanist";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mirrors = {
    "osu.direct": {
      apiUrl: "https://osu.direct/api/search?limit=50",
      logo: "https://osu.direct/assets/img/logo.png",
    },
    "catboy.best": {
      apiUrl: "https://catboy.best/api/search?amount=50",
      logo: "",
    },
    "chimu.moe": {
      apiUrl: "https://api.chimu.moe/cheesegull/search?amount=50",
      logo: "https://chimu.moe/static/images/logo-512x512.png",
    },
    "nerinyan.moe": {
      apiUrl: "https://api.nerinyan.moe/search?ps=50",
      logo: "",
    },
  };
  const [running, setRunning] = useState(false);
  const [requests, setRequests] = useState(10);

  const startTest = async () => {
    setRunning(true);
  };
  return (
    <>
      <h1 className="title">osu! Mirror Speed-Test</h1>
      <p className="subtitle">find the best mirror for your Location</p>
      {running ? (
        <div className="test-list">
          {Object.entries(mirrors).map(([key, value]) => (
            <ServerTest
              serverName={key}
              requestAmount={requests}
              apiUrl={value.apiUrl}
              logo={value.logo}
            />
          ))}
        </div>
      ) : (
        <div className="inputgroup">
          <p>Input the number of requests you want to make</p>
          <input type="number" value={requests} onChange={(e) => setRequests(parseInt(e.target.value))}></input>
          <button onClick={startTest}>Start Test</button>
        </div>
      )}
    </>
  );
}

export default App;
