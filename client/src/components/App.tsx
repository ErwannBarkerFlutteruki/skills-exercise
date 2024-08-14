import React, { FC, useEffect, useRef, useState } from "react";
import { wsEndpoint } from "../utils/config";
import { Events, MarketsData } from "../types/Event";
import EventList from "./EventList";
import { get } from "lodash";


const App: FC = () => {
  //make sure endpoint is correctly set
  let ws: WebSocket | null = null;

  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
	const [eventsData, setEventsData] =useState<Events>([]);
  const [markets, setMarkets] = useState<MarketsData>({});


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
			const response = JSON.parse(e.data);

			if (response.type === "LIVE_EVENTS_DATA") {
				setEventsData(response.data);
			}
      if (response.type === "MARKET_DATA") {
        const market = response.data;
        const currentMarkets = { ...markets };
        currentMarkets[market.eventId] = market
        setMarkets(currentMarkets);
      }
    };
  }, [websocket, markets]);


  const getMarket = (marketId: number) => {
    if (!websocket) {
      return;
    }
    websocket.send(JSON.stringify({ type: "getMarket", id: marketId }))
  };


 if (!websocket) {
		return <div>"Loading"</div>;
	}
  return (
		<>
      <EventList events={eventsData} markets={markets} getMarket={getMarket}/>

	</>
)};
export default App;
