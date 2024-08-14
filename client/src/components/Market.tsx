import React, { useState } from 'react'
import { marketDataType, outcomeDataType, outcomesDataType } from './App';
import Outcome from './Outcome';
import './Market.css';

interface Props {
	marketData: marketDataType
	outcomeData: outcomesDataType
}

const Market: React.FC<Props> = ({marketData, outcomeData}) => {
	const [selected, setSelected] = useState<number | null>(null);

	function handleSingleSelection(getCurrentId: any) {
		console.log("EVENTID", getCurrentId);
		setSelected(getCurrentId === selected ? null : getCurrentId);
	}
	console.log("outcomename", outcomeData);
	
	return (
				<div>
					<div onClick={()=> handleSingleSelection(marketData.eventId)} className="title">
						<h2>{marketData.name}</h2>
					</div>
					{ selected === marketData.eventId ? 
						<div>
						{/* {marketData.outcomes && marketData.outcomes.length > 0 ? 
				marketData.outcomes.map((outcomes: any) => <div>{outcomes.name}</div>) : 
						<div> no data found! </div>} */}
						 {outcomeData.map((outcome) => (
                  <Outcome key={outcome.outcomeId} outcome={outcome} />
                ))}
						
						</div>
					: null}
				</div>

	) 	
}


export default Market;