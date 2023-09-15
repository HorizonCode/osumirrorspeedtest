import { useEffect, useState } from "react";
import "./ServerTest.scss";
import noLogo from "./assets/nologo.webp";
import { calculateAverageWithMinMax } from "./mathUtil";
import prettytime from "pretty-time";
import ServerMirror from "./ServerMirror";

function ServerTest(props: {
  serverObject: ServerMirror;
  requestAmount: number;
  onDone: () => void;
}) {
  const [imgSrc, setImgSrc] = useState(props.serverObject.logo);

  let calculating = false;

  const [averageSpeed, setAverageSpeed] = useState("waiting...");
  const [fastestRequest, setFastestRequest] = useState("waiting...");
  const [slowestRequest, setSlowestRequest] = useState("waiting...");
  const [failedRequests, setFailedRequests] = useState("waiting...");
  const [requestsPerSecond, setRequestsPerSecond] = useState("waiting...");
  const [aproxTime, setAproxTime] = useState("waiting...");

  const maxRequests = props.requestAmount;

  const calculateLatency = async () => {
    if (calculating) return;
    calculating = true;
    const samples: number[] = [];
    const startTime = performance.now();
    for (let sample = 0; sample < maxRequests; sample++) {
      try {
        const latencyStart = performance.now();
        const request = await fetch(props.serverObject.apiUrl, {
          keepalive: true,
          headers: {
            "User-Agent": window.navigator.userAgent,
          },
          method: "GET",
          cache: "no-cache",
          mode: "cors",
        });
        if (!request.ok) throw new Error();
        const totalLatency = performance.now() - latencyStart;
        samples.push(totalLatency);
        const result = calculateAverageWithMinMax(samples);
        const average = prettytime([
          Math.trunc(result.average / 1000),
          Math.trunc(result.average * 1000000),
        ]);
        const highest = prettytime([
          Math.trunc(result.highest / 1000),
          Math.trunc(result.highest * 1000000),
        ]);
        const lowest = prettytime([
          Math.trunc(result.lowest / 1000),
          Math.trunc(result.lowest * 1000000),
        ]);
        setFastestRequest(lowest);
        setSlowestRequest(highest);
        setAverageSpeed(average);
        const remainingRequests = Math.abs(maxRequests - sample);
        const remainingTime = remainingRequests * result.average;
        setAproxTime(
          prettytime([
            Math.trunc(remainingTime / 1000),
            Math.trunc(remainingTime * 1000000),
          ])
        );
      } catch (err) {
        // funny moment
      }
      const droppedRequests = Math.abs(sample + 1 - samples.length);
      setFailedRequests(droppedRequests + "/" + samples.length);

      const endTime = performance.now();
      const elapsedSeconds = (endTime - startTime) / 1000;
      const rps = samples.length / elapsedSeconds;
      setRequestsPerSecond(rps.toFixed(2));
      await new Promise((res) => setTimeout(res, 500));
    }

    const droppedRequests = Math.abs(maxRequests - samples.length);
    setFailedRequests(droppedRequests + "/" + maxRequests);
    setAproxTime("done!");
    props.onDone();
  };

  useEffect(() => {
    if (props.serverObject.processing) {
      calculateLatency();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.serverObject.processing]);

  return (
    <>
      <div className={"server-card animated slideSide wait-" + props.serverObject.id}>
        <div className="server-icon">
          <img
            width="64"
            height="64"
            src={imgSrc as string}
            onError={() => setImgSrc(noLogo)}
          ></img>
        </div>
        <div className="server-info">
          <div className="server-info-title">Server</div>
          <a href={"https://" + props.serverObject.name} target="_blank">
            {props.serverObject.name}
          </a>
        </div>
        <div className="server-info">
          <div className="server-info-title">Average speed</div>
          {averageSpeed}
        </div>
        <div className="server-info">
          <div className="server-info-title">Fastest request</div>
          {fastestRequest}
        </div>
        <div className="server-info">
          <div className="server-info-title">Slowest request</div>
          {slowestRequest}
        </div>
        <div className="server-info">
          <div className="server-info-title">Failed requests</div>
          {failedRequests}
        </div>
        <div className="server-info">
          <div className="server-info-title">Requests per second</div>
          {requestsPerSecond}
        </div>
        <div className="server-info">
          <div className="server-info-title">Aprox. time</div>
          {aproxTime}
        </div>
      </div>
    </>
  );
}

export default ServerTest;
