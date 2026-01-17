import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Hoodie",
    image: "/hoodie.jpeg",
    link: "/category/hoodie",
  },
  {
    title: "Clothing",
    image: "/clothing.jpeg",
    link: "/category/clothing",
  },
  {
    title: "Shirts",
    image: "/shirts.jpeg",
    link: "/category/shirts",
  },
  {
    title: "Pants",
    image: "/pants.jpeg",
    link: "/category/pants",
  },
];

export default function ShopByCategory() {
  return (
    <>
      <style>{`
        .shop-container {
          padding: 40px 5%;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .header-section {
          margin-bottom: 25px;
        }

        .header-section h2 {
          font-size: 28px; /* Reduced from 32px */
          font-weight: 400; /* Removed bold */
          color: #111;
          margin: 0;
        }

        .header-section p {
          color: #777;
          font-size: 14px; /* Reduced from 16px */
          margin-top: 4px;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px; /* Tighter spacing */
        }

        .category-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          border-radius: 2px;
          aspect-ratio: 3 / 4.2; /* Adjusted for the tall screenshot look */
        }

        .category-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
          display: block;
        }

        .category-card:hover img {
          transform: scale(1.04);
        }

        .category-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 20px;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%);
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .category-overlay h3 {
          margin: 0;
          font-size: 18px; /* Reduced from 22px */
          font-weight: 500;
        }

        .category-overlay .explore-link {
          display: inline-block;
          margin-top: 5px;
          text-decoration: none;
          color: #fff;
          font-size: 12px; /* Reduced from 14px */
          opacity: 0.85;
        }

        /* ======= Responsive ======= */
        @media (max-width: 1024px) {
          .categories-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .categories-grid {
            grid-template-columns: 1fr;
          }
          .header-section h2 {
            font-size: 24px;
          }
        }
      `}</style>

      <div className="shop-container">
        <header className="header-section">
          <h2>Shop by Category</h2>
          <p>Curated collections for every style</p>
        </header>

        <section className="categories-grid">
          {categories.map((cat, index) => (
            <div key={index} className="category-card">
              <img src={cat.image} alt={cat.title} />
              <div className="category-overlay">
                <h3>{cat.title}</h3>
                <Link to={cat.link} className="explore-link">
                  Explore Collection →
                </Link>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}