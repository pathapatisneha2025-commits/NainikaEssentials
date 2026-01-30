import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CategoryProducts() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://nainikaessentialsdatabas.onrender.com/products/all"
        );
        const data = await res.json();

        const filtered = data.filter(
          (p) => p.category.toLowerCase() === category.toLowerCase()
        );

        setProducts(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const handleClick = (product) => {
    const slug = product.name.replace(/\s+/g, "-").toLowerCase();
    navigate(`/shopproduct/${product.id}`);
  };

  if (loading) return <p style={{ padding: 50, textAlign: "center" }}>Loading products...</p>;
  if (!products.length) return <p style={{ padding: 50, textAlign: "center" }}>No products found.</p>;

  return (
    <div className="products-container">
      <h1 className="category-title">{category}</h1>
      <p className="category-subtitle">Explore products from this category</p>

      <div className="products-grid">
        {products.map((p) => (
          <div
            key={p.id}
            className="product-card"
            onClick={() => handleClick(p)}
          >
            <div className="image-box">
              <span className="badge">Best Seller</span>
              <span className="discount">{p.discount ? `${p.discount}% OFF` : ""}</span>
              <img src={p.main_image} alt={p.name} />
            </div>

            <div className="product-info">
              <div className="brand">{p.product_details?.Brand || "Nainika Essentials"}</div>
              <div className="product-name">{p.name}</div>
              <div className="price">₹{p.variants?.[0]?.price || "N/A"}</div>
            </div>
          </div>
        ))}
    

         <style>{`
        .products-container {
          padding: 40px 6%;
          font-family: Inter, sans-serif;
        }

        .category-title {
          font-size: 32px;
          font-weight: 600;
          text-transform: capitalize;
          margin-bottom: 6px;
        }

        .category-subtitle {
          color: #6b7280;
          font-size: 15px;
          margin-bottom: 30px;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
        }

        .product-card {
          cursor: pointer;
        }

        .image-box {
          position: relative;
          overflow: hidden;
        }

        .image-box img {
          width: 100%;
          height: 420px;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .product-card:hover img {
          transform: scale(1.05);
        }

        .badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #f59e0b;
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 4px;
        }

        .discount {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #dc2626;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          padding: 6px 8px;
          border-radius: 2px;
        }

        .product-info {
          padding-top: 10px;
        }

        .brand {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 4px;
        }

        .product-name {
          font-size: 14px;
          font-weight: 600;
          line-height: 1.4;
          margin-bottom: 6px;
        }

        .price {
          font-size: 14px;
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .products-container {
            padding: 20px;
          }

          .products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }

          .image-box img {
            height: 300px;
          }
        }

        @media (max-width: 480px) {
          .products-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      </div>
      </div>


  );
}
