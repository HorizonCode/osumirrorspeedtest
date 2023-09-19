import { useState } from "react";
import ServerTest from "./ServerTest";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ServerMirror from "./ServerMirror";

import "./App.scss";
import "@sweetalert2/theme-dark";
import "@fontsource/urbanist/600.css";
import "@fontsource/urbanist/500.css";
import "@fontsource/urbanist/400.css";
import "@fontsource/urbanist/300.css";

function App() {
  const alert = withReactContent(Swal);
  const mirrors = [
    new ServerMirror({
      id: 0,
      name: "osu.direct",
      logo: "https://osu.direct/assets/img/logo.png",
      apiSearchUrl: "https://api.osu.direct/search?limit=50",
      apiSetUrl: "https://api.osu.direct/s/1337",
      processing: false,
    }),
    new ServerMirror({
      id: 1,
      name: "catboy.best",
      logo: "",
      apiSearchUrl: "https://catboy.best/api/search?amount=50",
      apiSetUrl: "https://catboy.best/api/s/1337",
      processing: false,
    }),
    new ServerMirror({
      id: 2,
      name: "chimu.moe",
      logo: "https://chimu.moe/static/images/logo-512x512.png",
      apiSearchUrl: "https://api.chimu.moe/cheesegull/search?amount=50",
      apiSetUrl: "https://api.chimu.moe/api/s/1337",
      processing: false,
    }),
    new ServerMirror({
      id: 3,
      name: "nerinyan.moe",
      logo: "",
      apiSearchUrl: "https://api.nerinyan.moe/search?ps=50",
      apiSetUrl: "https://api.nerinyan.moe/search?q=1337&option=s",
      processing: false,
    }),
  ];

  const [dynMirrors, setDynMirrors] = useState(mirrors);

  const [mirrorIndex, setMirrorIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [requests, setRequests] = useState(10);
  const [type, setType] = useState("search");

  const processNext = () => {
    if (mirrorIndex >= Object.keys(mirrors).length) return;
    mirrors[mirrorIndex].processing = true;
    setDynMirrors(mirrors);
    setMirrorIndex(mirrorIndex + 1);
  };

  const startTest = async () => {
    if (requests < 3 || requests > 1000 || isNaN(requests)) {
      alert.fire({
        title: "Oops...",
        text: "requests must be >= 3 and <= 1000",
        icon: "error",
        focusConfirm: false,
      });
      return;
    }
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
                key={mirror.name}
                serverObject={mirror}
                requestAmount={requests}
                type={type}
                onDone={processNext}
              />
            ))
          )}
        </div>
      ) : (
        <>
          <p>Input the number of requests you want to make</p>
          <div className="inputgroup">
            <select onChange={(e) => setType(e.target.value)}>
              <option value="search">Search</option>
              <option value="sets">BeatmapSets</option>
              {/* TODO: soon TM? <option value="download">Download</option> */}
            </select>
            <input
              type="number"
              value={requests}
              onChange={(e) => setRequests(parseInt(e.target.value))}
              max="1000"
              min="3"
            ></input>
            <button onClick={startTest}>Start Test</button>
          </div>
        </>
      )}
    </>
  );
}

export default App;
