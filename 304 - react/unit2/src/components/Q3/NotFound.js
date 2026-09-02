function NotFound() {
  return (
    <div className="container">
      <h1 style={{ color: "red" }}>404</h1>

      <div className="card">
        <h2>Page Not Found</h2>
        <p>The page you requested does not exist.</p>
      </div>
    </div>
  );
}

export default NotFound;