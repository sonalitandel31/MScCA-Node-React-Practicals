import React, { Component } from "react";

class Counter extends Component {

  constructor() {

    super();

    this.state = {
      count: 0
    };

  }

  componentDidMount() {

    console.log("Component Mounted");

  }

  componentDidUpdate() {

    console.log("Component Updated");

  }

  increase = () => {

    this.setState({
      count: this.state.count + 1
    });

  };

  render() {

    return (

      <div
        style={{
          textAlign: "center",
          marginTop: "50px"
        }}
      >

        <h1>Question 3</h1>

        <h2>Counter : {this.state.count}</h2>

        <button
          onClick={this.increase}
        >
          Increase Counter
        </button>

      </div>

    );

  }

}

export default Counter;