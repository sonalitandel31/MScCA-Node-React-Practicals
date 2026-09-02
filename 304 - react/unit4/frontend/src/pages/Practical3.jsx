function Practical3() {
    return (
        <div className="page">
            <div className="page-header">
                <span>Practical 03</span>

                <h1>GraphQL Product Mutations</h1>

                <p>
                    Product API supporting queries, add,
                    update and delete mutations.
                </p>
            </div>

            <div className="card-grid">
                <div className="code-card">
                    <h3>Get Products</h3>

                    <pre>{`{
  products {
    id
    name
    price
  }
}`}</pre>
                </div>

                <div className="code-card">
                    <h3>Add Product</h3>

                    <pre>{`mutation {
  addProduct(
    name: "Monitor"
    price: 12000
  ) {
    id
    name
    price
  }
}`}</pre>
                </div>

                <div className="code-card">
                    <h3>Delete Product</h3>

                    <pre>{`mutation {
  deleteProduct(id: "2")
}`}</pre>
                </div>
            </div>
        </div>
    );
}

export default Practical3;