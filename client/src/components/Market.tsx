import React, { FC } from "react";
import { MarketData, OutcomesData } from "../types/Event";
import Outcome from "./Outcome/Outcome";




interface Props {
	market: MarketData
	outcomes: OutcomesData
	isFractional: boolean
}

const Market: FC<Props> = ({market, outcomes, isFractional}) => {
	const myOutcomes = outcomes[market.marketId] ? outcomes[market.marketId] : [];

				// let outcomesForEvent: OutcomeData[] = []
			// if (marketsForEvent) {
			// 	outcomesForEvent = outcomesData[marketsForEvent.marketId] ? outcomesData[marketsForEvent.marketId] : []
			// }



	return (
		<>
		<div>{market.name}</div>
		{myOutcomes.map((outcome) => <Outcome outcome={outcome} isFractional={isFractional}/>)}
		</>
	)

}

export default Market;