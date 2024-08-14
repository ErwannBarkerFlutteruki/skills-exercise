import React, { FC, useEffect, useRef, useState } from "react";
import { wsEndpoint } from "../utils/config";
const App: FC = () => {
  //make sure endpoint is correctly set
  let ws: WebSocket | null = null;

  const [websocket, setWebsocket] = useState<WebSocket | null>();

  useEffect(() => {
    ws = new WebSocket(wsEndpoint);
    ws.onclose = () => console.log("ws closed");
    ws.onopen = () => ws && ws.send(JSON.stringify({ type: "getLiveEvents", primaryMarkets: true }));
    setWebsocket(ws);
    return () => {
      if (ws) {
        ws.close();
        setWebsocket(ws);
      }
    };
  }, []);

  useEffect(() => {
    if (!websocket) {
      return;
    }
    websocket.onmessage = e => {
      console.log(e);
    };
  }, [websocket]);

  return (
  <div>Initial Render</div>
  );
};
export default App;
