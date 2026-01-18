import React, { useState } from 'react';
import { Search, Menu, X, ShoppingCart, User, ChevronRight, MessageCircle, Star } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const ShopPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const categories = ["Shirts", "Clothing", "Hoodie", "Pants"];
  const products = [
    { id: 1, name: "Elegant Onion Pink Silk Saree with Geometric Weave &...", discount: "40%", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400", rating: 4.0, reviews: 5 ,slug: "elegant-onion-pink-silk-saree"},
    { id: 2, name: "Radiant Gold Tissue Silk Saree with Antique Zari Work", discount: "52%", img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400", rating: 3.5, reviews: 2 ,slug: "radiant-gold-tissue-silk-saree"},
    { id: 3, name: "Midnight Noir Sequinned Georgette Saree", discount: "50%", img: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400", rating: 4.5, reviews: 10 ,slug: "midnight-noir-sequinned-georgette-saree"},
    { id: 4, name: "Elegant Handloom Silk Saree with Zari Border", discount: "50%", img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400", rating: 4.2, reviews: 8 ,slug: "elegant-handloom-silk-saree"},
  ];
const handleProductClick = (product) => {
  navigate(`/product/${product.id}/${product.slug}`);
};

  return (
    <>
      <style>{`
        /* Reset & Base */
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', 'Segoe UI', sans-serif; }
        body { background-color: #ffffff; color: #334155; }

        /* Navbar */
        .navbar { display: flex; justify-content: space-between; align-items: center; padding: 15px 5%; background: white; border-bottom: 1px solid #f1f5f9; position: sticky; top: 0; z-index: 100; }
        .logo { font-size: 22px; font-weight: bold; color: #1e1b4b; cursor: pointer; }
        .nav-links { display: flex; gap: 25px; align-items: center; }
        .nav-links a { text-decoration: none; color: #64748b; font-size: 14px; font-weight: 500; }
        .active-pill { background: #f0f3ff; color: #6366f1 !important; padding: 8px 18px; border-radius: 20px; display: flex; align-items: center; gap: 6px; font-weight: 600; }
        .nav-icons { display: flex; gap: 20px; align-items: center; color: #64748b; }

        /* Layout */
        .container { max-width: 1400px; margin: 30px auto; display: flex; gap: 40px; padding: 0 5%; }
        
        /* Sidebar */
        .sidebar { width: 260px; flex-shrink: 0; }
        .filter-card { background: #f8fafc; padding: 25px; border-radius: 20px; border: 1px solid #f1f5f9; }
        .sidebar h3 { font-size: 16px; font-weight: 700; color: #1e293b; }
        .subtitle { font-size: 12px; color: #94a3b8; margin: 4px 0 20px; }
        .all-cat-btn { width: 100%; padding: 12px; background: #eeeffe; color: #6366f1; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; margin-bottom: 30px; }
        .section-label { font-size: 11px; font-weight: 700; color: #94a3b8; letter-spacing: 0.5px; margin-bottom: 12px; display: block; }
        .cat-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-radius: 12px; cursor: pointer; margin-bottom: 6px; font-size: 14px; color: #475569; background: white; border: 1px solid #f1f5f9; }
        .cat-item.active { background: #6366f1; color: white; border-color: #6366f1; }
        .sort-select { width: 100%; padding: 12px; border-radius: 12px; border: 1px solid #e2e8f0; background: #fff; margin-top: 10px; font-size: 13px; color: #475569; }

        /* Main Content */
        .main-content { flex: 1; }
        .header-text h1 { font-size: 36px; font-weight: 700; color: #0f172a; }
        .header-text p { color: #64748b; margin: 8px 0 30px; font-size: 15px; }
        .search-wrapper { position: relative; margin-bottom: 40px; }
        .search-wrapper input { width: 100%; padding: 16px 28px; border-radius: 40px; border: 1px solid #f1f5f9; outline: none; font-size: 15px; background: #ffffff; box-shadow: 0 2px 15px rgba(0,0,0,0.02); }
        .search-icon { position: absolute; right: 25px; top: 16px; color: #cbd5e1; }

        /* Product Card - Matches Screenshot Exactly */
        .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .card { background: white; overflow: hidden; cursor: pointer; }
        .img-box { position: relative; aspect-ratio: 3/4; overflow: hidden; }
        .img-box img { width: 100%; height: 100%; object-fit: cover; }
        
        .badge-best { position: absolute; top: 0; left: 0; background: #f97316; color: white; padding: 4px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; }
        .badge-off { position: absolute; top: 0; right: 12px; background: #dc2626; color: white; padding: 10px 6px; font-size: 11px; font-weight: 800; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; text-align: center; line-height: 1; }
        .badge-off span { display: block; font-size: 8px; margin-top: 2px; }

        .info { padding: 12px 0; }
        .brand { font-size: 11px; color: #94a3b8; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 6px; }
        .card h4 { font-size: 14px; font-weight: 600; color: #1e293b; line-height: 1.3; margin-bottom: 6px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        
        /* Rating Stars */
        .meta-row { display: flex; align-items: center; gap: 8px; font-size: 11px; color: #94a3b8; }
        .stars { display: flex; color: #fbbf24; gap: 1px; }

        /* FAB */
        .chat-btn { position: fixed; bottom: 30px; right: 30px; background: #5a57e6; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: none; box-shadow: 0 8px 20px rgba(90, 87, 230, 0.3); cursor: pointer; }

        @media (max-width: 1100px) { .grid { grid-template-columns: repeat(2, 1fr); } .sidebar { display: none; } }
        @media (max-width: 600px) { .grid { grid-template-columns: 1fr; } .header-text h1 { font-size: 28px; } .container { padding: 0 15px; } }
      `}</style>

      <div className="shop-page">
       
        <div className="container">
          <aside className="sidebar">
            <div className="filter-card">
              <h3>Filters</h3>
              <p className="subtitle">Refine products quickly</p>
              <button className="all-cat-btn">All Categories</button>
              
              <span className="section-label">CATEGORIES</span>
              {categories.map(cat => (
                <div key={cat} className={`cat-item ${cat === 'Clothing' ? 'active' : ''}`}>
                  {cat} <ChevronRight size={16} color={cat === 'Clothing' ? 'white' : '#cbd5e1'} />
                </div>
              ))}

              <span className="section-label" style={{marginTop: '25px'}}>SORT BY</span>
              <select className="sort-select">
                <option>Recommended</option>
              </select>
            </div>
          </aside>

          <main className="main-content">
            <div className="header-text">
              <h1>Shop Our Collection</h1>
              <p>Select a category to explore products</p>
            </div>

            <div className="search-wrapper">
              <input type="text" placeholder="Search products..." />
              <Search className="search-icon" size={20} />
            </div>

            <div className="grid">
              {products.map(p => (
                <div key={p.id} className="card" onClick={() => handleProductClick(p)}>
                  <div className="img-box">
                    <img src={p.img} alt={p.name} />
                    <div className="badge-best">Best Seller</div>
                    <div className="badge-off">{p.discount} <span>OFF</span></div>
                  </div>
                  <div className="info">
                    <div className="brand">ELAN COTTS</div>
                    <h4>{p.name}</h4>
                    <div className="meta-row">
                      <span>1 colour available</span>
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={10} fill={i < Math.floor(p.rating) ? "#fbbf24" : "none"} stroke="currentColor" />
                        ))}
                      </div>
                      <span>{p.rating} ({p.reviews})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>

        <button className="chat-btn">
          <MessageCircle size={30} fill="white" />
        </button>
      </div>
    </>
  );
};

export default ShopPage;