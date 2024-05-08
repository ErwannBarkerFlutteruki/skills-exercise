import React, { useState, Component } from 'react'
import { marketDataType } from './App';

interface Props {
	marketData: marketDataType
}

const Market: React.FC<Props> = (props) => {

	const [outcomes, setOutcomes] = useState<marketDataType | null>(null);
	
	return (
		<div>
			{props.marketData.eventId} - {props.marketData.name} - {props.marketData.outcomes}
	 	</div>
		

	) 	
}
	




export default Market;