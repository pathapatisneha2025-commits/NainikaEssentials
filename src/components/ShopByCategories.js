import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { title: "Hoodie", image: "/hoodie.jpeg", slug: "hoodie" },
  { title: "Clothing", image: "/clothing.jpeg", slug: "clothing" },
  { title: "Shirts", image: "/shirts.jpeg", slug: "shirts" },
  { title: "Pants", image: "/pants.jpeg", slug: "pants" },
];

export default function ShopByCategory() {
  const navigate = useNavigate();

  // Duplicate for infinite scroll
  const scrollingCategories = [...categories, ...categories];

  return (
    <>
      <style>{`
        .shop-container {
          padding: 60px 5%;
          background: #fff;
          font-family: 'Inter', sans-serif;
        }

        .header-section {
          margin-bottom: 25px;
        }

        .header-section h2 {
          font-size: 32px;
          font-weight: 600;
          color: #111;
          margin: 0;
        }

        .header-section p {
          color: #666;
          margin-top: 6px;
        }

        /* SCROLL WRAPPER */
        .scroll-wrapper {
          overflow: hidden;
          width: 100%;
        }

        .scroll-track {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: scroll 30s linear infinite;
        }

        .scroll-wrapper:hover .scroll-track {
          animation-play-state: paused;
        }

        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .category-card {
          width: 260px;
          aspect-ratio: 3 / 4;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          flex-shrink: 0;
          background: #f5f5f5;
        }

        .category-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .category-card:hover img {
          transform: scale(1.05);
        }

        .category-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 22px 18px;
          background: linear-gradient(to top, rgba(0,0,0,0.85), transparent);
          color: #fff;
        }

        .category-overlay h3 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
        }

        .explore-link {
          margin-top: 6px;
          display: block;
          font-size: 12px;
          letter-spacing: 1px;
          text-transform: uppercase;
          opacity: 0.9;
        }

        /* MOBILE */
        @media (max-width: 640px) {
          .shop-container {
            padding: 40px 16px;
          }

          .category-card {
            width: 220px;
          }

          .scroll-track {
            animation-duration: 22s;
          }

          .header-section h2 {
            font-size: 26px;
          }
        }
      `}</style>

      <div className="shop-container">
        <div className="header-section">
          <h2>Shop by Category</h2>
          <p>Curated collections for every style</p>
        </div>

        <div className="scroll-wrapper">
          <div className="scroll-track">
            {scrollingCategories.map((cat, index) => (
              <div
                key={index}
                className="category-card"
                onClick={() => navigate(`/category/${cat.slug}`)}
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  onError={(e) => {
                    if (e.target.src.includes(".jpg"))
                      e.target.src = cat.image.replace(".jpg", ".jpeg");
                  }}
                />
                <div className="category-overlay">
                  <h3>{cat.title}</h3>
                  <span className="explore-link">Explore Collection →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
