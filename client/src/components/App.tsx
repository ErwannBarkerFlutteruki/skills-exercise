import React, { FC, useEffect, useState } from "react";
import { wsEndpoint } from "../utils/config";
import Market from "./Market";
import './App.css';

export type marketDataType = {
  outcomes?: number[];
  eventId: number;
  name: string;
}

export type outcomeDataType = {
  outcomeId: number;
  marketId: number;
  eventId: number;
  name: string;
  displayOrder: number;
  result: {
    place: number;
    result: string;
    favourite: boolean;
  }
  price: {
    decimal: string;
    num: string;
    den: string;
  }
  status: {
    active: boolean;
    resulted: boolean;
    cashoutable: boolean;
    displayable: boolean;
    suspended: boolean;
    result: string;
  }
}

export type outcomesDataType = outcomeDataType[];

const App: FC = () => {
  type LiveEventDataType = {
    eventId: number;
  }
  
  type liveEventsList = LiveEventDataType[];

  let ws: WebSocket | null = null;

  const [liveEventsData, setLiveEventsData] = useState<liveEventsList>([]);
  const [marketData, setMarketData] = useState<marketDataType | null>(null);
  const [outcomeData, setOutcomeData] = useState<outcomesDataType>([]);
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    ws = new WebSocket(wsEndpoint);
    ws.onclose = () => console.log("WebSocket closed");
    ws.onopen = () => ws && ws.send(JSON.stringify({ type: "getLiveEvents", primaryMarkets: true }));
    setWebsocket(ws);
    return () => {
      if (ws) {
        ws.close();
        setWebsocket(null);
      }
    };
  }, []);

  useEffect(() => {
    if (!websocket) {
      return;
    }
    websocket.onmessage = (e) => {
      const response = JSON.parse(e.data);
      switch (response.type) {
        case "LIVE_EVENTS_DATA":
          const eventData: liveEventsList = response.data;
          setLiveEventsData(eventData);
          break;
        case "MARKET_DATA":
          const marketDataResponse: marketDataType = response.data;
          setMarketData(marketDataResponse);
          break;
        case "OUTCOME_DATA":
          const outcomeDataResponse: outcomeDataType = response.data;
          setOutcomeData((prevData) => prevData ? [...prevData, outcomeDataResponse] : [outcomeDataResponse]);
          break;
        default:
      }
    };
  }, [websocket]);

  useEffect(() => {
    if (marketData && marketData.outcomes) {
      getOutcomes(marketData.outcomes);
    }
  }, [marketData]);

  const getMarket = (marketId: number) => {
    if (!websocket) {
      return;
    }
    websocket.send(JSON.stringify({ type: "getMarket", id: marketId }));
  };

  const getOutcomes = (outcomes: number[]) => {
    if (!websocket) {
      return;
    }
    outcomes.forEach((outcomeId) => {
      websocket.send(JSON.stringify({ type: "getOutcome", id: outcomeId }));
    });
  };

  if (liveEventsData.length) {
    return (
      <div key="marketData">
        {liveEventsData.map((event: any) => {
          let market = null;
          if (marketData && marketData.eventId === event.eventId) {
            market = (
                <Market marketData={marketData} outcomeData={outcomeData} />
            );
          }

          return (
            <div key={event.eventId} className="item">
              <div className="title" onClick={() => marketData ? setMarketData(null) : getMarket(event.markets[0])}>
                <h1>{event.name}</h1>
              </div>
              {market}
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default App;
