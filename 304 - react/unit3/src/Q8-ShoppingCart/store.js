import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import cartSaga from "./cartSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: false,
        }).concat(sagaMiddleware),
});

sagaMiddleware.run(cartSaga);

export default store;