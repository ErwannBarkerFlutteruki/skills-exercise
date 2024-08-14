import React, { FC } from "react";
import { Events, MarketsData } from "../types/Event";
import EventItem from "./EventItem";


interface Props {
	events: Events,
	markets: MarketsData;
	getMarket: (id: number) => void;
}

const EventList: FC<Props> = ({ events, markets, getMarket }) => {
	return (
		<ul>
		{events.map(event => {
			const marketForEvent = markets[event.eventId] ? markets[event.eventId] : null;
			return <EventItem event={event} market={marketForEvent} getMarket={getMarket} />})}
		</ul>
	)
}

export default EventList;