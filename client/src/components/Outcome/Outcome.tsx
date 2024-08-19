import React, { FC } from "react";
import { OutcomeData } from "../../types/Event";
import "./Outcome.css"


interface Props {
	outcome: OutcomeData
	isFractional: boolean
}

const Outcome: FC<Props> = ({outcome, isFractional }) => {

	return (
		<>
		<div>Outcome: {outcome.name}</div>
		<div className="odds-button" > Toggle Odds: {isFractional ? `${outcome.price.num}/${outcome.price.den}` : `${outcome.price.decimal}`}
		</div>
		</>
	)

}

export default Outcome;