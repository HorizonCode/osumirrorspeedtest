import "./ServerTest.scss";

function ServerTest(props: Record<string, string>) {
  return (
    <>
      <div className="server-card">
        <div className="server-info">
          <div className="server-info-title">Server</div>
          {props["serverName"]}
        </div>
      </div>
    </>
  );
}

export default ServerTest;
