import React, { useState, useEffect } from "react";
import { ChevronDown, ShieldCheck } from "lucide-react";

const API = "https://nainikaessentialsdatabas.onrender.com"; // 🔴 CHANGE THIS

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    phone: "",
    pincode: "",
  });

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  const subtotal = cart.reduce((a, i) => a + i.price * i.qty, 0);
  const mrpTotal = cart.reduce(
    (a, i) => a + (i.originalPrice || i.price + 500) * i.qty,
    0
  );
  const discount = mrpTotal - subtotal;
  const shipping = 99;
  const tax = +(subtotal * 0.05).toFixed(2);
  const totalAmount = subtotal + shipping + tax;

  const placeOrder = async () => {
    if (!address.name || !address.phone || !address.pincode) {
      alert("Please fill delivery address");
      return;
    }

    const payload = {
      user_id: 1, // 🔴 replace with logged-in user
      items: cart,
      total_amount: totalAmount,
      shipping_address: address,
      payment_method: paymentMethod,
    };

    try {
      const res = await fetch(`${API}/orders/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed");

      alert("Order placed successfully 🎉");
      localStorage.removeItem("cart");
    } catch (err) {
      alert("Order failed");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.grid}>
        {/* LEFT */}
        <div>
          <div style={styles.card}>
            <h2>Delivery Address</h2>
            <p style={styles.subText}>Please enter your shipping details</p>

            <div style={styles.formGrid}>
              <input style={styles.input} placeholder="Full Name" onChange={(e) => setAddress({ ...address, name: e.target.value })} />
              <input style={styles.input} placeholder="Street Address" onChange={(e) => setAddress({ ...address, street: e.target.value })} />
              <input style={styles.input} placeholder="City" onChange={(e) => setAddress({ ...address, city: e.target.value })} />
              <input style={styles.input} placeholder="State" onChange={(e) => setAddress({ ...address, state: e.target.value })} />
              <input style={styles.input} placeholder="Phone Number" onChange={(e) => setAddress({ ...address, phone: e.target.value })} />
              <input style={styles.input} placeholder="Pincode" onChange={(e) => setAddress({ ...address, pincode: e.target.value })} />
            </div>
          </div>

          <div style={styles.card}>
            <h2>Payment Method</h2>

            <label style={styles.payment(paymentMethod === "cod")}>
              <input type="radio" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
              Cash on Delivery
            </label>

            <label style={styles.payment(paymentMethod === "online")}>
              <input type="radio" checked={paymentMethod === "online"} onChange={() => setPaymentMethod("online")} />
              Online Payment (Razorpay)
            </label>
          </div>
        </div>

        {/* RIGHT */}
        <div style={styles.sticky}>
          <div style={styles.card}>
            <h3>Order Summary</h3>

            {cart.map((item) => (
              <div key={item.id} style={styles.item}>
                <img src={item.image} alt="" style={styles.image} />
                <div style={{ flex: 1 }}>
                  <div>{item.name}</div>
                  <small>Qty: {item.qty}</small>
                </div>
                <b>₹{item.price}</b>
              </div>
            ))}

            <div style={styles.priceRow}><span>MRP</span><span>₹{mrpTotal}</span></div>
            <div style={{ ...styles.priceRow, color: "#10b981" }}><span>Discount</span><span>-₹{discount}</span></div>
            <div style={styles.priceRow}><span>Shipping</span><span>₹{shipping}</span></div>
            <div style={styles.priceRow}><span>GST <ChevronDown size={12} /></span><span>₹{tax}</span></div>

            <div style={styles.total}>
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>

            <button style={styles.button} onClick={placeOrder}>
              Place Order
            </button>

            <div style={styles.secure}>
              <ShieldCheck size={16} /> Secure checkout
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE RESPONSIVE */}
      <style>
        {`
        @media (max-width: 900px) {
          .grid {
            grid-template-columns: 1fr !important;
          }
        }
        `}
      </style>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  wrapper: {
    padding: "40px 5%",
    background: "#f9fafb",
    minHeight: "100vh",
    fontFamily: "Segoe UI, sans-serif",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1.7fr 1fr",
    gap: "30px",
    maxWidth: "1200px",
    margin: "auto",
  },
  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "16px",
    border: "1px solid #eee",
    marginBottom: "25px",
  },
  subText: { color: "#666", fontSize: "14px", marginBottom: "20px" },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  payment: (active) => ({
    display: "flex",
    gap: "10px",
    padding: "15px",
    borderRadius: "12px",
    border: active ? "2px solid #4f46e5" : "1px solid #ddd",
    background: active ? "#f5f7ff" : "#fff",
    cursor: "pointer",
    marginBottom: "12px",
  }),
  sticky: { position: "sticky", top: "20px" },
  item: { display: "flex", gap: "12px", marginBottom: "15px", alignItems: "center" },
  image: { width: "50px", height: "50px", borderRadius: "8px", objectFit: "cover" },
  priceRow: { display: "flex", justifyContent: "space-between", margin: "8px 0" },
  total: { display: "flex", justifyContent: "space-between", fontWeight: "700", fontSize: "18px", margin: "20px 0" },
  button: {
    width: "100%",
    padding: "14px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    cursor: "pointer",
  },
  secure: { textAlign: "center", marginTop: "15px", fontSize: "12px", color: "#999" },
};
