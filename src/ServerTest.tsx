import { useEffect, useState } from "react";
import "./ServerTest.scss";
import noLogo from "./assets/nologo.webp";
import { calculateAverageWithMinMax } from "./mathUtil";
import ServerMirror from "./ServerMirror";
import { prettytime } from "./prettyTime";

function ServerTest(props: {
  serverObject: ServerMirror;
  requestAmount: number;
  type: string;
  onDone: () => void;
}) {
  const [imgSrc, setImgSrc] = useState(props.serverObject.logo);

  let calculating = false;

  const [averageSpeed, setAverageSpeed] = useState("waiting...");
  const [fastestRequest, setFastestRequest] = useState("waiting...");
  const [slowestRequest, setSlowestRequest] = useState("waiting...");
  const [failedRequests, setFailedRequests] = useState("waiting...");
  const [requestsPerSecond, setRequestsPerSecond] = useState("waiting...");
  const [time, setTime] = useState("waiting...");

  const maxRequests = props.requestAmount;

  const calculateLatency = async () => {
    if (calculating) return;
    calculating = true;
    const samples: number[] = [];
    const startTime = performance.now();
    for (let sample = 0; sample < maxRequests; sample++) {
      try {
        const latencyStart = performance.now();
        const request = await fetch(
          props.type == "search"
            ? props.serverObject.apiSearchUrl
            : props.serverObject.apiSetUrl,
          {
            keepalive: true,
            headers: {
              "User-Agent": window.navigator.userAgent,
            },
            method: "GET",
            cache: "no-cache",
            mode: "cors",
          }
        );
        if (!request.ok) throw new Error();
        const totalLatency = performance.now() - latencyStart;
        samples.push(totalLatency);
        const result = calculateAverageWithMinMax(samples);
        const average = prettytime(result.average, {
          short: true,
        });
        const highest = prettytime(result.highest, {
          short: true,
        });
        const lowest = prettytime(result.lowest, {
          short: true,
        });
        setFastestRequest(lowest);
        setSlowestRequest(highest);
        setAverageSpeed(average);
      } catch (err) {
        // funny moment
      }
      const droppedRequests = Math.abs(sample + 1 - samples.length);
      setFailedRequests(droppedRequests + "/" + (sample + 1));

      const endTime = performance.now();
      const elapsedSeconds = (endTime - startTime) / 1000;
      const rps = samples.length / elapsedSeconds;
      setRequestsPerSecond(rps.toFixed(2));
      await new Promise((res) => setTimeout(res, 500));
    }
    const elapsedTime = performance.now() - startTime;
    const droppedRequests = Math.abs(maxRequests - samples.length);
    setFailedRequests(droppedRequests + "/" + maxRequests);
    setTime(`took ${prettytime(elapsedTime)}`);
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
      <div
        className={
          "server-card animated slideSide wait-" + props.serverObject.id
        }
      >
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
          <div className="server-info-title">Time</div>
          {time}
        </div>
      </div>
    </>
  );
}

export default ServerTest;
