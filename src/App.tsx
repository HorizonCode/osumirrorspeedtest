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
      apiUrl: "https://osu.direct/api/search?limit=50",
      processing: false,
    }),
    new ServerMirror({
      id: 1,
      name: "catboy.best",
      logo: "",
      apiUrl: "https://catboy.best/api/search?amount=50",
      processing: false,
    }),
    new ServerMirror({
      id: 2,
      name: "chimu.moe",
      logo: "https://chimu.moe/static/images/logo-512x512.png",
      apiUrl: "https://api.chimu.moe/cheesegull/search?amount=50",
      processing: false,
    }),
    new ServerMirror({
      id: 3,
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
                onDone={processNext}
              />
            ))
          )}
        </div>
      ) : (
        <>
          <p>Input the number of requests you want to make</p>
          <div className="inputgroup">
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
