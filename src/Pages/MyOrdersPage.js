import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://nainikaessentialsdatabas.onrender.com";

export default function MyOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const user = JSON.parse(localStorage.getItem("adminUser")) || JSON.parse(localStorage.getItem("user"));
  const userId = user?.user_id || user?.id;

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) { setLoading(false); return; }
      try {
        const res = await fetch(`${API_BASE}/orders/user/${userId}`);
        const data = await res.json();
        setOrders(data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userId]);

  if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>;

  return (
    <div className="orders-container">
      <style>{`
        .orders-container {
          padding: 20px 16px;
          background-color: #fff;
          font-family: 'Inter', sans-serif;
        }
        .header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .title-group h1 { font-size: 20px; font-weight: 600; margin: 0; color: #1e293b; }
        .title-group p { font-size: 13px; color: #64748b; margin: 4px 0 0 0; }
        
        .continue-btn {
          background-color: #4f46e5;
          color: white;
          padding: 8px 16px;
          border-radius: 8px;
          border: none;
          font-size: 13px;
          font-weight: 500;
        }

        /* The Table Layout for Mobile */
        .table-wrapper {
          overflow-x: auto;
          border: 1px solid #f1f5f9;
          border-radius: 12px;
          background: #fff;
        }
        table { width: 100%; border-collapse: collapse; min-width: 600px; }
        th {
          background-color: #f8fafc;
          text-align: left;
          padding: 12px 16px;
          font-size: 12px;
          font-weight: 500;
          color: #64748b;
          border-bottom: 1px solid #f1f5f9;
        }
        td {
          padding: 16px;
          font-size: 13px;
          color: #334155;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
        }
        
        .order-id-cell { font-weight: 500; color: #1e293b; }
        .order-id-cell span { display: block; font-size: 11px; color: #94a3b8; font-weight: 400; margin-top: 2px; }

        .prod-img {
          width: 40px;
          height: 50px;
          object-fit: cover;
          border-radius: 6px;
        }

        .status-badge {
          background-color: #fef3c7;
          color: #d97706;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          display: inline-block;
        }
        
        /* Fixed bottom nav placeholder style */
        .bottom-spacer { height: 80px; }
      `}</style>

      <div className="header-row">
        <div className="title-group">
          <h1>My Orders</h1>
          <p>Track and manage your orders</p>
        </div>
        <button className="continue-btn" onClick={() => navigate("/shop")}>
          Continue Shopping
        </button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Products</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.order_id} onClick={() => navigate(`/orders/${order.order_id}`)}>
                <td className="order-id-cell">
                  #{(order.order_id).toString().slice(-6)}
                  <span>{order.payment_method?.toUpperCase()}</span>
                </td>
                <td>{new Date(order.created_at).toLocaleDateString('en-GB')}</td>
                <td>
                  <img 
                    src={order.items?.[0]?.image_url || "/placeholder.png"} 
                    alt="product" 
                    className="prod-img"
                  />
                </td>
                <td><span style={{background: '#f1f5f9', padding: '4px 8px', borderRadius: '50%'}}>{order.items?.length || 1}</span></td>
                <td style={{fontWeight: '600'}}>₹{order.total_amount}</td>
                <td>
                  <div style={{fontSize: '11px', fontWeight: '600'}}>{order.order_status?.toUpperCase()}</div>
                  <div style={{fontSize: '10px', color: '#94a3b8'}}>{order.payment_method?.toUpperCase()}</div>
                </td>
                <td>
                  <span className="status-badge">PLACED</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="bottom-spacer"></div>
    </div>
  );
}