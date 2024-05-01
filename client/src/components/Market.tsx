import React, { Component } from 'react'
import { marketDataType } from './App';

interface Props {
	marketData: marketDataType
}

const Market: React.FC<Props> = (props) => {
	return (
		<div>{props.marketData.eventId} - {props.marketData.name}</div>
	)
}


export default Market;