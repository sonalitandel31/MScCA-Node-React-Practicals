const practicals = [
  {
    no: 1,
    title: "GraphQL API using Express",
    type: "Backend",
  },
  {
    no: 2,
    title: "GraphQL Queries using GraphiQL",
    type: "Backend",
  },
  {
    no: 3,
    title: "GraphQL Product Mutations",
    type: "Backend",
  },
  {
    no: 4,
    title: "Space Launch using Apollo Client",
    type: "React",
  },
  {
    no: 5,
    title: "GraphQL CRUD using Apollo Client",
    type: "React",
  },
  {
    no: 6,
    title: "Jest Redux Reducer Testing",
    type: "Testing",
  },
  {
    no: 7,
    title: "Component & Snapshot Testing",
    type: "Testing",
  },
  {
    no: 8,
    title: "Docker + Nginx Deployment",
    type: "Deployment",
  },
];

function Home() {
  return (
    <div>
      <div className="hero">
        <p className="eyebrow">
          GRAPHQL • REACT • TESTING • DOCKER
        </p>

        <h1>GraphQL & React Practicals</h1>

        <p>
          Complete practical implementation using Express,
          GraphQL, Apollo Client, Jest, Docker and Nginx.
        </p>
      </div>

      <div className="card-grid">
        {practicals.map((practical) => (
          <div
            className="practical-card"
            key={practical.no}
          >
            <div className="number">
              {String(practical.no).padStart(2, "0")}
            </div>

            <span className="tag">
              {practical.type}
            </span>

            <h3>{practical.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;