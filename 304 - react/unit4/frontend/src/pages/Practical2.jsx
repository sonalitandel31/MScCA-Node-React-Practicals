function Practical2() {
    return (
        <div className="page">
            <div className="page-header">
                <span>Practical 02</span>

                <h1>Execute GraphQL Queries using GraphiQL</h1>

                <p>
                    Retrieve all students or an individual
                    student using GraphQL queries.
                </p>
            </div>

            <div className="two-column">
                <div className="code-card">
                    <h3>All Students</h3>

                    <pre>{`{
  students {
    id
    name
    course
    semester
  }
}`}</pre>
                </div>

                <div className="code-card">
                    <h3>Student by ID</h3>

                    <pre>{`{
  student(id: "1") {
    name
    course
  }
}`}</pre>
                </div>
            </div>

            <div className="info-box">
                GraphQL allows the client to request only
                the fields it requires.
            </div>
        </div>
    );
}

export default Practical2;