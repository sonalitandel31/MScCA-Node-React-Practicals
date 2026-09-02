import { useState } from "react";

function ColorChanger() {

  const [color, setColor] = useState("#0d6efd");
  function changeColor() {
    if (color === "#0d6efd") {
      setColor("#198754");
    }
    else {
      setColor("#0d6efd");
    }
  }

  return (
    <div
      style={{
        backgroundColor: color,
        height: "100vh",
        textAlign: "center",
        color: "white",
        paddingTop: "100px",
        transition: "0.5s"
      }}
    >
      <h1>Question 5</h1>
      <h2>Dynamic UI using React State</h2>
      <button
        onClick={changeColor}
        style={{
          padding: "12px 25px",
          border: "none",
          cursor: "pointer",
          fontSize: "18px"
        }}
      >
        Change Background
      </button>
    </div>
  );
}

export default ColorChanger;