import React, { Component } from "react";

class Main extends Component {
  render() {
    return (
      <main
        style={{
          backgroundColor: "#f4f4f4",
          padding: "40px",
          textAlign: "center",
          minHeight: "300px"
        }}
      >
        <h2>Main Component</h2>

        <p>
          This is a Single Page Application using React.
        </p>

        <p>
          Functional and Class Components are rendered using JSX.
        </p>
      </main>
    );
  }
}

export default Main;