import { useReducer } from "react";

import counterReducer, {
    DECREMENT,
    INCREMENT,
    RESET,
} from "../redux/counterReducer";

function Practical6() {
    const [state, dispatch] = useReducer(
        counterReducer,
        {
            count: 0,
        }
    );

    return (
        <div className="page">
            <div className="page-header">
                <span>Practical 06</span>

                <h1>Redux Reducer Testing</h1>

                <p>
                    Counter reducer tested using Jest for
                    initial state, increment, decrement and
                    reset operations.
                </p>
            </div>

            <div className="counter-card">
                <p>Current Counter</p>

                <div className="counter-number">
                    {state.count}
                </div>

                <div className="counter-buttons">
                    <button
                        onClick={() =>
                            dispatch({
                                type: DECREMENT,
                            })
                        }
                    >
                        −
                    </button>

                    <button
                        onClick={() =>
                            dispatch({
                                type: RESET,
                            })
                        }
                    >
                        Reset
                    </button>

                    <button
                        onClick={() =>
                            dispatch({
                                type: INCREMENT,
                            })
                        }
                    >
                        +
                    </button>
                </div>
            </div>

            <div className="info-box">
                Run <code>npm test</code> to execute the
                Jest reducer tests.
            </div>
        </div>
    );
}

export default Practical6;