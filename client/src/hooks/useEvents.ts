import { useCallback, useEffect, useState } from "react";
import { parser, stringify } from "../helpers";
import { Events, Markets, Market, Outcome, Outcomes } from "../types";

const useEvents = (websocket: WebSocket | null | undefined) => {
    const [events, setEvents] = useState<Events>([])
    const [eventMarkets, setEventsMarkets] = useState<Markets>([])
    const [marketOutcomes, setMarketOutcomes] = useState<Outcomes>([])
    
    const getMarkets = async (marketIds: number[]): Promise<any> => {
      if (!websocket) {
        return;
      }
      await marketIds.forEach(marketId => websocket.send(stringify({ type: "getMarket", id: marketId })))
    }

    const getOutcomes = useCallback((outcomeIds: number[]) => {
      if (!websocket) {
        return;
      }
      outcomeIds.forEach(outcomeId => websocket.send(stringify({ type: "getOutcome", id: outcomeId })))
    },[websocket])

    const setMarkets = useCallback(async (data: Market) => {
      if(!eventMarkets.find((m)=> m.eventId === data.eventId)) {
        await setEventsMarkets([...eventMarkets, data])
        await getOutcomes(data.outcomes)
      }
    },[eventMarkets, getOutcomes])

    const setOutcomes = useCallback(async (data: Outcome) => {
      const filtered = await marketOutcomes.filter((o) => o.outcomeId !== data.outcomeId)
      setMarketOutcomes([ ...filtered, data])
      console.log('state >>>', marketOutcomes)
    },[marketOutcomes])

    useEffect(() => {
      if (!websocket) {
        return;
      }
      websocket.onmessage = (e) => {
        const { data, type } = parser(e.data);
    
        switch (type) {
          case "LIVE_EVENTS_DATA":
            setEvents(data)
            break;
          case "MARKET_DATA":
            setMarkets(data)
            break;
          case "OUTCOME_DATA":
            setOutcomes(data)
            break;
          default:
              return;
        }
      };
    }, [websocket, events, eventMarkets, setMarkets, setOutcomes]);

    return {
        events,
        eventMarkets,
        marketOutcomes,
        getMarkets
    }
}

export {
    useEvents
}
