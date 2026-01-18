import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, ShoppingCart, ArrowRight } from "lucide-react";

const API_BASE = "https://nainikaessentialsdatabas.onrender.com";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
   const fetchCart = async () => {
  let user = JSON.parse(localStorage.getItem("adminUser"));
  if (!user || !user.user_id) {
    localStorage.setItem("adminUser", JSON.stringify(user));
  }

  try {
    const res = await fetch(`${API_BASE}/carts/${user.user_id}`);
    const data = await res.json();
    console.log("Raw cart data:", data);

    // Remove nulls and transform
    const items = (Array.isArray(data.items) ? data.items : [])
      .filter(item => item) // remove null
      .map(item => ({
        id: item.product_id,
        name: item.product_name,
        image: item.product_images?.[0] || "/placeholder.png",
        qty: item.quantity || 1,
        price: item.price_at_addition || 0,
        size: item.selected_size || "Free Size",
        color: item.selected_color || "",
        originalPrice: item.price_at_addition + 500 // or whatever logic
      }));

    setCart(items);

  } catch (err) {
    console.error("Fetch cart error:", err);
    alert("Failed to load cart.");
  }
};


    fetchCart();
    window.addEventListener("cartUpdated", fetchCart);
    return () => window.removeEventListener("cartUpdated", fetchCart);
  }, [navigate]);

  const removeItem = async (id) => {
    const user = JSON.parse(localStorage.getItem("adminUser"));
    try {
      await fetch(`${API_BASE}/carts/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.user_id, product_id: id }),
      });
      setCart(cart.filter(item => item.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to remove item.");
    }
  };

  const updateQty = async (id, qty) => {
    if (qty < 1) return;
    const user = JSON.parse(localStorage.getItem("adminUser"));
    try {
      await fetch(`${API_BASE}/carts/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.user_id, product_id: id, quantity: qty }),
      });
      setCart(cart.map(item => item.id === id ? { ...item, qty } : item));
    } catch (err) {
      console.error(err);
      alert("Failed to update quantity.");
    }
  };

  const validCart = cart.filter(item => item && typeof item.price === "number" && typeof item.qty === "number");
  const subtotal = validCart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const mrpTotal = validCart.reduce((acc, item) => acc + ((item.originalPrice || item.price + 500) * item.qty), 0);
  const discount = mrpTotal - subtotal;

  const handleCheckout = () => {
    if (!validCart.length) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/checkout");
  };

  if (!validCart.length) {
    return (
      <div style={{ padding: "100px 5%", textAlign: "center", fontFamily: "inherit" }}>
        <ShoppingCart size={48} color="#ccc" style={{ marginBottom: "20px" }} />
        <p style={{ fontSize: "18px", color: "#666" }}>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 5%", fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif", backgroundColor: "#fff", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "30px", color: "#1a1a1a" }}>Shopping Cart</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr", gap: "30px", alignItems: "start" }}>
        {/* Left Side: Cart Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {validCart.map(item => (
            <div key={item.id} style={{ display: "flex", gap: "20px", padding: "15px", border: "1px solid #f0f0f0", borderRadius: "12px" }}>
              <img src={item.image} alt={item.name} style={{ width: "100px", height: "130px", objectFit: "cover", borderRadius: "8px" }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <h2 style={{ fontSize: "16px", fontWeight: "500", margin: 0, color: "#333" }}>{item.name}</h2>
                  <span style={{ fontSize: "18px", fontWeight: "600" }}>₹{item.price}</span>
                </div>
                <p style={{ fontSize: "13px", color: "#999", margin: "5px 0" }}>Size Free Size</p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "15px" }}>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}>₹{item.price}</span>
                  <span style={{ fontSize: "13px", color: "#ccc", textDecoration: "line-through" }}>₹{item.originalPrice || item.price + 500}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", border: "1px solid #e0e0e0", borderRadius: "6px", alignItems: "center" }}>
                    <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ padding: "4px 12px", border: "none", background: "none", cursor: "pointer", fontSize: "18px" }}>-</button>
                    <div style={{ padding: "4px 12px", borderLeft: "1px solid #eee", borderRight: "1px solid #eee", fontSize: "14px" }}>{item.qty}</div>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ padding: "4px 12px", border: "none", background: "none", cursor: "pointer", fontSize: "18px" }}>+</button>
                  </div>
                  <button onClick={() => removeItem(item.id)} style={{ display: "flex", alignItems: "center", gap: "5px", background: "none", border: "none", color: "#dc2626", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}>
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Price Summary */}
        <div style={{ border: "1px solid #f8f8fb", borderRadius: "16px", padding: "25px", backgroundColor: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <ShoppingCart size={20} color="#5d5ad1" />
            <h3 style={{ fontSize: "18px", fontWeight: "600", margin: 0 }}>Price Summary</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px", borderBottom: "1px solid #f0f0f0", paddingBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#666" }}>
              <span>MRP Total</span><span>₹{mrpTotal}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#10b981" }}>
              <span>Discount on MRP</span><span>-₹{discount}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#666" }}>
              <span>Subtotal</span><span>₹{subtotal}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#666" }}>
              <span>Delivery</span><span style={{ color: "#10b981" }}>Free</span>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0" }}>
            <span style={{ fontSize: "16px", fontWeight: "700" }}>Total Amount</span><span style={{ fontSize: "20px", fontWeight: "700" }}>₹{subtotal}</span>
          </div>
          <button onClick={handleCheckout} style={{ width: "100%", padding: "16px", background: "#4f46e5", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "600", fontSize: "15px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "15px" }}>
            Proceed to Checkout <ArrowRight size={18} />
          </button>
          <div style={{ textAlign: "center" }}>
            <button style={{ background: "none", border: "none", color: "#5d5ad1", fontSize: "14px", fontWeight: "500", cursor: "pointer" }} onClick={() => navigate("/shop")}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
