import { createSlice } from "@reduxjs/toolkit";

const foodSlice = createSlice({
    name: "food",

    initialState: {
        foods: [
            { id: 1, name: "Pizza", category: "Fast Food", price: 250 },
            { id: 2, name: "Burger", category: "Fast Food", price: 180 },
            { id: 3, name: "Pasta", category: "Italian", price: 220 },
        ],
    },

    reducers: {
        addFood: (state, action) => {
            state.foods.push(action.payload);
        },

        removeFood: (state, action) => {
            state.foods = state.foods.filter(
                (food) => food.id !== action.payload
            );
        },
    },
});

export const { addFood, removeFood } = foodSlice.actions;
export default foodSlice.reducer;