import { useEffect, useState } from "react";
import api from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load products");
    }
  };

  const addToCart = async (product) => {
    try {
      await api.post("/cart", {
        userId: 1,
        productId: product.id,
        quantity: 1,
      });

      alert("Added to cart!");
      window.location.href = "/cart";
    } catch (error) {
      console.log(error);
      alert("Add to cart failed");
    }
  };

  return (
    <div
      style={{
        background: "#f3f4f6",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <h1 style={{ marginBottom: "30px" }}>Our Products</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "16px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />

            <h2>{product.name}</h2>
            <p>{product.category}</p>
            <h3>₹{product.price}</h3>

            <button
              onClick={() => addToCart(product)}
              style={{
                width: "100%",
                padding: "12px",
                background: "black",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;