import React, { useContext } from "react"
import { WsContext } from "../../Contexts/EventsContext";
import { EventCard } from "./EventCard/EventCard"
import './style.css'
import { useEvents } from "../../hooks";


const Events = ()  => {
    const ws = useContext(WsContext)
    const { events, eventMarkets, marketOutcomes } = useEvents(ws)

    return (
       events ? <div className="container">
            <div className="events">
        { events.map(event => {
            const primaryMarket = eventMarkets.length > 0 ? eventMarkets.find((m) => m.eventId === event.eventId) : undefined;
            return (
                <EventCard 
                    event={event} 
                    primaryMarket={primaryMarket} 
                    outcomes={marketOutcomes} 
                    key={event.eventId}
                />
            )
        })}
        </div>
    </div>
    :
    <div>Loading...</div>
    )
}

export {
    Events
}