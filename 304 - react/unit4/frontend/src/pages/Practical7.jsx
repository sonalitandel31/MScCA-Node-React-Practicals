import Student from "../components/Student";

function Practical7() {
    return (
        <div className="page">
            <div className="page-header">
                <span>Practical 07</span>

                <h1>
                    Component & Snapshot Testing
                </h1>

                <p>
                    React component tested using Jest and
                    React Testing Library.
                </p>
            </div>

            <Student />

            <div className="info-box">
                Run <code>npm test</code> to perform
                component and snapshot testing.
            </div>
        </div>
    );
}

export default Practical7;