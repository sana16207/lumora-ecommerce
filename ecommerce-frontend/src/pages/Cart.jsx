import { useEffect, useState } from "react";
import api from "../services/api";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await api.get("/cart/1");
      console.log("Cart data:", response.data);
      setCartItems(response.data);
    } catch (error) {
      console.log("Cart error:", error.response?.data || error.message);
      alert("Failed to load cart");
    }
  };

  const checkout = async () => {
    alert("Demo checkout successful!");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        padding: "30px",
      }}
    >
      <h1>My Cart</h1>

      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.id}
            style={{
              background: "white",
              padding: "20px",
              marginTop: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h2>Product ID: {item.productId}</h2>
            <p>Quantity: {item.quantity}</p>
            <h3>User ID: {item.userId}</h3>
          </div>
        ))
      )}

      <button
        onClick={checkout}
        style={{
          marginTop: "30px",
          padding: "15px 30px",
          background: "black",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Checkout
      </button>
    </div>
  );
}

export default Cart;