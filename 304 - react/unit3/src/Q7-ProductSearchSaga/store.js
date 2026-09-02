import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import searchReducer from "./searchSlice";
import searchSaga from "./searchSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        search: searchReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: false,
        }).concat(sagaMiddleware),
});

sagaMiddleware.run(searchSaga);

export default store;