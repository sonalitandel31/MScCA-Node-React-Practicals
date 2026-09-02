import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "./searchSlice";

function ProductSearch() {
    const [searchTerm, setSearchTerm] = useState("");

    const dispatch = useDispatch();

    const { products, loading, error } = useSelector(
        (state) => state.search
    );

    const handleSearch = () => {
        if (!searchTerm.trim()) {
            return;
        }

        dispatch(searchProducts(searchTerm));
    };

    return (
        <div className="container">
            <h1>Product Search - Redux Saga</h1>

            <div className="form">
                <input
                    type="text"
                    placeholder="Enter product name"
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(e.target.value)
                    }
                />

                <button onClick={handleSearch}>
                    Search
                </button>
            </div>

            {loading && (
                <p className="loading">
                    Searching products...
                </p>
            )}

            {error && (
                <p className="error">
                    Error: {error}
                </p>
            )}

            {!loading && !error && products.length === 0 && (
                <p>
                    No products found.
                </p>
            )}

            {!loading && !error && products.length > 0 && (
                <div className="list">
                    {products.map((product) => (
                        <div className="card" key={product.id}>
                            <h3>{product.title}</h3>

                            <p>
                                Price: ₹{product.price}
                            </p>

                            <p>
                                Category: {product.category}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductSearch;