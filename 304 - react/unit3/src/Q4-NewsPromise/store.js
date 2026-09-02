import { createStore, applyMiddleware } from "redux";
import newsReducer from "./newsReducer";
import promiseMiddleware from "./promiseMiddleware";

const store = createStore(
    newsReducer,
    applyMiddleware(promiseMiddleware)
);

export default store;