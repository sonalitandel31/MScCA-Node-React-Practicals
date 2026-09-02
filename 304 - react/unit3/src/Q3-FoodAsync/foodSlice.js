import { createSlice } from "@reduxjs/toolkit";

const foodSlice = createSlice({
    name: "foodAsync",

    initialState: {
        foods: [],
        loading: false,
        error: null,
    },

    reducers: {
        fetchFoodRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        fetchFoodSuccess: (state, action) => {
            state.loading = false;
            state.foods = action.payload;
        },

        fetchFoodFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchFoodRequest,
    fetchFoodSuccess,
    fetchFoodFailure,
} = foodSlice.actions;

export default foodSlice.reducer;