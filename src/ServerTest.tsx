import { useEffect, useState } from "react";
import "./ServerTest.scss";
import noLogo from "./assets/nologo.webp";
import { calculateAverageWithMinMax } from "./mathUtil";
import prettytime from "pretty-time";

function ServerTest(props: Record<string, string | number>) {
  const [imgSrc, setImgSrc] = useState(props["logo"]);

  let calculating = false;

  const [averageSpeed, setAverageSpeed] = useState("calculating...");
  const [fastestRequest, setFastestRequest] = useState("calculating...");
  const [slowestRequest, setSlowestRequest] = useState("calculating...");
  const [failedRequests, setFailedRequests] = useState("calculating...");
  const [requestsPerSecond, setRequestsPerSecond] = useState("calculating...");

  let maxRequests = props["requestAmount"] as number;

  const calculateLatency = async () => {
    if (calculating) return;
    calculating = true;
    const samples: number[] = [];
    const startTime = performance.now();
    for (let sample = 0; sample < maxRequests; sample++) {
      try {
        const latencyStart = performance.now();
        const request = await fetch(props["apiUrl"] as string);
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
      } catch (err) {}
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
  };

  useEffect(() => {
    calculateLatency();
  }, []);

  return (
    <>
      <div className="server-card">
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
          <a href={"https://" + props["serverName"]} target="_blank">
            {props["serverName"]}
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
      </div>
    </>
  );
}

export default ServerTest;
