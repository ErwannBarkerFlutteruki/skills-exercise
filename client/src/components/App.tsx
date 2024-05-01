import React, { FC, useEffect, useRef, useState } from "react";
import { wsEndpoint } from "../utils/config";
import Market from "./Market";


export type marketDataType = {
  outcomes: number[];
  eventId: number;
  name: string;
}

const App: FC = () => {

  type LiveEventDataType = {
    eventId: number;
  }

  type liveEventsList = LiveEventDataType[];

  //make sure endpoint is correctly set
  let ws: WebSocket | null = null;

  const [liveEventsData, setLiveEventsData] = useState<liveEventsList>([]);
  const [marketData, setMarketData] = useState<marketDataType | null>(null);
  const [websocket, setWebsocket] = useState<WebSocket | null>();

  // this.state = {
  //   data: {
  //     market: {},
  //     outcomes: {}
  // }

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
      const response = JSON.parse(e.data);
      // console.log(response.type);
      switch (response.type) {
        case "LIVE_EVENTS_DATA":
          const eventData: liveEventsList = response.data;
          setLiveEventsData(eventData);
          break;
        case "MARKET_DATA":
          const marketResponse = JSON.parse(e.data);

          const marketDataResponse: marketDataType = response.data;
          setMarketData(marketDataResponse);
          break;
      }

    };
  }, [websocket]);

  const getMarket = (marketId: number ) => {
    if (!websocket) {
        return;
      }
    websocket.send(JSON.stringify({ type: "getMarket", id: marketId }));
  }

  if (liveEventsData.length) {
    // console.log(data.data.map((item: any) => item.name));
    return (
      <div>
        {liveEventsData.map((item: any) => {
          let market: any = null;
          if (marketData && marketData.eventId === item.eventId) {
            //if I have a market but no outcomes, get the outcomes and then pass them to the market object.
            market = <Market marketData={marketData} />
          }
          return (
            <>
              <div key={item.eventId} onClick={() => getMarket(item.markets[0])}>{item.name}</div>
              {market}
            </>
          )
        })}

      </div>
    )
  } else
    return <div>loading</div>
};
export default App;
