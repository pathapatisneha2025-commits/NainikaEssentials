import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, ShoppingCart, ArrowRight } from "lucide-react";

const API_BASE = "https://nainikaessentialsdatabas.onrender.com";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noUser, setNoUser] = useState(false);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  // --- Get logged-in user ID ---
  const getUserId = () => {
    const storedUser = JSON.parse(localStorage.getItem("adminUser") || "{}");

    if (!storedUser.user_id) {
      setNoUser(true);
      return null;
    }

    return storedUser.user_id;
  };

  // --- Fetch cart for logged-in user ---
  const fetchCart = async () => {
    const id = getUserId();
    if (!id) {
      setCart([]);
      setLoading(false);
      return;
    }
    setUserId(id);

    try {
      const res = await fetch(`${API_BASE}/carts/${id}`);
      const data = await res.json();
      setCart(data.items || []);
    } catch (err) {
      console.error(err);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
    const handleCartUpdate = () => fetchCart();
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  // --- Remove item ---
  const removeItem = (productId) => {
    if (!userId) return;

    fetch(`${API_BASE}/carts/remove/${userId}/${parseInt(productId)}`, { method: "DELETE" })
      .then(() => fetchCart())
      .catch(err => console.error(err));
  };

  // --- Update quantity ---
  const updateQty = (productId, newQty) => {
    if (newQty < 1 || !userId) return;

    fetch(`${API_BASE}/carts/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, product_id: productId, quantity: newQty })
    })
      .then(() => fetchCart())
      .catch(err => console.error(err));
  };

  const validCart = cart.filter(item => item && typeof item.price_at_addition === "number");
  const subtotal = validCart.reduce((acc, item) => acc + item.price_at_addition * item.quantity, 0);

  const handleCheckout = () => {
    if (!validCart.length) return alert("Your cart is empty!");
    navigate("/checkout");
  };

  if (loading) return <p style={{ padding: 40 }}>Loading cart...</p>;

  // --- Show login message if no user ---
  if (noUser) {
    return (
      <div style={{ padding: "100px 5%", textAlign: "center" }}>
        <ShoppingCart size={48} color="#ccc" style={{ marginBottom: "20px" }} />
        <p style={{ fontSize: "18px", color: "#666" }}>Please login to see your cart</p>
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: 10,
            borderRadius: 6,
            background: "#4f46e5",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </div>
    );
  }

  // --- Empty cart message ---
  if (!validCart.length) {
    return (
      <div style={{ padding: "100px 5%", textAlign: "center" }}>
        <ShoppingCart size={48} color="#ccc" style={{ marginBottom: "20px" }} />
        <p style={{ fontSize: "18px", color: "#666" }}>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px 5%", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: 20 }}>Shopping Cart</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          {validCart.map(item => (
            <div
              key={item.product_id}
              style={{
                display: "flex",
                gap: 15,
                padding: 10,
                border: "1px solid #f0f0f0",
                borderRadius: 10,
                flexWrap: "wrap",
              }}
            >
              <img
                src={Array.isArray(item.product_images) ? item.product_images[0] : "/placeholder.png"}
                alt={item.product_name}
                style={{ width: 100, height: 130, objectFit: "cover", borderRadius: 8 }}
              />
              <div style={{ flex: 1, minWidth: 150 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                  }}
                >
                  <h2 style={{ margin: 0, fontSize: 16, fontWeight: 500 }}>{item.product_name}</h2>
                  <span style={{ fontSize: 16, fontWeight: 600 }}>₹{item.price_at_addition}</span>
                </div>
                <p>Size {item.selected_size} / Color {item.selected_color}</p>
                <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <div
                    style={{
                      display: "flex",
                      border: "1px solid #e0e0e0",
                      borderRadius: 6,
                      alignItems: "center",
                    }}
                  >
                    <button
                      onClick={() => updateQty(item.product_id, item.quantity - 1)}
                      style={{ padding: "4px 10px", border: "none", background: "none", cursor: "pointer" }}
                    >
                      -
                    </button>
                    <div style={{ padding: "4px 12px", borderLeft: "1px solid #eee", borderRight: "1px solid #eee" }}>
                      {item.quantity}
                    </div>
                    <button
                      onClick={() => updateQty(item.product_id, item.quantity + 1)}
                      style={{ padding: "4px 10px", border: "none", background: "none", cursor: "pointer" }}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.product_id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      background: "none",
                      border: "none",
                      color: "#dc2626",
                      cursor: "pointer",
                      fontWeight: 500,
                    }}
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            border: "1px solid #f8f8fb",
            borderRadius: 16,
            padding: 20,
            boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 15 }}>
            <ShoppingCart size={20} color="#5d5ad1" />
            <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Price Summary</h3>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              borderBottom: "1px solid #f0f0f0",
              paddingBottom: 15,
              fontSize: 14,
              color: "#666",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Delivery</span>
              <span>Free</span>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            style={{
              width: "100%",
              padding: 14,
              background: "#4f46e5",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer",
              marginTop: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            Proceed to Checkout <ArrowRight size={18} />
          </button>
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <button
              onClick={() => navigate("/shop")}
              style={{ background: "none", border: "none", color: "#5d5ad1", fontSize: 14, fontWeight: 500, cursor: "pointer" }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
