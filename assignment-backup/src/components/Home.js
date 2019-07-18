import React, { Component } from "react";
import Websocket from "react-websocket";
import LineChart from "react-linechart";

class Home extends Component {
  state = { data: [] };
  handleData = data => {
    this.setState({ data });
    // var time = JSON.parse(this.state.data).x.time;
    var value = JSON.parse(this.state.data).x.out[0].value;
    // console.log(time, value);

    var BTCValue = value / 100000000;
    if (BTCValue > 1) {
      console.log(BTCValue);
      let validValues = [];
      validValues = [...validValues, BTCValue];
      console.log(validValues);
    }
  };

  handleOpen = () => {
    console.log("Connected!");
  };

  handleClose = () => {
    console.log("Disconnected");
  };

  sendMessage = message => {
    this.refWebSocket.sendMessage(message);
  };

  navigate = () => {
    this.props.history.push("/search-bar");
  };

  render() {
    const graphData = [
      {
        color: "steelblue",
        points: [{ x: 1, y: 2 }, { x: 2, y: 3 }]
      }
    ];
    return (
      <div>
        <button
          onClick={() =>
            this.sendMessage(JSON.stringify({ op: "unconfirmed_sub" }))
          }
        >
          Send Message
        </button>
        <button onClick={this.navigate}>Go to Search Bar</button>
        <LineChart
          data={graphData}
          xLabel="Time of the transaction in IST
            (HH:MM:SS +05:30)"
          xMin="0"
          yMin="0"
        />
        <Websocket
          url="wss://ws.blockchain.info/inv"
          onOpen={this.handleOpen}
          onClose={this.handleClose}
          onMessage={this.handleData}
          reconnect
          debug
          ref={Websocket => {
            this.refWebSocket = Websocket;
          }}
        />
      </div>
    );
  }
}

export default Home;
