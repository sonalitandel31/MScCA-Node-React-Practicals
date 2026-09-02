import { configureStore } from "@reduxjs/toolkit";
import foodReducer from "./foodSlice";

const store = configureStore({
    reducer: {
        foodAsync: foodReducer,
    },
});

export default store;