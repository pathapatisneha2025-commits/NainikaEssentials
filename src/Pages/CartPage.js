import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, ShoppingCart, ArrowRight } from "lucide-react";

const API_BASE = "https://nainikaessentialsdatabas.onrender.com";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [isGuest, setIsGuest] = useState(false);
  const navigate = useNavigate();

  const getUserId = () => {
    const storedUser = JSON.parse(localStorage.getItem("adminUser") || "{}");
    const guest = !storedUser.user_id || !storedUser.name;
    if (guest && !storedUser.user_id) {
      storedUser.user_id = "GUEST_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("adminUser", JSON.stringify(storedUser));
    }
    setIsGuest(guest);
    return storedUser.user_id;
  };

  const fetchCart = async () => {
    const userId = getUserId();
    if (isGuest) {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(storedCart);
    } else {
      try {
        const res = await fetch(`${API_BASE}/carts/${userId}`);
        const data = await res.json();
        setCart(data.items || []);
      } catch (err) {
        console.error(err);
        setCart([]);
      }
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // --- REMOVE ITEM ---
  const removeItem = async (productId, size, color) => {
    const userId = getUserId();
    const isGuestUser = typeof userId === "string" && userId.startsWith("GUEST_");

    if (isGuestUser) {
      const newCart = cart.filter(
        item =>
          item.product_id !== productId ||
          (item.selected_size !== size && item.selected_color !== color)
      );
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      try {
        await fetch(`${API_BASE}/carts/remove/${userId}/${parseInt(productId)}`, {
          method: "DELETE",
        });
        setCart(prev => prev.filter(item => item.product_id !== productId));
      } catch (err) {
        console.error(err);
      }
    }
  };

  // --- UPDATE QUANTITY ---
  const updateQty = async (productId, newQty, size, color) => {
    if (newQty < 1) return;

    const userId = getUserId();
    const isGuestUser = typeof userId === "string" && userId.startsWith("GUEST_");

    const normalize = v => (typeof v === "object" ? v.size || v.color || "" : v);

    const cartItem = cart.find(
      item =>
        item.product_id === productId &&
        normalize(item.selected_size) === normalize(size) &&
        normalize(item.selected_color) === normalize(color)
    );

    if (!cartItem) return;

    const oldQty = cartItem.quantity || 0;
    const diff = newQty - oldQty;

    if (isGuestUser) {
      const newCart = cart.map(item =>
        item.product_id === productId &&
        normalize(item.selected_size) === normalize(size) &&
        normalize(item.selected_color) === normalize(color)
          ? { ...item, quantity: newQty }
          : item
      );
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      try {
        // Update cart quantity in backend
        await fetch(`${API_BASE}/carts/update`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            product_id: productId,
            quantity: newQty,
            selected_size: size,
            selected_color: color,
          }),
        });

        // Update stock only if needed
        if (diff > 0) {
          await fetch(`${API_BASE}/products/reduce-stock`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ product_id: productId, quantity: diff }),
          });
        } else if (diff < 0) {
          await fetch(`${API_BASE}/products/increase-stock`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ product_id: productId, quantity: -diff }),
          });
        }

        // Update local state instantly without full fetch
        setCart(prev =>
          prev.map(item =>
            item.product_id === productId &&
            normalize(item.selected_size) === normalize(size) &&
            normalize(item.selected_color) === normalize(color)
              ? { ...item, quantity: newQty }
              : item
          )
        );
      } catch (err) {
        console.error(err);
        alert("Error updating stock");
      }
    }
  };

  const validCart = cart.filter(item => item && typeof item.price_at_addition === "number" && typeof item.quantity === "number");
  const subtotal = validCart.reduce((acc, item) => acc + item.price_at_addition * item.quantity, 0);
  const mrpTotal = validCart.reduce((acc, item) => acc + ((item.originalPrice || item.price_at_addition + 500) * item.quantity), 0);
  const discount = mrpTotal - subtotal;

  const handleCheckout = () => {
    if (!validCart.length) return alert("Your cart is empty!");
    navigate("/checkout");
  };

  if (!validCart.length) {
    return (
      <div style={{ padding: "100px 5%", textAlign: "center", fontFamily: "inherit" }}>
        <ShoppingCart size={48} color="#ccc" style={{ marginBottom: "20px" }} />
        <p style={{ fontSize: "18px", color: "#666" }}>
          {isGuest ? "Your cart is empty" : "Please login to view your cart"}
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px 5%", fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif", backgroundColor: "#fff", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "20px", color: "#1a1a1a" }}>Shopping Cart</h1>

      <div className="cart-grid">
        <div className="cart-items">
          {validCart.map(item => {
            const sizeText = typeof item.selected_size === "object" ? item.selected_size.size : item.selected_size;
            const colorText = typeof item.selected_color === "object" ? item.selected_color.color : item.selected_color;
            const imageSrc = Array.isArray(item.product_images) ? item.product_images[0] : "/placeholder.png";

            return (
              <div key={`${item.product_id}_${sizeText}_${colorText}`} className="cart-item">
                <img src={imageSrc} alt={item.product_name} className="cart-img" />
                <div className="cart-info">
                  <div className="cart-header">
                    <h2>{item.product_name}</h2>
                    <span>₹{item.price_at_addition}</span>
                  </div>
                  <p>Size {sizeText} / Color {colorText}</p>
                  <div className="price-row">
                    <span>₹{item.price_at_addition}</span>
                    <span className="mrp">₹{item.originalPrice || item.price_at_addition + 500}</span>
                  </div>
                  <div className="qty-row">
                    <div className="qty-controls">
                      <button onClick={() => updateQty(item.product_id, item.quantity - 1, item.selected_size, item.selected_color)}>-</button>
                      <div>{item.quantity}</div>
                      <button onClick={() => updateQty(item.product_id, item.quantity + 1, item.selected_size, item.selected_color)}>+</button>
                    </div>
                    <button className="remove-btn" onClick={() => removeItem(item.product_id, item.selected_size, item.selected_color)}>
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="cart-summary">
          <div className="summary-header">
            <ShoppingCart size={20} color="#5d5ad1" />
            <h3>Price Summary</h3>
          </div>
          <div className="summary-details">
            <div><span>MRP Total</span><span>₹{mrpTotal}</span></div>
            {/* <div className="discount"><span>Discount on MRP</span><span>-₹{discount}</span></div> */}
            <div className="total"><span>Total</span><span>₹{subtotal}</span></div>
            <div><span>Delivery</span><span>Free</span></div>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout <ArrowRight size={18} />
          </button>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <button className="continue-btn" onClick={() => navigate("/shop")}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    

      {/* --- Responsive CSS --- */}
      <style>{`
        .cart-grid { display: grid; grid-template-columns: 1.8fr 1fr; gap: 20px; }
        .cart-items { display: flex; flex-direction: column; gap: 15px; }
        .cart-item { display: flex; flex-direction: row; gap: 15px; padding: 10px; border: 1px solid #f0f0f0; border-radius: 10px; align-items: center; flex-wrap: wrap; }
        .cart-img { width: 100px; height: 130px; object-fit: cover; border-radius: 8px; flex-shrink: 0; }
        .cart-info { flex: 1; min-width: 150px; }
        .cart-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; }
        .cart-header h2 { font-size: 16px; font-weight: 500; margin: 0; color: #333; }
        .cart-header span { font-size: 16px; font-weight: 600; margin-top: 5px; }
        .price-row { display: flex; gap: 10px; margin-bottom: 10px; }
        .price-row .mrp { text-decoration: line-through; color: #ccc; font-size: 13px; }
        .qty-row { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
        .qty-controls { display: flex; border: 1px solid #e0e0e0; border-radius: 6px; align-items: center; }
        .qty-controls button { padding: 4px 10px; border: none; background: none; cursor: pointer; font-size: 16px; }
        .qty-controls div { padding: 4px 12px; border-left: 1px solid #eee; border-right: 1px solid #eee; font-size: 14px; }
        .remove-btn { display: flex; align-items: center; gap: 5px; background: none; border: none; color: #dc2626; font-size: 13px; cursor: pointer; font-weight: 500; }
        .cart-summary { border: 1px solid #f8f8fb; border-radius: 16px; padding: 20px; background-color: #fff; box-shadow: 0 2px 10px rgba(0,0,0,0.02); min-width: 250px; }
        .summary-header { display: flex; align-items: center; gap: 10px; margin-bottom: 15px; }
        .summary-header h3 { font-size: 18px; font-weight: 600; margin: 0; }
        .summary-details { display: flex; flex-direction: column; gap: 12px; border-bottom: 1px solid #f0f0f0; padding-bottom: 15px; font-size: 14px; color: #666; }
        .summary-details .discount { color: #10b981; }
        .summary-details .total { font-weight: 700; font-size: 16px; }
        .checkout-btn { width: 100%; padding: 14px; background: #4f46e5; color: #fff; border: none; border-radius: 10px; font-weight: 600; font-size: 15px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 15px; }
        .continue-btn { background: none; border: none; color: #5d5ad1; font-size: 14px; font-weight: 500; cursor: pointer; }
        @media (max-width: 768px) { .cart-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
