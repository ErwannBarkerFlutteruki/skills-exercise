import React, { FC } from "react";
import { Events, MarketData, MarketsData, OutcomeData, OutcomesData } from "../types/Event";
import EventItem from "./EventItem";


interface Props {
	events: Events,
	markets: MarketsData;
	getMarkets: (ids: number[]) => void
	outcomesData: OutcomesData
	isFractional: boolean
}

const EventList: FC<Props> = ({ events, markets, getMarkets, outcomesData, isFractional }) => {
	return (
		<ul>
		{events.map(event => {
			const marketsForEvent: MarketData[] = markets[event.eventId] ? markets[event.eventId] : [];

			// let outcomesForEvent: OutcomeData[] = []
			// if (marketsForEvent) {
			// 	outcomesForEvent = outcomesData[marketsForEvent.marketId] ? outcomesData[marketsForEvent.marketId] : []
			// }

			// for each market in an event, get me all the outcomes
			return <EventItem event={event} markets={marketsForEvent} getMarkets={getMarkets} outcomes={outcomesData} isFractional={isFractional} />})}
		</ul>
	)
}

export default EventList;