import { useState } from "react";

function FormValidation() {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

  function submit(e) {

    e.preventDefault();

    if (name === "" || email === "") {

      setError("All fields are required");

    }

    else {

      setError("");

      alert("Form Submitted Successfully");

    }

  }

  return (

    <div
      style={{
        width: "400px",
        margin: "50px auto"
      }}
    >

      <h1>Question 4</h1>

      <form onSubmit={submit}>

        <input

          type="text"

          placeholder="Enter Name"

          value={name}

          onChange={(e) => setName(e.target.value)}

          style={{
            width: "100%",
            padding: "10px"
          }}

        />

        <br /><br />

        <input

          type="email"

          placeholder="Enter Email"

          value={email}

          onChange={(e) => setEmail(e.target.value)}

          style={{
            width: "100%",
            padding: "10px"
          }}

        />

        <br /><br />

        {

          error &&

          <p
            style={{
              color: "red"
            }}
          >
            {error}
          </p>

        }

        <button>

          Submit

        </button>

      </form>

    </div>

  );

}

export default FormValidation;