import { useState } from "react";
import "./App.scss";
import ServerTest from "./ServerTest";
import "@fontsource/urbanist";
import ServerMirror from "./ServerMirror";

function App() {
  const mirrors = [
    new ServerMirror({
      name: "osu.direct",
      logo: "https://osu.direct/assets/img/logo.png",
      apiUrl: "https://osu.direct/api/search?limit=50",
      processing: false,
    }),
    new ServerMirror({
      name: "catboy.best",
      logo: "",
      apiUrl: "https://catboy.best/api/search?amount=50",
      processing: false,
    }),
    new ServerMirror({
      name: "chimu.moe",
      logo: "https://chimu.moe/static/images/logo-512x512.png",
      apiUrl: "https://api.chimu.moe/cheesegull/search?amount=50",
      processing: false,
    }),
    new ServerMirror({
      name: "nerinyan.moe",
      logo: "",
      apiUrl: "https://api.nerinyan.moe/search?ps=50",
      processing: false,
    }),
  ];

  const [dynMirrors, setDynMirrors] = useState(mirrors);

  const [mirrorIndex, setMirrorIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [requests, setRequests] = useState(10);

  const processNext = () => {
    if (mirrorIndex >= Object.keys(mirrors).length) return;
    mirrors[mirrorIndex].name = "yeet";
    mirrors[mirrorIndex].processing = true;
    setDynMirrors(mirrors);
    setMirrorIndex(mirrorIndex + 1);
  };

  const startTest = async () => {
    setRunning(true);
    processNext();
  };

  return (
    <>
      <h1 className="title">osu! Mirror Speed-Test</h1>
      <p className="subtitle">find the best mirror for your Location</p>
      {running ? (
        <div className="test-list">
          {Object.values(
            dynMirrors.map((mirror) => (
              <ServerTest
                serverObject={mirror}
                requestAmount={requests}
                onDone={processNext}
              />
            ))
          )}
        </div>
      ) : (
        <div className="inputgroup">
          <p>Input the number of requests you want to make</p>
          <input
            type="number"
            value={requests}
            onChange={(e) => setRequests(parseInt(e.target.value))}
          ></input>
          <button onClick={startTest}>Start Test</button>
        </div>
      )}
    </>
  );
}

export default App;
