import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchProducts,
} from "./productSlice";

import {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
} from "./cartSlice";

function ShoppingCart() {
    const dispatch = useDispatch();

    const {
        products,
        loading,
        error,
    } = useSelector((state) => state.products);

    const cartItems = useSelector(
        (state) => state.cart.items
    );

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const totalPrice = cartItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    return (
        <div className="container">
            <h1>Product List & Shopping Cart</h1>

            {loading && (
                <p className="loading">
                    Loading products...
                </p>
            )}

            {error && (
                <p className="error">
                    Error: {error}
                </p>
            )}

            {!loading && !error && (
                <>
                    <h2>Products</h2>

                    <div className="list">
                        {products.map((product) => (
                            <div
                                className="card"
                                key={product.id}
                            >
                                <h3>{product.title}</h3>

                                <p>
                                    Price: ₹{product.price}
                                </p>

                                <button
                                    onClick={() =>
                                        dispatch(addToCart(product))
                                    }
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>

                    <hr />

                    <h2>Shopping Cart</h2>

                    {cartItems.length === 0 ? (
                        <p>Cart is empty.</p>
                    ) : (
                        <div className="list">
                            {cartItems.map((item) => (
                                <div
                                    className="card"
                                    key={item.id}
                                >
                                    <h3>{item.title}</h3>

                                    <p>
                                        Price: ₹{item.price}
                                    </p>

                                    <p>
                                        Quantity: {item.quantity}
                                    </p>

                                    <button
                                        onClick={() =>
                                            dispatch(
                                                decreaseQuantity(item.id)
                                            )
                                        }
                                    >
                                        -
                                    </button>

                                    <button
                                        onClick={() =>
                                            dispatch(
                                                increaseQuantity(item.id)
                                            )
                                        }
                                    >
                                        +
                                    </button>

                                    <button
                                        className="delete"
                                        onClick={() =>
                                            dispatch(
                                                removeFromCart(item.id)
                                            )
                                        }
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <h2>
                        Total: ₹{totalPrice.toFixed(2)}
                    </h2>
                </>
            )}
        </div>
    );
}

export default ShoppingCart;