import { useParams } from "react-router-dom";

function User() {
  const { id } = useParams();

  return (
    <div className="container">
      <h1>👤 User Profile</h1>

      <div className="card">
        <h2>User ID : {id}</h2>
      </div>
    </div>
  );
}

export default User;