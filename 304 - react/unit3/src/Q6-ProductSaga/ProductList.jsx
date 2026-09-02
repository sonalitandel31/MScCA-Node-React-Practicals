import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchProducts,
} from "./productSlice";

function ProductList() {
    const dispatch = useDispatch();

    const { products, loading, error } = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div className="container">
            <h1>Product List - Redux Saga</h1>

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
                <div className="list">
                    {products.map((product) => (
                        <div className="card" key={product.id}>
                            <h3>{product.title}</h3>

                            <p>
                                Price: ₹{product.price}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductList;