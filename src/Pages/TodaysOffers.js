import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TodaysOffersPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch(
          "https://nainikaessentialsdatabas.onrender.com/bestseller/all"
        );
        const data = await res.json();
        const todaysOffers = data.filter(product => product.type === "todaysoffers");
        setOffers(todaysOffers);
      } catch (err) {
        console.error("Failed to fetch today's offers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "50px", fontSize: "18px" }}>
        Loading today's offers...
      </p>
    );

  return (
    <div style={{ padding: "40px", fontFamily: "'Inter', sans-serif", background: "#f8f8f8" }}>
      <h1 style={{ marginBottom: "30px", color: "#1a73e8", fontSize: "32px", fontWeight: "700" }}>
        Today's Offers
      </h1>

      {offers.length === 0 && (
        <p style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>
          No offers available today.
        </p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "25px",
        }}
      >
        {offers.map(product => {
          const variant = product.variants[0]; // pick first variant
          const discount = parseFloat(product.discount || 0);
          const originalPrice = variant.price;
          const currentPrice = Math.round(originalPrice * (1 - discount / 100));

          return (
            <div
              key={product.id}
              style={{
                background: "#fff",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                position: "relative",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/product/${product.id}`)}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
              }}
            >
              {/* Discount Ribbon */}
              {discount > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "-5px",
                    background: "#ff4d4f",
                    color: "#fff",
                    padding: "6px 14px",
                    fontWeight: "700",
                    fontSize: "13px",
                    transform: "rotate(-15deg)",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  }}
                >
                  {discount}% OFF
                </div>
              )}

              {/* Product Image */}
              <img
                src={product.main_image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "280px",
                  objectFit: "cover",
                  borderBottom: "1px solid #eee",
                }}
              />

              {/* Product Info */}
              <div style={{ padding: "16px" }}>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    marginBottom: "8px",
                    color: "#333",
                    height: "50px",
                    overflow: "hidden",
                  }}
                >
                  {product.name}
                </h3>

                <p
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    height: "40px",
                    overflow: "hidden",
                    marginBottom: "12px",
                  }}
                >
                  {product.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "14px",
                  }}
                >
                  <span style={{ fontWeight: "700", fontSize: "18px", color: "#1a73e8" }}>
                    ₹{currentPrice}
                  </span>
                  {discount > 0 && (
                    <span
                      style={{
                        textDecoration: "line-through",
                        color: "#999",
                        fontSize: "14px",
                      }}
                    >
                      ₹{originalPrice}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => navigate(`/product/${product.id}`)}
                  style={{
                    width: "100%",
                    padding: "10px 0",
                    background: "#1a73e8",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "600",
                    fontSize: "15px",
                    transition: "background 0.3s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#155ab6")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#1a73e8")}
                >
                  View Product
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
