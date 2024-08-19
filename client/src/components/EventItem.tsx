import React, { FC, useState, useEffect } from "react";
import { EventData, MarketData, OutcomesData } from "../types/Event";
import Outcome from "./Outcome/Outcome";
import Market from "./Market";

interface Props {
	event: EventData
	markets: MarketData[]
	getMarkets: (marketIds: number[]) => void
	outcomes: OutcomesData
	isFractional: boolean
}

const EventItem: FC<Props> = ({ event, markets, getMarkets, outcomes, isFractional }) => {


	return (
		<li>
			{event.eventId} - {event.name} 
			{markets.map(market => <Market market={market} outcomes={outcomes} isFractional={isFractional} />)}
			<button onClick={() => getMarkets(event.markets)}>Get Markets</button>
		</li>


	)

}

export default EventItem;