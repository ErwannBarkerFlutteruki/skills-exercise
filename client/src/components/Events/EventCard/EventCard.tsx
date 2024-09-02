import React, { useContext, useState } from "react"

import { useEvents } from "../../../hooks"
import { WsContext } from "../../../Contexts/EventsContext"

import { isEmpty } from 'lodash'
import { Event, Market, Outcomes } from "../../../types"
import { convertTime } from "../../../helpers"
import { MarketsDraw } from "./Markets/MarketsDraw"

interface Props {
    event: Event
    primaryMarket: Market | undefined,
    outcomes: Outcomes | undefined
}

const EventCard = (
    {
        event: { 
        markets, 
        scores, 
        competitors, 
        startTime, 
        status, 
        eventId 
    }, 
    primaryMarket, 
    outcomes
    }: Props) => { 
    const ws = useContext(WsContext)
    const { getMarkets } = useEvents(ws)

    const [isOpen, setIsOpen] = useState(false)
    
    const home = competitors[0].position === 'home' ? competitors[0].name : competitors[1].name;
    const away = competitors[0].position === 'home' ? competitors[1].name : competitors[0].name;
    const {hours, mins} = convertTime(startTime)
    
    const toggleMarketsDraw = async () => {
        await getMarkets(markets)
        setIsOpen(!isOpen)
    }

    return (
        isEmpty(competitors) ?
        <p>Loading...</p> 
        :
        <div className="event-card">
            <div className="event-inner">
                <div className="status-bar">
                    <p>{status.live ? 'LIVE' : ''}</p>
                    <p>Started: {hours}:{mins}</p>
                </div>
                <div className="event-name">
                    <h3 className="team-name">{home}</h3> <p>v</p> <h3 className="team-name">{away}</h3>
                </div>
                <p>{scores.home} - {scores.away}</p>
                <p onClick={toggleMarketsDraw} className="show-markets">Show Markets</p>
                <MarketsDraw isOpen={isOpen} primaryMarket={primaryMarket} eventId={eventId} outcomes={outcomes}/>
            </div>
        </div>
    )
}

export {
    EventCard
}