import "./ServerTest.scss";

function ServerTest(props: Record<string, string>) {
  return (
    <>
      <div className="server-card">
        <img width="40" height="40" src={"https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://" + props['serverName'] + "&size=128"}></img>
        <div className="server-info">
          <div className="server-info-title">Server</div>
          {props["serverName"]}
        </div>
        <div className="server-info">
          <div className="server-info-title">Average Speed</div>
          0ms
        </div>
        <div className="server-info">
          <div className="server-info-title">Shortest Request</div>
          0ms
        </div>
        <div className="server-info">
          <div className="server-info-title">Longest Request</div>
          1337ms
        </div>
      </div>
    </>
  );
}

export default ServerTest;
