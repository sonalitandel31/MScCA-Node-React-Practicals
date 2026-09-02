import { useState } from "react";
import { gql } from "@apollo/client";
import {
    useMutation,
    useQuery,
} from "@apollo/client/react";

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
    }
  }
`;

const ADD_PRODUCT = gql`
  mutation AddProduct(
    $name: String!
    $price: Float!
  ) {
    addProduct(
      name: $name
      price: $price
    ) {
      id
      name
      price
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

function Practical5() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const {
        loading,
        error,
        data,
        refetch,
    } = useQuery(GET_PRODUCTS);

    const [addProduct, { loading: adding }] =
        useMutation(ADD_PRODUCT);

    const [deleteProduct] =
        useMutation(DELETE_PRODUCT);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name.trim() || !price) {
            return;
        }

        await addProduct({
            variables: {
                name: name.trim(),
                price: Number(price),
            },
        });

        setName("");
        setPrice("");

        await refetch();
    };

    const handleDelete = async (id) => {
        await deleteProduct({
            variables: {
                id,
            },
        });

        await refetch();
    };

    if (loading) {
        return (
            <div className="state-message">
                <h2>Loading products...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-message">
                <h2>Error</h2>
                <p>{error.message}</p>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="page-header">
                <span>Practical 05</span>
                <h1>Product Management</h1>
                <p>
                    GraphQL CRUD application using React and
                    Apollo Client.
                </p>
            </div>
            <div className="product-layout">
                <div className="form-card">
                    <h2>Add Product</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Product Name</label>
                        <input
                            type="text"
                            placeholder="Enter product name"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                        />
                        <label>Price</label>
                        <input
                            type="number"
                            placeholder="Enter price"
                            value={price}
                            min="0"
                            step="0.01"
                            onChange={(event) =>
                                setPrice(event.target.value)
                            }
                        />
                        <button
                            className="primary-btn"
                            disabled={adding}
                            type="submit"
                        >
                            {adding
                                ? "Adding..."
                                : "+ Add Product"}
                        </button>
                    </form>
                </div>

                <div className="products-section">
                    <div className="section-title">
                        <h2>Products</h2>

                        <span>
                            {data.products.length} products
                        </span>
                    </div>

                    <div className="product-grid">
                        {data.products.map((product) => (
                            <div
                                className="product-card"
                                key={product.id}
                            >
                                <div className="product-icon">
                                    📦
                                </div>

                                <div>
                                    <h3>{product.name}</h3>

                                    <p>
                                        ₹
                                        {product.price.toLocaleString(
                                            "en-IN"
                                        )}
                                    </p>
                                </div>

                                <button
                                    className="delete-btn"
                                    onClick={() =>
                                        handleDelete(product.id)
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Practical5;