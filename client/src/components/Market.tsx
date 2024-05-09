import React, { useState } from 'react'
import { marketDataType } from './App';
import './Market.css';

interface Props {
	marketData: marketDataType
}

const Market: React.FC<Props> = (props) => {

	const [selected, setSelected] = useState(null);

	function handleSingleSelection(getCurrentId: any) {
		console.log("EVENTID", getCurrentId);
		setSelected(getCurrentId === selected ? null : getCurrentId);
	}
	console.log(props.marketData.outcomes);
	
	return (
		<div className="wrapper">
			<div className="accordian">
				<div className="item">
					<div onClick={()=> handleSingleSelection(props.marketData.eventId)} className="title">
						<h3>{props.marketData.name}</h3>
						<span> + </span>
					</div>
					{ selected === props.marketData.eventId ? 
						<div className="content"> Event Details {props.marketData.eventId} - {props.marketData.outcomes} </div>
					: null}
				</div>
			</div>
		</div>
			/* {props.marketData.outcomes && props.marketData.outcomes.length > 0 ? 
					props.marketData.outcomes.map((item: any) => item.outcomes) : 
					<div> no data found! </div>} */

	) 	
}
	




export default Market;