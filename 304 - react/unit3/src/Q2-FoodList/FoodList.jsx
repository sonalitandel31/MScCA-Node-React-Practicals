import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFood, removeFood } from "./foodSlice";

function FoodList() {
    const foods = useSelector((state) => state.food.foods);
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");

    const handleAdd = () => {
        if (!name || !category || !price) return;

        dispatch(
            addFood({
                id: Date.now(),
                name,
                category,
                price: Number(price),
            })
        );

        setName("");
        setCategory("");
        setPrice("");
    };

    return (
        <div className="container">
            <h1>Food Items List</h1>

            <div className="form">
                <input
                    placeholder="Food Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <button onClick={handleAdd}>Add Food</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {foods.map((food) => (
                        <tr key={food.id}>
                            <td>{food.name}</td>
                            <td>{food.category}</td>
                            <td>₹{food.price}</td>
                            <td>
                                <button
                                    className="delete"
                                    onClick={() => dispatch(removeFood(food.id))}
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FoodList;