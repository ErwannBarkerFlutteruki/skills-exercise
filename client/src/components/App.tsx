import React, { FC, useEffect, useRef, useState } from "react";
import { wsEndpoint } from "../utils/config";
const App: FC = () => {
  //make sure endpoint is correctly set
  let ws: WebSocket = new WebSocket(wsEndpoint);

  useEffect(() => {
    ws.onclose = () => console.log("ws closed");
    //ws is open at this point
    ws.send(JSON.stringify({ type: "getLiveEvents", primaryMarkets: true }));
    return () => {
      if (ws) {
        ws.close();
      }
    };
  },[ws]);

  useEffect(() => {
    if (!ws) return;
    ws.onmessage = e => {
      const message = JSON.parse(e.data);
      console.log("e", message);
    };
  }, []);

  return (
  <div>Initial Render</div>
  );
};
export default App;
