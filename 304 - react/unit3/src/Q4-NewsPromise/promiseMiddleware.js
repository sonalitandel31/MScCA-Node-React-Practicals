const promiseMiddleware = (store) => (next) => (action) => {
    if (!action.payload || !(action.payload instanceof Promise)) {
        return next(action);
    }

    store.dispatch({
        type: `${action.type}_REQUEST`,
    });

    return action.payload
        .then((data) => {
            store.dispatch({
                type: `${action.type}_SUCCESS`,
                payload: data,
            });
        })
        .catch((error) => {
            store.dispatch({
                type: `${action.type}_FAILURE`,
                payload: error.message,
            });
        });
};

export default promiseMiddleware;