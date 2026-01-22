import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE = "https://nainikaessentialsdatabas.onrender.com";

export default function OrderDetail() {
  const { id } = useParams(); // order id from URL
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch order by ID
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`${API_BASE}/orders/${id}`);
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  // Handle return request
  const handleReturnRequest = async (productId) => {
    const reason = prompt("Reason for return:");
    if (!reason) return;

    try {
      const res = await fetch(`${API_BASE}/orders/${id}/return`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_ids: [productId], reason }),
      });
      const data = await res.json();

      if (data.success) {
        alert("Return requested successfully!");
        // Update local state
        setOrder((prev) => ({
          ...prev,
          items: prev.items.map((i) =>
            i.id === productId
              ? { ...i, return_status: "Requested", return_reason: reason }
              : i
          ),
        }));
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting return request");
    }
  };

  if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>;
  if (!order) return <div style={{ padding: "40px", textAlign: "center" }}>Order not found</div>;

  return (
    <div style={{ padding: "20px", fontFamily: "Inter, sans-serif" }}>
      <button
        style={{ marginBottom: "16px", padding: "8px 12px" }}
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h1 style={{ marginBottom: "8px" }}>Order #{order.order_id}</h1>
      <p style={{ marginBottom: "16px" }}>
        Status: <strong>{order.order_status}</strong> | Payment: <strong>{order.payment_method}</strong> | Date: <strong>{new Date(order.created_at).toLocaleDateString()}</strong>
      </p>

      <div style={{ borderTop: "1px solid #eee", paddingTop: "16px" }}>
        {order.items?.map((item) => (
          <div key={item.id} style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
            <img
              src={item.image_url || "/placeholder.png"}
              alt={item.name}
              style={{ width: "60px", height: "70px", objectFit: "cover", borderRadius: "6px" }}
            />
            <div style={{ marginLeft: "12px" }}>
              <div style={{ fontWeight: 600 }}>{item.name}</div>
              <div>Qty: {item.quantity || 1}</div>
              <div>Price: ₹{item.price}</div>

              {item.return_status && item.return_status !== "Not Requested" && (
                <div style={{ color: "#d97706", fontSize: "12px", marginTop: "2px" }}>
                  Return: {item.return_status} {item.return_reason && `(Reason: ${item.return_reason})`}
                </div>
              )}

              {item.return_status === "Not Requested" && (
                <button
                  style={{
                    marginTop: "4px",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    border: "none",
                    background: "#f87171",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                  onClick={() => handleReturnRequest(item.id)}
                >
                  Request Return
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "24px", fontWeight: 600 }}>
        Total Amount: ₹{order.total_amount}
      </div>
    </div>
  );
}
