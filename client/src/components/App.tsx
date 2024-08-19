import React, { FC, useEffect, useRef, useState } from "react";
import { wsEndpoint } from "../utils/config";
import { Events, MarketData, MarketsData, OutcomeData, OutcomesData } from "../types/Event";
import EventList from "./EventList";
import { get } from "lodash";


const App: FC = () => {
  //make sure endpoint is correctly set
  let ws: WebSocket | null = null;

  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
	const [eventsData, setEventsData] =useState<Events>([]);
  const [markets, setMarkets] = useState<MarketsData>({});
	const [outcomes, setOutcomes] = useState<OutcomesData>([])
	const [isFractional, setIsFractional] = useState<boolean>(false)


  useEffect(() => {
    ws = new WebSocket(wsEndpoint);
    ws.onclose = () => console.log("ws closed");
    ws.onopen = () => ws && ws.send(JSON.stringify({ type: "getLiveEvents" }));
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
        const market: MarketData = response.data;
				console.log(market)
        const currentMarkets = { ...markets };
				if (!currentMarkets[market.eventId]) {
					currentMarkets[market.eventId] = []
				}
        currentMarkets[market.eventId].push(market)
        setMarkets(currentMarkets);
				// get all outcomes 
				// reset the outcomes for given marketId to empty array
				const outcomeData = {...outcomes}
				outcomeData[market.marketId] = []
				setOutcomes(outcomeData)
				getOutcomes(market.outcomes);
				// console.log(market);
      }
			if (response.type === "OUTCOME_DATA") {
				const outcome: OutcomeData = response.data;
				const outcomeData = {...outcomes}			
				if (!outcomeData[outcome.marketId]) {
          outcomeData[outcome.marketId] = []
        }
					outcomeData[outcome.marketId].push(outcome)
				setOutcomes(outcomeData);

			}
    };
  }, [websocket, markets, outcomes]);

	const toggleButton = () => {
		setIsFractional(!isFractional)
	}

	const getOutcomes = (outcomeIds: number[]) => {
		if (!websocket) {
      return;
    }
		outcomeIds.forEach(outcomeId => {
			websocket.send(JSON.stringify({ type: "getOutcome", id: outcomeId }))
		})}

  const getMarkets = (marketIds: number[]) => {
    if (!websocket) {
      return;
    }
		console.log(marketIds)
		marketIds.forEach(marketId => 
			websocket.send(JSON.stringify({ type: "getMarket", id: marketId }))
			)
  };


if (!websocket) {
		return <div>"Loading"</div>;
	}
	console.log("eventsdata", eventsData)
  return (
		<>
		<button onClick={toggleButton}> Toggle Odds </button>
      <EventList events={eventsData} markets={markets} getMarkets={getMarkets} outcomesData={outcomes} isFractional={isFractional}/>

	</>
)};
export default App;
