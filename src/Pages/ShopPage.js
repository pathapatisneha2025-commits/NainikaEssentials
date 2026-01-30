import React, { useState, useEffect } from 'react'; 
import { Search, Menu, ChevronRight, Star, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
const [sortBy, setSortBy] = useState("recommended");

  const navigate = useNavigate();

  const categories = ["Shirts", "Clothing", "Hoddies", "Pants"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://nainikaessentialsdatabas.onrender.com/products/all');
        const data = await res.json();

        const mappedProducts = data.map(p => {
  // get lowest price from variants
  const prices = p.variants?.map(v => v.price) || [];
  const minPrice = prices.length ? Math.min(...prices) : 0;

  return {
    id: p.id,
    name: p.name,
    img: p.main_image,
    discount: p.discount ? `${p.discount}%` : "10%",
    rating: 4.0,
    reviews: 5,
    category: p.category.charAt(0).toUpperCase() + p.category.slice(1),
    price: minPrice, // ⭐ IMPORTANT
  };
});


        setProducts(mappedProducts);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    navigate(`/shopproduct/${product.id}`);
  };

  if (loading) {
    return <div style={{padding: "50px", textAlign:"center"}}>Loading products...</div>;
  }

  return (
    <>
      <style>{`
        .shop-page-root { width: 100%; min-height: 100vh; background: #fff; padding-bottom: 80px; }
        .main-flex-container { display: flex; padding: 40px 4%; gap: 30px; }
        .sidebar-section { width: 280px; min-width: 280px; position: sticky; top: 20px; height: fit-content; }
        .filter-card { background: #f8fafc; padding: 24px; border-radius: 20px; border: 1px solid #f1f5f9; }
        .cat-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-radius: 12px; cursor: pointer; margin-bottom: 6px; font-size: 14px; background: #ffffff; border: 1px solid #f1f5f9; }
        .cat-item.active { background: #5d5fef; color: white; }
        .content-section { flex-grow: 1; min-width: 0; }
        .header-text h1 { font-size: 28px; font-weight: 800; color: #1e293b; margin-bottom: 4px; }
        .header-text p { font-size: 14px; color: #64748b; margin-bottom: 24px; }
        .search-wrapper { position: relative; margin-bottom: 24px; }
        .search-wrapper input { width: 100%; padding: 14px 20px; border-radius: 12px; border: 1px solid #e2e8f0; background: #fdfdfd; font-size: 15px; }
        .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 16px; }
        .product-card { background: white; border-radius: 16px; overflow: hidden; cursor: pointer; }
        .img-box { width: 100%; aspect-ratio: 3/4; overflow: hidden; position: relative; }
        .img-box img { width: 100%; height: 100%; object-fit: cover; }
        .badge-off { position: absolute; top: 10px; right: 10px; background: #dc2626; color: white; padding: 6px 8px; font-size: 11px; font-weight: 700; border-radius: 6px; text-align: center; }
        .info { padding: 10px; }
        .brand { font-size: 11px; color: #94a3b8; font-weight: 600; letter-spacing: 0.5px; margin-bottom: 4px; text-transform: uppercase; }
        .info h4 { font-size: 14px; font-weight: 600; color: #1e293b; line-height: 1.2; margin-bottom: 6px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .meta-row { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #94a3b8; }
        .stars { display: flex; color: #fbbf24; gap: 1px; }
        .mobile-action-bar { display: none; justify-content: space-between; align-items: center; margin-bottom: 20px; gap: 10px; }
        .btn-filter { background: #5d5fef; color: white; border: none; padding: 10px 18px; border-radius: 10px; display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 14px; }
        .mobile-sort-select { border: 1px solid #e2e8f0; padding: 10px; border-radius: 10px; background: white; font-size: 14px; flex-grow: 1; }
.mobile-action-bar {
  display: none; /* hidden on desktop */
  justify-content: space-between; /* Filters left, sort right */
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
}

.mobile-sort-select {
  border: 1px solid #e2e8f0;
  padding: 10px;
  border-radius: 10px;
  background: white;
  font-size: 14px;
  flex-grow: 1;
}

/* Show action bar on mobile */
@media (max-width: 900px) {
  .mobile-action-bar {
    display: flex;
  }
  .sidebar-section { display: none !important; } /* hide desktop sidebar */
}

        @media(max-width: 900px) { 
          .sidebar-section { display: none !important; } 
          .main-flex-container { padding: 20px 16px; flex-direction: column; } 
          .mobile-action-bar { display: flex; } 
          .header-text h1 { font-size: 24px; } 
          .product-grid { grid-template-columns: repeat(2, 1fr); } 
        }
        @media(max-width: 500px) { .product-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="shop-page-root">
        <div className="main-flex-container">
          <aside className="sidebar-section">
            <div className="filter-card">
              <h3>Filters</h3>
              <p>Refine products quickly</p>
              <button 
                style={{width:'100%', padding:'12px', background:'#5d5fef', color:'white', border:'none', borderRadius:10, fontWeight:600, marginBottom:20}}
                onClick={() => setSelectedCategory("All")}
              >
                All Categories
              </button>
              {categories.map(cat => (
                <div 
                  key={cat} 
                  className={`cat-item ${selectedCategory === cat ? 'active' : ''}`} 
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat} <ChevronRight size={14} />
                </div>
              ))}
            </div>
          </aside>



          <main className="content-section">
<div style={{
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: 16
}}>
  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    style={{
      padding: "10px 14px",
      borderRadius: 10,
      border: "1px solid #e2e8f0",
      fontSize: 14
    }}
  >
    <option value="recommended">Recommended</option>
    <option value="low-high">Price: Low to High</option>
  </select>
</div>

<div className="mobile-action-bar">
  <button
    className="btn-filter"
    onClick={() => setShowMobileFilters(true)}
  >
    Filters
  </button>
</div>
{showMobileFilters && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.4)",
      zIndex: 1000,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
    }}
    onClick={() => setShowMobileFilters(false)}
  >
    <div
      style={{
        background: "#fff",
        width: "90%",
        maxWidth: 320,
        height: "80%",
        borderRadius: 20,
        padding: 20,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h3>Filters</h3>
        <button 
          onClick={() => setShowMobileFilters(false)} 
          style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer' }}
        >
          ✕
        </button>
      </div>

      <button 
        style={{
          width:'100%',
          padding: 12,
          background:'#5d5fef',
          color:'#fff',
          border:'none',
          borderRadius:10,
          fontWeight:600,
          marginBottom:20
        }}
        onClick={() => { setSelectedCategory("All"); setShowMobileFilters(false); }}
      >
        All Categories
      </button>

      {categories.map(cat => (
        <div 
          key={cat} 
          className={`cat-item ${selectedCategory === cat ? 'active' : ''}`} 
          onClick={() => { setSelectedCategory(cat); setShowMobileFilters(false); }}
          style={{ marginBottom: 6 }}
        >
          {cat} <ChevronRight size={14} />
        </div>
      ))}
    </div>
  </div>
)}
            <div className="header-text">
              <h1>Shop Our Collection</h1>
              <p>Select a category to explore products</p>
            </div>

           <div className="search-wrapper">
  <input
    type="text"
    placeholder="Search products..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <Search
    size={18}
    style={{ position: "absolute", right: 12, top: 12, color: "#94a3b8" }}
  />
</div>





            <div className="product-grid">
              {products
    .filter(p =>
      (selectedCategory === "All" || p.category === selectedCategory) &&
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "low-high") {
        return (a.price || 0) - (b.price || 0);
      }
      return 0; // recommended

    })
                .map(p => (
                  <div key={p.id} className="product-card" onClick={() => handleProductClick(p)}>
                    <div className="img-box">
                      <img src={p.img} alt={p.name} />
                      <div className="badge-off">{p.discount} OFF</div>
                    </div>
                    <div className="info">
                      <div className="brand">ELAN COTTS</div>
                      <h4>{p.name}</h4>
                      <div className="meta-row">
                        <span>{p.rating} ({p.reviews})</span>
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={10} fill={i < Math.floor(p.rating) ? "#fbbf24" : "none"} stroke="#fbbf24" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </main>
        </div>

        {/* FULL MOBILE SCREEN FILTER */}
       {showMobileFilters && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.4)",
      zIndex: 1000,
      display: "flex",
      justifyContent: "center",
      alignItems: "center", // center vertically
      padding: 10,
    }}
    onClick={() => setShowMobileFilters(false)}
  >
    <div
      style={{
        background: "#fff",
        width: "90%",          // slightly narrower than full width
        maxWidth: 320,
        height: "80%",         // reduced height
        borderRadius: 20,
        padding: 20,
        overflowY: "auto",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
        <h3>Filters</h3>
        <button onClick={() => setShowMobileFilters(false)} style={{background:'none', border:'none'}}>
          <X size={24} />
        </button>
      </div>

      <button 
        style={{width:'100%', padding:'12px', background:'#5d5fef', color:'white', border:'none', borderRadius:10, fontWeight:600, marginBottom:20}}
        onClick={() => { setSelectedCategory("All"); setShowMobileFilters(false); }}
      >
        All Categories
      </button>

      {categories.map(cat => (
        <div 
          key={cat} 
          className={`cat-item ${selectedCategory === cat ? 'active' : ''}`} 
          onClick={() => { setSelectedCategory(cat); setShowMobileFilters(false); }}
          style={{marginBottom:6}}
        >
          {cat} <ChevronRight size={14} />
        </div>
      ))}
    </div>
  </div>
)}

      </div>
    </>
  );
};

export default ShopPage;
