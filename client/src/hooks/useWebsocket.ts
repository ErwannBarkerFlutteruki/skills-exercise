  import { useEffect, useState } from 'react';
  import { wsEndpoint } from "../utils/config";
  
  //make sure endpoint is correctly set
  let ws: WebSocket | null = null;

const useWebsocket = () => {
    const [websocket, setWebsocket] = useState<WebSocket | null>();
    
    useEffect(() => {
        (() => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
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
        })()
    },[])

    return {
        websocket
    }
}

export {
    useWebsocket
}