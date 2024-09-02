import React from "react";
import "./style.css"
import { Market, Outcomes } from "../../../../types";

interface Props {
    isOpen: boolean,
    primaryMarket: Market | undefined,
    eventId : number,
    outcomes: Outcomes | undefined
}

const MarketsDraw = ({isOpen = false, primaryMarket, outcomes}: Props) => {
    const marketDrawOpen = isOpen ? 'open' : 'closed'; 
    return (
        primaryMarket && outcomes ? (
            <div className={marketDrawOpen}>
                <div className="market">
                    <p className="market-name">{primaryMarket.name}</p>
                    <div className="outcomes">
                        {
                        
                        outcomes.filter(o => o.marketId === primaryMarket.marketId).map(outcome => {
                            return (
                                <p className="outcome" key={outcome.outcomeId}>{outcome.name}</p>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        )
        :
        null
    )
}

export {
    MarketsDraw
}