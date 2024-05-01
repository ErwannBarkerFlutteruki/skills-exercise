import React, { Component, ReactElement } from 'react'

import { wsEndpoint } from '../utils/config'
import Market from './Market'

export  class App extends Component<{}, { data: any }> {
  private w: WebSocket
  constructor(props: any) {

    super(props)
    this.w = new WebSocket(wsEndpoint)
    this.state = {
      	data: {
			liveEventsData: [],
			market: {},
			getOutcomes: {}
		}
	}
}
	
	componentDidMount() {
	//example of types
	type LiveEventDataResponseType = {
		eventId: number;
	}

    // a message has been recieved
    this.w.onmessage = (e: MessageEvent) => {
		const response = JSON.parse(e.data);
		// console.log(response.type);
		switch (response.type) {
			case "LIVE_EVENTS_DATA" :
				const eventData: LiveEventDataResponseType = response.data;
				this.setState({
					data: {
						...this.state.data,
						liveEventsData: eventData,
						market: null
					}
				});
			break;
			case "MARKET_DATA" :
				const marketData: LiveEventDataResponseType = response.data;
				this.setState({
					data: {
						...this.state.data,
						market: marketData
					}
				}, this.getOutcomes());
			break;

			// const outcome = outcome.find(outcomeId)
		}

    }
    // send a request to get events
    this.w.onopen = () =>
      	this.w.send(JSON.stringify({type: "getLiveEvents", primaryMarkets: true }));
  	}

	getMarket = (marketId: number) => {
		this.w.send(JSON.stringify({ type: "getMarket", id: marketId }));
   }
  componentWillUnmount() {
    this.w.close()
  }

  render() {
	const { data } = this.state

	  if (data && data.liveEventsData.length) {
			// console.log(data.data.map((item: any) => item.name));
			return (
				<div>
					{data.liveEventsData.map((item: any) => {
						let market: any = null;
						if (this.state.data.market && item.eventId === this.state.data.market.eventId) {
							market = <Market market={data.market}/>
						}
						return (
						<>
							<div key={item.eventId} onClick={() => this.getMarket(item.markets[0])}>{item.name}</div>
							{market}
						</>
						)
	  })}

				</div>
			)
		} else
		return <div>loading</div>
	}}
