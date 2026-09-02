import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_LAUNCHES = gql`
  query GetLaunches {
    launches {
      id
      missionName
      rocketName
      launchDate
      launchSite
      success
    }
  }
`;

function Practical4() {
    const {
        loading,
        error,
        data,
    } = useQuery(GET_LAUNCHES);

    if (loading) {
        return (
            <div className="state-message">
                <div className="loader"></div>
                <h2>Loading space launches...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-message">
                <h2>Error loading launches</h2>
                <p>{error.message}</p>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="page-header">
                <span>Practical 04</span>

                <h1>Space Launch Application</h1>

                <p>
                    Space launch information fetched using
                    Apollo Client and GraphQL.
                </p>
            </div>

            <div className="launch-grid">
                {data.launches.map((launch) => (
                    <div
                        className="launch-card"
                        key={launch.id}
                    >
                        <div className="launch-top">
                            <span className="rocket-icon">🚀</span>

                            <span
                                className={
                                    launch.success
                                        ? "status success"
                                        : "status failed"
                                }
                            >
                                {launch.success
                                    ? "Successful"
                                    : "Failed"}
                            </span>
                        </div>

                        <h2>{launch.missionName}</h2>

                        <div className="launch-details">
                            <p>
                                <strong>Rocket:</strong>{" "}
                                {launch.rocketName}
                            </p>

                            <p>
                                <strong>Date:</strong>{" "}
                                {launch.launchDate}
                            </p>

                            <p>
                                <strong>Launch Site:</strong>{" "}
                                {launch.launchSite}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Practical4;