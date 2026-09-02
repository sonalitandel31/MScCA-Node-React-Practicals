function Practical1() {
    return (
        <div className="page">
            <div className="page-header">
                <span>Practical 01</span>
                <h1>GraphQL API using Express</h1>

                <p>
                    Basic GraphQL API for retrieving book
                    information.
                </p>
            </div>

            <div className="info-box">
                <h3>GraphQL Endpoint</h3>

                <code>
                    http://localhost:5000/graphql
                </code>
            </div>

            <div className="code-card">
                <h3>Books Query</h3>

                <pre>{`{
  books {
    id
    title
    author
    price
  }
}`}</pre>
            </div>

            <div className="flow">
                <span>Express</span>
                <b>→</b>
                <span>GraphQL</span>
                <b>→</b>
                <span>Schema</span>
                <b>→</b>
                <span>Query</span>
                <b>→</b>
                <span>Resolver</span>
                <b>→</b>
                <span>Book Data</span>
            </div>
        </div>
    );
}

export default Practical1;