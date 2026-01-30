import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://nainikaessentialsdatabas.onrender.com";

export default function MyOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  // Logged-in user or guestId from localStorage
  const user =
    JSON.parse(localStorage.getItem("adminUser")) ||
    JSON.parse(localStorage.getItem("user"));
  const userId = user?.user_id || user?.id;

  // Fetch orders for logged-in user automatically
  useEffect(() => {
    if (!userId) return;
    fetchOrdersByUser(userId);
  }, [userId]);

  const fetchOrdersByUser = async (id) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/orders/user/${id}`);
      const data = await res.json();
      setOrders(data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // Fetch guest orders by mobile number
  const handleTrackGuestOrders = async () => {
    if (!mobile) {
      alert("Please enter your mobile number");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/orders/guest/${mobile}`);
      const data = await res.json();
      if (!data || data.length === 0) {
        setOrders([]);
        setError("No orders found for this mobile number");
      } else {
        setOrders(data);
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching guest orders");
    } finally {
      setLoading(false);
    }
  };

  // Return request for orders
  const handleReturnRequest = async (orderId) => {
    const reason = prompt("Reason for return:");
    if (!reason) return;

    try {
      const res = await fetch(`${API_BASE}/orders/${orderId}/return`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Return requested for entire order!");
        setOrders((prev) =>
          prev.map((o) =>
            o.order_id === orderId
              ? {
                  ...o,
                  items: o.items.map((i) => ({
                    ...i,
                    return_status: "Requested",
                    return_reason: reason,
                  })),
                }
              : o
          )
        );
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting return request");
    }
  };

  return (
    <div className="orders-container">
      <style>{`
        .orders-container { padding: 16px; font-family: 'Inter', sans-serif; max-width: 1000px; margin: auto; }
        .header-row { display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; }
        @media(min-width: 768px){ .header-row { flex-direction: row; justify-content: space-between; align-items: center; } }
        .title-group h1 { font-size: 22px; font-weight: 600; margin: 0; color: #1e293b; }
        .title-group p { font-size: 14px; color: #64748b; margin: 2px 0 0 0; }
        .continue-btn { background-color: #4f46e5; color: white; padding: 8px 16px; border-radius: 8px; border: none; font-size: 13px; cursor: pointer; }
        .mobile-input { display: flex; gap: 8px; margin-top: 10px; }
        .mobile-input input { flex: 1; padding: 8px; border-radius: 6px; border: 1px solid #ccc; }
        .mobile-input button { padding: 8px 16px; border-radius: 6px; background: #4f46e5; color: white; border: none; cursor: pointer; }
        .table-wrapper { overflow-x: auto; border: 1px solid #f1f5f9; border-radius: 12px; background: #fff; margin-top: 20px; }
        table { width: 100%; border-collapse: collapse; min-width: 600px; }
        th { background-color: #f8fafc; text-align: left; padding: 12px 16px; font-size: 12px; font-weight: 500; color: #64748b; border-bottom: 1px solid #f1f5f9; }
        td { padding: 12px; font-size: 13px; color: #334155; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
        .order-id-cell { font-weight: 500; color: #1e293b; }
        .order-id-cell span { display: block; font-size: 11px; color: #94a3b8; font-weight: 400; margin-top: 2px; }
        .status-badge { background-color: #fef3c7; color: #d97706; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; display: inline-block; margin-left: 8px; }
        .return-btn { font-size: 12px; padding: 4px 8px; border-radius: 6px; border: none; background: #f87171; color: white; cursor: pointer; }
        .product-img { width: 50px; height: 50px; object-fit: cover; border-radius: 6px; margin-right: 8px; }
        .item-list { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
      `}</style>

      <div className="header-row">
        <div className="title-group">
          <h1>My Orders</h1>
          <p>Track and manage your orders</p>
        </div>

        {!userId && (
          <div className="mobile-input">
            <input
              type="text"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <button onClick={handleTrackGuestOrders}>Track Orders</button>
          </div>
        )}

        <button className="continue-btn" onClick={() => navigate("/shop")}>
          Continue Shopping
        </button>
      </div>

      {loading && <p>Loading orders...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {orders.length > 0 && (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status / Return</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const returnStatus = order.items?.[0]?.return_status || "Not Requested";
                const returnReason = order.items?.[0]?.return_reason;

                return (
                  <tr key={order.order_id}>
                    <td className="order-id-cell">
                      #{order.order_id.toString().slice(-6)}
                      <span>{order.payment_method?.toUpperCase()}</span>
                    </td>
                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                    <td>
                      <div className="item-list">
                        {order.items?.map((item, idx) => (
                          <div key={idx} style={{ display: "flex", alignItems: "center" }}>
                            <img src={item.product_image} alt={item.product_name} className="product-img" />
                            <span>{item.product_name}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td style={{ fontWeight: "600" }}>₹{order.total_amount}</td>
                    <td>
                      {returnStatus === "Not Requested" ? (
                        <button className="return-btn" onClick={() => handleReturnRequest(order.order_id)}>
                          Return Order
                        </button>
                      ) : (
                        <span className="status-badge">{returnStatus}</span>
                      )}
                      {returnReason && <div style={{ fontSize: 11, color: "#64748b" }}>Reason: {returnReason}</div>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
