import { useState } from "react";
import Child from "./Child";

function Parent() {

  const [age, setAge] = useState(21);

  return (

    <div
      style={{
        textAlign: "center",
        marginTop: "50px"
      }}
    >

      <h1>Question 2</h1>

      <Child
        name="Sonali"
        age={age}
      />

      <br />

      <button
        onClick={() => setAge(age + 1)}
        style={{
          padding: "10px 20px",
          background: "green",
          color: "white",
          border: "none"
        }}
      >
        Increase Age
      </button>

    </div>

  );
}

export default Parent;