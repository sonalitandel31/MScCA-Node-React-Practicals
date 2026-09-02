import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchFoodRequest,
    fetchFoodSuccess,
    fetchFoodFailure,
} from "./foodSlice";

function FoodAsync() {
    const dispatch = useDispatch();

    const { foods, loading, error } = useSelector(
        (state) => state.foodAsync
    );

    useEffect(() => {
        dispatch(fetchFoodRequest());

        setTimeout(() => {
            const foodData = [
                {
                    id: 1,
                    name: "Pizza",
                    category: "Fast Food",
                    price: 250,
                },
                {
                    id: 2,
                    name: "Burger",
                    category: "Fast Food",
                    price: 180,
                },
                {
                    id: 3,
                    name: "Pasta",
                    category: "Italian",
                    price: 220,
                },
                {
                    id: 4,
                    name: "Sandwich",
                    category: "Snacks",
                    price: 120,
                },
            ];

            try {
                dispatch(fetchFoodSuccess(foodData));
            } catch (err) {
                dispatch(fetchFoodFailure("Failed to fetch food items"));
            }
        }, 1500);
    }, [dispatch]);

    return (
        <div className="container">
            <h1>Food Items - Async Redux</h1>

            {loading && (
                <p className="loading">
                    Loading food items...
                </p>
            )}

            {error && (
                <p className="error">
                    Error: {error}
                </p>
            )}

            {!loading && !error && (
                <table>
                    <thead>
                        <tr>
                            <th>Food Name</th>
                            <th>Category</th>
                            <th>Price</th>
                        </tr>
                    </thead>

                    <tbody>
                        {foods.map((food) => (
                            <tr key={food.id}>
                                <td>{food.name}</td>
                                <td>{food.category}</td>
                                <td>₹{food.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default FoodAsync;