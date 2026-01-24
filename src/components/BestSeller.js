import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const BestSellers = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("bestseller"); // Default filter

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const res = await fetch("https://nainikaessentialsdatabas.onrender.com/bestseller/all");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on type
  const filteredProducts = products.filter(product => product.type === filterType);

  return (
    <div style={styles.container}>
      <div className="header-section" style={styles.header}>
        <div>
          <h2 style={styles.title}>Best Sellers</h2>
          <p style={styles.subtitle}>Customer favorites crafted for comfort, fit, and everyday style.</p>
        </div>
        <Link to="/shop" style={{ textDecoration: "none" }}>
          <button style={styles.viewAllBtn}>View all &rsaquo;</button>
        </Link>
      </div>

      {/* Filter dropdown */}
      {/* <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Filter by type:</label>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ padding: '6px 10px', borderRadius: '6px' }}>
          <option value="bestseller">Best Seller</option>
          <option value="featured">Featured</option>
          <option value="newarrival">New Arrival</option>
        </select>
      </div> */}

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '20px' }}>
          {filteredProducts.length === 0 ? (
            <p>No products found for "{filterType}".</p>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="card" style={styles.card}>
                <div style={styles.imageContainer} onClick={() => navigate(`/product/${product.id}`)}>
                  <img src={product.main_image} alt={product.name} style={styles.image} />
                  <span style={styles.badgeLeft}>{product.type === 'bestseller' ? 'Best Seller' : product.type === 'featured' ? 'Featured' : 'New Arrival'}</span>
                  <span style={styles.badgeRight}>{product.discount || "Best Deal"}</span>
                </div>

                <div style={styles.details}>
                  <p style={styles.brand}>ELAN COTTS</p>
                  <h3 style={styles.productName}>{product.name}</h3>
                  <div style={styles.ratingRow}>
                    {product.reviews && product.reviews.length > 0 ? (
                      (() => {
                        const avgRating = product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length;
                        const fullStars = Math.floor(avgRating);
                        const emptyStars = 5 - fullStars;
                        return <span style={styles.stars}>{"★".repeat(fullStars)}{"☆".repeat(emptyStars)}</span>;
                      })()
                    ) : (
                      <span style={styles.noRating}>No ratings</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '40px 5%', fontFamily: 'Arial, sans-serif', backgroundColor: '#fff' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  title: { fontSize: '2rem', margin: '0 0 8px 0', color: '#333' },
  subtitle: { color: '#666', margin: 0 },
  viewAllBtn: { padding: '10px 20px', borderRadius: '25px', border: '1px solid #5a4ad1', backgroundColor: 'transparent', color: '#5a4ad1', cursor: 'pointer', fontWeight: 'bold' },
  card: { backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', marginBottom: '30px' },
  imageContainer: { position: 'relative', height: '350px', backgroundColor: '#f4f4f4' },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  badgeLeft: { position: 'absolute', top: '10px', left: '0', backgroundColor: '#f39c12', color: 'white', padding: '4px 8px', fontSize: '0.7rem', fontWeight: 'bold' },
  badgeRight: { position: 'absolute', top: '10px', right: '10px', backgroundColor: '#e74c3c', color: 'white', padding: '4px 8px', fontSize: '0.7rem', fontWeight: 'bold' },
  details: { padding: '15px 0' },
  brand: { fontSize: '0.7rem', color: '#888', letterSpacing: '1px', marginBottom: '5px' },
  productName: { fontSize: '0.95rem', margin: '0 0 8px 0', color: '#222', fontWeight: '600' },
  ratingRow: { display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' },
  stars: { color: 'gold', fontSize: '0.9rem' },
  noRating: { color: '#777', fontSize: '0.8rem' },
};

export default BestSellers;
