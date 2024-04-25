import React, { Component } from 'react'

import { wsEndpoint } from '../utils/config'

export class App extends Component<{}, { data: any }> {
  private w: WebSocket
  constructor(props: any) {

    super(props)
    this.w = new WebSocket(wsEndpoint)
    this.state = {
      data: {data: null}
    }
  }
	
	/* Toggle Odds
	
	export default App => {
		const [toggled, isToggled] = useState();
		...
	}

	useEffect(() => {
		...
	})

	return (
		<button onClick = () /> 
	)

	*/

  componentDidMount() {
    // a message has been recieved
    this.w.onmessage = (e: MessageEvent) => {
			this.setState({
				data:JSON.parse(e.data)				
			})
    }
    // send a request to get events
    this.w.onopen = () =>
      this.w.send(JSON.stringify({type: "getLiveEvents", primaryMarkets: true }));
  } 	
  componentWillUnmount() {
    this.w.close()
  } 

  render() {
		const { data } = this.state
		console.log(data.data);
		if (data && data.type && data.type === 'LIVE_EVENTS_DATA') {	
			// console.log(data.data.map((item: any) => item.name));
			return (
				<div>
					{JSON.stringify(data.data.map((item: any) => item.name ))}
						<div> + </div>
				</div>
				/* <div>{JSON.stringify(data.data)} */

			) 
		} else
		return <div>loading</div>
	}}
