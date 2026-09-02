function Practical8() {
    return (
        <div className="page">
            <div className="page-header">
                <span>Practical 08</span>

                <h1>Docker + Nginx Deployment</h1>

                <p>
                    React production application deployed
                    using Docker and Nginx.
                </p>
            </div>

            <div className="deployment-flow">
                <div>React Source</div>
                <span>→</span>

                <div>Vite Build</div>
                <span>→</span>

                <div>Nginx</div>
                <span>→</span>

                <div>Docker Image</div>
                <span>→</span>

                <div>Container</div>
                <span>→</span>

                <div>Browser</div>
            </div>

            <div className="code-card">
                <h3>Docker Commands</h3>

                <pre>{`docker build -t react-app .

docker run -p 8080:80 react-app`}</pre>
            </div>
        </div>
    );
}

export default Practical8;