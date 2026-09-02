import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",

    initialState: {
        products: [],
        loading: false,
        error: null,
    },

    reducers: {
        searchProducts: (state) => {
            state.loading = true;
            state.error = null;
            state.products = [];
        },

        searchProductsSuccess: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },

        searchProductsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    searchProducts,
    searchProductsSuccess,
    searchProductsFailure,
} = searchSlice.actions;

export default searchSlice.reducer;