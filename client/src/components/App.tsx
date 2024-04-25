import React, { FC, useEffect, useRef, useState } from "react";
import { wsEndpoint } from "../utils/config";
const App: FC = () => {

const [isSetup, setSetup] = useState(false);
let ws: WebSocket | null = null;

  useEffect(() => {
    ws = new WebSocket(wsEndpoint);
    ws.onopen = () => console.log("ws opened");
    ws.onclose = () => console.log("ws closed");
    ws.send(`Check the instructions to see what needs passing here`);
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
