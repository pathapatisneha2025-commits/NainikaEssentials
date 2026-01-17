import React from 'react';

const BestSellers = () => {
const products = [
    {
      id: 1,
      name: "Elegant Onion Pink Silk Saree",
      price: "Best Seller",
      discount: "40% OFF",
      rating: 4.0,
      reviews: 5,
      img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600&h=800"
    },
    {
      id: 2,
      name: "Radiant Gold Tissue Silk Saree",
      price: "Best Seller",
      discount: "52% OFF",
      rating: 3.5,
      reviews: 2,
img: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600&h=800"    },
    {
      id: 3,
      name: "Midnight Noir Sequinned Saree",
      price: "Best Seller",
      discount: "50% OFF",
      rating: 4.5,
      reviews: 12,
      img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600&h=800"
    },
    {
      id: 4,
      name: "Elegant Handloom Silk Blend",
      price: "Best Seller",
      discount: "50% OFF",
      rating: 4.2,
      reviews: 8,
      img: "https://images.unsplash.com/photo-1610030469915-9a08e3922037?auto=format&fit=crop&q=80&w=600&h=800"
    }
  ];
  return (
    <div style={styles.container}>
      <style>
        {`
          /* Mobile Responsive CSS */
          .product-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            padding: 20px 0;
          }

          @media (max-width: 1024px) {
            .product-grid { grid-template-columns: repeat(2, 1fr); }
          }

          @media (max-width: 600px) {
            .product-grid { grid-template-columns: repeat(1, 1fr); }
            .header-section { flex-direction: column; align-items: flex-start !important; }
          }

          .card:hover .view-details { opacity: 1; }
        `}
      </style>

      {/* Header Section */}
      <div className="header-section" style={styles.header}>
        <div>
          <h2 style={styles.title}>Best Sellers</h2>
          <p style={styles.subtitle}>Customer favorites crafted for comfort, fit, and everyday style.</p>
        </div>
        <button style={styles.viewAllBtn}>View all &rsaquo;</button>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="card" style={styles.card}>
            <div style={styles.imageContainer}>
              <img src={product.img} alt={product.name} style={styles.image} />
              <span style={styles.badgeLeft}>Best Seller</span>
              <span style={styles.badgeRight}>{product.discount}</span>
              <button className="view-details" style={styles.viewDetailsBtn}>View Details</button>
            </div>
            
            <div style={styles.details}>
              <p style={styles.brand}>ELAN COTTS</p>
              <h3 style={styles.productName}>{product.name}</h3>
              <div style={styles.ratingRow}>
                <span style={styles.stars}>{"★".repeat(Math.floor(product.rating))}☆</span>
                <span style={styles.ratingText}>{product.rating} ({product.reviews})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Simple CSS-in-JS for structure
const styles = {
  container: {
    padding: '40px 5%',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fff',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: { fontSize: '2rem', margin: '0 0 8px 0', color: '#333' },
  subtitle: { color: '#666', margin: 0 },
  viewAllBtn: {
    padding: '10px 20px',
    borderRadius: '25px',
    border: '1px solid #5a4ad1',
    backgroundColor: 'transparent',
    color: '#5a4ad1',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: 'pointer'
  },
  imageContainer: {
    position: 'relative',
    height: '350px',
    backgroundColor: '#f4f4f4',
  },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  badgeLeft: {
    position: 'absolute', top: '10px', left: '0',
    backgroundColor: '#f39c12', color: 'white',
    padding: '4px 8px', fontSize: '0.7rem', fontWeight: 'bold'
  },
  badgeRight: {
    position: 'absolute', top: '10px', right: '10px',
    backgroundColor: '#e74c3c', color: 'white',
    padding: '4px 8px', fontSize: '0.7rem', fontWeight: 'bold'
  },
  viewDetailsBtn: {
    position: 'absolute', bottom: '20px', left: '50%',
    transform: 'translateX(-50%)',
    padding: '8px 16px', backgroundColor: 'white',
    border: 'none', borderRadius: '4px', fontSize: '0.8rem',
    opacity: 0, transition: '0.3s'
  },
  details: { padding: '15px 0' },
  brand: { fontSize: '0.7rem', color: '#888', letterSpacing: '1px', marginBottom: '5px' },
  productName: { fontSize: '0.95rem', margin: '0 0 8px 0', color: '#222', fontWeight: '600' },
  ratingRow: { display: 'flex', alignItems: 'center', gap: '5px' },
  stars: { color: '#f39c12', fontSize: '0.9rem' },
  ratingText: { fontSize: '0.8rem', color: '#777' }
};

export default BestSellers;