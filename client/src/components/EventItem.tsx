import React, { FC, useState, useEffect } from "react";
import { EventData, MarketData } from "../types/Event";

interface Props {
	event: EventData;
	market: MarketData | null;
	getMarket: (marketId: number) => void;
}

const EventItem: FC<Props> = ({ event, market, getMarket }) => {

	return (
		<li>
			{event.eventId} - {event.name} {market ? market.name : null}
			<button onClick={() => getMarket(event.markets[0])}>Get Markets</button>
		</li>

	)

}

export default EventItem;