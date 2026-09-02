import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import productReducer from "./productSlice";
import productSaga from "./productSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        products: productReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: false,
        }).concat(sagaMiddleware),
});

sagaMiddleware.run(productSaga);

export default store;