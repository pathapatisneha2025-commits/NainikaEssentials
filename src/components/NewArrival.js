import React from "react";
import { useNavigate } from "react-router-dom";

// Add a slug for each product
const products = [
  {
    id: 1,
    slug: "winter-fleece-hoodie",
    brand: "ELAN COTTS",
    name: "Winter Fleece Hoodie",
    colors: "2 colours available",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
    discount: "38%",
    isBestSeller: false,
  },
  {
    id: 2,
    slug: "mens-slim-fit-denim-pant",
    brand: "ELAN COTTS",
    name: "Men's Slim Fit Denim cotton pant",
    colors: "1 colour available",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500",
    discount: "38%",
    isBestSeller: false,
  },
  {
    id: 3,
    slug: "mens-casual-cotton-shirt",
    brand: "RAYMOND",
    name: "Men's Casual Cotton Shirt",
    colors: "2 colours available",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500",
    discount: "33%",
    isBestSeller: false,
  },
  {
    id: 5,
    slug: "radiant-gold-tissue-silk-saree",
    brand: "ELAN COTTS",
    name: "Radiant Gold Tissue Silk Saree with Antique Zari Work",
    colors: "1 colour available",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500",
    discount: "52%",
    isBestSeller: true,
  },
  {
    id: 6,
    slug: "midnight-noir-sequinned-georgette-saree",
    brand: "ELAN COTTS",
    name: "Midnight Noir Sequinned Georgette Saree",
    colors: "1 colour available",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500",
    discount: "50%",
    isBestSeller: true,
  },
  {
    id: 8,
    slug: "slim-fit-cotton-shirt",
    brand: "ELAN COTTS",
    name: "Slim Fit Cotton Shirt",
    colors: "2 colours available",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500",
    discount: "50%",
    isBestSeller: false,
  },
  {
    id: 9,
    slug: "elan-cotts-slim-fit-pant",
    brand: "ELAN COTTS",
    name: "Elan Cotts Slim Fit Cotton Pant",
    colors: "2 colours available",
    image: "/pants.jpeg",
    discount: "43%",
    isBestSeller: false,
  },
  {
    id: 10,
    slug: "elan-cotts-slim-fit-shirt",
    brand: "ELAN COTTS",
    name: "Elan Cotts Slim Fit Shirt",
    colors: "2 colours available",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500",
    discount: "25%",
    isBestSeller: false,
  },
];

export default function NewArrivals() {
  const navigate = useNavigate();

const handleProductClick = () => {
    navigate("/shop"); // <-- goes to shop page
  };
  return (
    <div className="arrivals-container">
      <style>{`
        .arrivals-container { padding: 60px 5%; font-family: 'Inter', sans-serif; background-color: #fff; }
        .arrivals-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 35px; }
        .header-text h2 { font-size: 32px; font-weight: 500; margin: 0; color: #111; }
        .header-text p { color: #666; font-size: 14px; margin-top: 8px; max-width: 500px; line-height: 1.5; }
        .view-all-btn { padding: 10px 24px; border: 1px solid #ddd; border-radius: 25px; text-decoration: none; color: #444; font-size: 14px; display: flex; align-items: center; gap: 8px; transition: all 0.2s; }
        .view-all-btn:hover { background-color: #f9f9f9; border-color: #bbb; }
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
            onClick={() => handleProductClick(product.slug)}
          >
            <div className="image-container">
              {product.isBestSeller && <div className="best-seller-badge">Best Seller</div>}
              <div className="discount-badge">{product.discount} <br /> OFF</div>
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
