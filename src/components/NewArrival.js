import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, ShoppingCart } from "lucide-react"; // Optional: Use lucide-react or similar for icons

const BASE_URL = "https://nainikaessentialsdatabas.onrender.com";

export default function NewArrivals() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
      const res = await fetch("https://nainikaessentialsdatabas.onrender.com/bestseller/all");
      if (!res.ok) throw new Error("Failed to fetch featured products");
      const data = await res.json();
      const featuredProducts = data.filter(p => p.type === "newarrival");
      setProducts(featuredProducts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


    fetchProducts();
  }, []);
  // Function to render stars dynamically
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return "★".repeat(fullStars) + (halfStar ? "½" : "") + "☆".repeat(emptyStars);
  };
  if (loading) return <div style={{ padding: "50px", textAlign: "center" }}>Loading...</div>;

  return (
    <div className="arrivals-container">
      <style>{`
        .arrivals-container { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #fff; }

        /* --- Main Header / Navbar --- */
        .main-navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px 4%;
          background: white;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .logo {
          font-size: 24px;
          font-weight: 700;
          color: #1a2b48;
          cursor: pointer;
        }

        .nav-links-container {
          background-color: #f0f2ff;
          padding: 6px 30px;
          border-radius: 40px;
          display: flex;
          gap: 30px;
          align-items: center;
        }

        .nav-item {
          text-decoration: none;
          color: #555;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          padding: 8px 18px;
          border-radius: 25px;
          transition: 0.3s;
        }

        .nav-item.active {
          background-color: #e0e4ff;
          color: #5a4fcf;
        }

        .nav-icons {
          display: flex;
          gap: 20px;
          color: #444;
        }

        .nav-icons span { cursor: pointer; }

        /* --- Arrivals Header Section --- */
        .arrivals-content-wrap { padding: 40px 4%; }
        .arrivals-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; }
        .header-text h2 { font-size: 42px; font-weight: 600; color: #1a2b48; margin: 0 0 10px 0; }
        .header-text p { color: #666; font-size: 16px; margin: 0; max-width: 500px; line-height: 1.5; }
        
        .view-all-btn { 
          border: 1px solid #5a4fcf; color: #5a4fcf; padding: 10px 28px; border-radius: 30px; 
          font-size: 14px; font-weight: 500; display: flex; align-items: center; gap: 10px;
          cursor: pointer; transition: 0.3s; background: transparent;
        }
        .view-all-btn:hover { background: #5a4fcf; color: white; }

        /* --- Product Grid --- */
        .product-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; }
        .product-card { position: relative; cursor: pointer; }
        .image-container { position: relative; aspect-ratio: 3 / 4; overflow: hidden; background-color: #f5f5f5; }
        .image-container img { width: 100%; height: 100%; object-fit: cover; }

        .discount-badge { 
          position: absolute; top: 0; right: 12px; background-color: #e31e24; color: white; 
          padding: 7px 5px; font-size: 10px; font-weight: bold; text-align: center; 
          clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%); width: 34px; line-height: 1.1;
        }
        .best-seller-badge { 
          position: absolute; top: 0; left: 0; background-color: #f4a43c; color: white; 
          padding: 5px 14px; font-size: 11px; font-weight: 600;
        }

        .view-details-btn {
          position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
          background: white; padding: 10px 20px; border-radius: 4px; font-size: 12px;
          font-weight: 600; box-shadow: 0 4px 12px rgba(0,0,0,0.15); opacity: 0; transition: 0.3s;
        }
        .product-card:hover .view-details-btn { opacity: 1; }

        .product-info { padding: 15px 0; }
        .brand-name { font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; }
        .product-name { font-size: 14px; color: #222; font-weight: 500; line-height: 1.4; height: 40px; overflow: hidden; }
        .color-variants { font-size: 12px; color: #888; margin: 5px 0; }
        
        .rating-row { display: flex; align-items: center; gap: 5px; margin-top: 5px; }
        .stars { color: #f4a43c; font-size: 14px; }
        .rating-text { font-size: 12px; color: #888; }

        @media (max-width: 1200px) { .product-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) { .product-grid { grid-template-columns: repeat(2, 1fr); } .arrivals-header { flex-direction: column; align-items: flex-start; gap: 20px; } }
      `}</style>

     

      <div className="arrivals-content-wrap">
        <header className="arrivals-header">
          <div className="header-text">
            <h1>New Arrivals</h1>
            <p>Fresh styles just dropped. Discover the latest designs crafted for modern comfort and everyday elegance.</p>
          </div>
          <button className="view-all-btn" onClick={() => navigate("/shop")}>
            View all <span>›</span>
          </button>
        </header>

          <section className="product-grid">
          {products.map((product) => {
            const reviewCount = product.reviews?.length || 0;
            const averageRating = reviewCount
              ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
              : 0;

            return (
              <div
                key={product.id}
                className="product-card"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="image-container">
                  {product.isBestSeller && <div className="best-seller-badge">Best Seller</div>}
                  {product.discount && (
                    <div className="discount-badge">
                      {product.discount}
                      <br />
                      OFF
                    </div>
                  )}
                  <img src={product.main_image} alt={product.name} />
                  <div className="view-details-btn">View Details</div>
                </div>

                <div className="product-info">
                  <div className="brand-name">{product.brand}</div>
                  <div className="product-name">{product.name}</div>
                  <div className="color-variants">{product.colors}</div>

                  <div className="rating-row">
                    <span className="stars">{renderStars(averageRating)}</span>
                    <span className="rating-text">
                      {averageRating.toFixed(1)} ({reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}