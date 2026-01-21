import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://nainikaessentialsdatabas.onrender.com";

export default function NewArrivals() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/products/all`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();

        const mappedData = data.map((p) => ({
          id: p.id,
          slug: p.name.toLowerCase().replace(/\s+/g, "-"),
          brand: p.category,
          name: p.name,
          colors: "1-2 colours available", // you can replace with real data if available
          image: p.images[0], // use first image from array
          discount: Math.floor(Math.random() * 50) + "%", // optional: real discount logic here
          isBestSeller: p.is_bestseller,
        }));

        setProducts(mappedData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = () => {
    navigate("/shop"); // always redirect to shop page
  };

  if (loading)
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        Loading products...
      </div>
    );

  return (
    <div className="arrivals-container">
      <style>{`
        .arrivals-container { padding: 60px 5%; font-family: 'Inter', sans-serif; background-color: #fff; }
        .arrivals-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 35px; }
        .header-text h2 { font-size: 32px; font-weight: 500; margin: 0; color: #111; }
        .header-text p { color: #666; font-size: 14px; margin-top: 8px; max-width: 500px; line-height: 1.5; }
        .product-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; }
        .product-card { position: relative; cursor: pointer; }
        .image-container { position: relative; aspect-ratio: 1 / 1.25; overflow: hidden; background-color: #f5f5f5; }
        .image-container img { width: 100%; height: 100%; object-fit: cover; }
        .discount-badge { position: absolute; top: 0; right: 15px; background-color: #d3122a; color: white; padding: 5px 8px; font-size: 11px; font-weight: bold; text-align: center; line-height: 1.2; clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%); z-index: 10; }
        .best-seller-badge { position: absolute; top: 0; left: 0; background-color: #f3a63b; color: white; padding: 4px 10px; font-size: 11px; font-weight: 500; z-index: 10; }
        .view-details-overlay { position: absolute; bottom: 15px; left: 50%; transform: translateX(-50%); background: rgba(255, 255, 255, 0.9); padding: 8px 16px; border-radius: 4px; font-size: 12px; font-weight: 500; opacity: 0; transition: opacity 0.3s; }
        .product-card:hover .view-details-overlay { opacity: 1; }
        .product-info { padding-top: 15px; }
        .brand-name { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #888; margin-bottom: 6px; }
        .product-name { font-size: 14px; color: #222; margin-bottom: 4px; font-weight: 500; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .color-variants { font-size: 12px; color: #999; }
        @media (max-width: 1200px) { .product-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) { .product-grid { grid-template-columns: repeat(2, 1fr); } .arrivals-header { flex-direction: column; gap: 20px; } }
      `}</style>

      <header className="arrivals-header">
        <div className="header-text">
          <h2>New Arrivals</h2>
          <p>Fresh styles just dropped. Discover the latest designs crafted for modern comfort and everyday elegance.</p>
        </div>
      </header>

      <section className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={handleProductClick}
          >
            <div className="image-container">
              {product.isBestSeller && <div className="best-seller-badge">Best Seller</div>}
              {product.discount && <div className="discount-badge">{product.discount} <br /> OFF</div>}
              <img src={product.image} alt={product.name} />
              <div className="view-details-overlay">View Details</div>
            </div>
            <div className="product-info">
              <div className="brand-name">{product.brand}</div>
              <div className="product-name">{product.name}</div>
              <div className="color-variants">{product.colors}</div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
