import React, { useState, useEffect } from 'react';

/**
 * COMPONENT: RecentlyViewed
 * Includes logic, styles, and mobile responsiveness in one block.
 */
const RecentlyViewed = () => {
  const [recentItems, setRecentItems] = useState([]);

  // Mock data for demonstration - in a real app, this comes from localStorage/API
  useEffect(() => {
    const demoData = [
      {
        id: 1,
        name: "Midnight Noir Sequinned Georgette",
        description: "A timeless black saree crafted from fluid georgette, featuring delicate tonal...",
        colors: 1,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600&h=800"
      },
      {
        id: 2,
        name: "Crimson Silk Elegance",
        description: "Pure mulberry silk with hand-woven zari borders and intricate floral motifs...",
        colors: 2,
image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600&h=800"      }
    ];
    setRecentItems(demoData);
  }, []);

  return (
    <>
      <style>{`
        /* Container & Layout */
        .rv-wrapper {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
          font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }

        .rv-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 20px;
          border-bottom: 1px solid #f0f0f0;
          padding-bottom: 10px;
        }

        .rv-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #222;
          margin: 0;
        }

        .rv-subtitle {
          font-size: 0.75rem;
          color: #888;
        }

        /* Responsive Grid */
        .rv-grid {
          display: grid;
          gap: 20px;
          /* Mobile: 1 card per row */
          grid-template-columns: 1fr;
        }

        /* Tablet: 2 cards per row */
        @media (min-width: 600px) {
          .rv-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Desktop: 4 cards per row */
        @media (min-width: 1024px) {
          .rv-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* Card Styling */
        .rv-card {
          display: flex;
          flex-direction: column;
          background: #fff;
        }

        .rv-img-container {
          width: 100%;
          aspect-ratio: 3 / 4;
          border-radius: 12px;
          overflow: hidden;
          background-color: #f9f9f9;
        }

        .rv-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .rv-card:hover .rv-img {
          transform: scale(1.05);
        }

        .rv-info {
          padding: 12px 2px;
        }

        .rv-product-title {
          font-size: 0.95rem;
          font-weight: 600;
          margin: 0 0 6px 0;
          color: #111;
        }

        .rv-desc {
          font-size: 0.8rem;
          color: #666;
          line-height: 1.4;
          margin-bottom: 8px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .rv-colors {
          font-size: 0.75rem;
          color: #999;
        }

        /* Scrollbar for mobile touch (optional) */
        @media (max-width: 480px) {
          .rv-wrapper { padding: 15px; }
          .rv-title { font-size: 1.1rem; }
        }
      `}</style>

      <div className="rv-wrapper">
        <header className="rv-header">
          <h2 className="rv-title">Recently Viewed</h2>
          <span className="rv-subtitle">Based on your browsing</span>
        </header>

        <div className="rv-grid">
          {recentItems.map((item) => (
            <div key={item.id} className="rv-card">
              <div className="rv-img-container">
                <img src={item.image} alt={item.name} className="rv-img" />
              </div>
              <div className="rv-info">
                <h3 className="rv-product-title">{item.name}</h3>
                <p className="rv-desc">{item.description}</p>
                <span className="rv-colors">{item.colors} color available</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RecentlyViewed;