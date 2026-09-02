function Child(props) {
  return (
    <div
      style={{
        background: "#E3F2FD",
        padding: "20px",
        borderRadius: "10px"
      }}
    >
      <h2>Name : {props.name}</h2>

      <h2>Age : {props.age}</h2>
    </div>
  );
}

export default Child;