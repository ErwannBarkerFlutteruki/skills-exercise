import React, { Component } from 'react'

//END POINT URL NEEDS SETTING IN CONFIG
import { wsEndpoint } from '../utils/config'

export class App extends Component<{}, { data: any }> {
  private w: WebSocket
  constructor(props: any) {

    super(props)
    this.w = new WebSocket(wsEndpoint)
    this.state = {
      data: null
    }
  }
  componentDidMount() {
    // a messgae has been recieved
    this.w.onmessage = (e: MessageEvent) => {
      console.log(e);
    }
    // send a request to get events
    this.w.onopen = () =>
      this.w.send(`Check the instructions to see what needs passing here`);
  }
  componentWillUnmount() {
    this.w.close()
  }

  render() {
    const { data } = this.state

    return (
      <div>Hello Worsld</div>
    )
  }
}