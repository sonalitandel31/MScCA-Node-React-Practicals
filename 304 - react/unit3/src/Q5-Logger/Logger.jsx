import { useDispatch, useSelector } from "react-redux";

function Logger() {
    const dispatch = useDispatch();

    const count = useSelector((state) => state.count);

    return (
        <div className="container">
            <h1>Redux Logger Middleware</h1>

            <h2>Count: {count}</h2>

            <button
                onClick={() =>
                    dispatch({ type: "INCREMENT" })
                }
            >
                Increment
            </button>

            <button
                onClick={() =>
                    dispatch({ type: "DECREMENT" })
                }
            >
                Decrement
            </button>

            <button
                onClick={() =>
                    dispatch({ type: "RESET" })
                }
            >
                Reset
            </button>

            <p>
                Open the browser console to see the
                middleware logs.
            </p>
        </div>
    );
}

export default Logger;