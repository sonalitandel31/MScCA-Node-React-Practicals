const loggerMiddleware = (store) => (next) => (action) => {
    console.log("Previous State:", store.getState());
    console.log("Action:", action);
    const result = next(action);
    console.log("Next State:", store.getState());
    console.log("----------------");
    return result;
};

export default loggerMiddleware;