import { useEffect, useState } from "react";
import "./ServerTest.scss";
import noLogo from './assets/nologo.webp';
import { calculateAverageWithMinMax } from "./mathUtil";
import prettytime from 'pretty-time';

function ServerTest(props: Record<string, string>) {
  const [imgSrc, setImgSrc] = useState(props["logo"]);

  const [averageSpeed, setAverageSpeed] = useState("calculating...");
  const [fastestRequest, setFastestRequest] = useState("calculating...");
  const [slowestRequest, setSlowestRequest] = useState("calculating...");
  const [failedRequests, setFailedRequests] = useState("calculating...");

  const calculateLatency = async () => {
    const samples: number[] = [];
    for(let sample = 0; sample < 5; sample++){
      const latencyStart = performance.now();
      const request = await fetch(props["apiUrl"]);
      if(!request.ok) continue;
      const totalLatency = performance.now() - latencyStart;
      samples.push(totalLatency);
      await new Promise(res => setTimeout(res, 500));
    }

    const result = calculateAverageWithMinMax(samples);
    const average = prettytime([Math.trunc(result.average / 1000), Math.trunc(result.average * 1000000)]);
    const highest = prettytime([Math.trunc(result.highest / 1000), Math.trunc(result.highest * 1000000)]);
    const lowest = prettytime([Math.trunc(result.lowest / 1000), Math.trunc(result.lowest * 1000000)]);
    setFastestRequest(lowest);
    setSlowestRequest(highest);
    setAverageSpeed(average);

    const droppedRequests = Math.abs(5 - samples.length);
    setFailedRequests(droppedRequests + "/5");

  }

  useEffect(() => {
    calculateLatency();
  }, []);

  return (
    <>
      <div className="server-card">
        <div className="server-icon"><img width="64" height="64" src={imgSrc} onError={() =>setImgSrc(noLogo)}></img></div>
        <div className="server-info">
          <div className="server-info-title">Server</div>
          <a href={"https://" + props["serverName"]} target="_blank">{props["serverName"]}</a>
        </div>
        <div className="server-info">
          <div className="server-info-title">Average Speed</div>
          {averageSpeed}
        </div>
        <div className="server-info">
          <div className="server-info-title">Fastest Request</div>
          {fastestRequest}
        </div>
        <div className="server-info">
          <div className="server-info-title">Slowest Request</div>
          {slowestRequest}
        </div>
        <div className="server-info">
          <div className="server-info-title">Failed Requests</div>
          {failedRequests}
        </div>
      </div>
    </>
  );
}

export default ServerTest;
