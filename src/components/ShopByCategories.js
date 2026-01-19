import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  // Changed extensions to .jpg to match common web assets seen in your screenshots
  { title: "Hoodie", image: "/hoodie.jpg", slug: "hoodie" },
  { title: "Clothing", image: "/clothing.jpg", slug: "clothing" },
  { title: "Shirts", image: "/shirts.jpg", slug: "shirts" },
  { title: "Pants", image: "/pants.jpg", slug: "pants" },
];

export default function ShopByCategory() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .shop-container {
          padding: 60px 5%;
          font-family: 'Inter', sans-serif;
          background: #fff; /* Ensures white background covers the hero banner background */
          position: relative;
          z-index: 5; /* Brings the categories above any fixed background images */
        }

        .header-section {
          margin-bottom: 30px;
        }

        .header-section h2 {
          font-size: 32px;
          font-weight: 600;
          color: #111;
          margin: 0;
        }

        .header-section p {
          color: #666;
          font-size: 16px;
          margin-top: 6px;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .category-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          border-radius: 8px; /* Slightly more rounded like your reference style */
          aspect-ratio: 3 / 4;
          background-color: #f5f5f5; /* Placeholder color while image loads */
        }

        .category-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
          display: block;
        }

        .category-card:hover img {
          transform: scale(1.05);
        }

        .category-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 25px 20px;
          /* Darker gradient for better text readability */
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
          color: #fff;
        }

        .category-overlay h3 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .explore-link {
          display: block;
          margin-top: 5px;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 1px;
          opacity: 0.9;
        }

        @media (max-width: 1024px) {
          .categories-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 600px) {
          .categories-grid { grid-template-columns: 1fr; }
          .shop-container { padding: 40px 20px; }
        }
      `}</style>

      <div className="shop-container">
        <header className="header-section">
          <h2>Shop by Category</h2>
          <p>Curated collections for every style</p>
        </header>

        <section className="categories-grid">
          {categories.map((cat) => (
            <div
              key={cat.slug}
              className="category-card"
              onClick={() => navigate(`/category/${cat.slug}`)}
            >
              <img 
                src={cat.image} 
                alt={cat.title} 
                onError={(e) => {
                  // Fallback to .jpeg if .jpg fails
                  if(e.target.src.includes('.jpg')) e.target.src = cat.image.replace('.jpg', '.jpeg');
                }}
              />
              <div className="category-overlay">
                <h3>{cat.title}</h3>
                <span className="explore-link">Explore Collection →</span>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}