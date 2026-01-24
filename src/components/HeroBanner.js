import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const FeaturedSection = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch featured products
  const fetchFeatured = async () => {
    try {
      const res = await fetch("https://nainikaessentialsdatabas.onrender.com/bestseller/all");
      if (!res.ok) throw new Error("Failed to fetch featured products");
      const data = await res.json();
      const featuredProducts = data.filter(p => p.type === "featured");
      setProducts(featuredProducts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatured();
  }, []);
  return (
    <div style={styles.pageWrapper}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

          /* COMPACT 4-COLUMN GRID */
          .product-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr); 
            gap: 20px;
            padding: 0 5% 40px 5%;
          }

          @media (max-width: 1200px) {
            .product-grid { grid-template-columns: repeat(3, 1fr); }
          }

          @media (max-width: 900px) {
            .product-grid { grid-template-columns: repeat(2, 1fr); }
          }

          @media (max-width: 500px) {
            .product-grid { grid-template-columns: repeat(1, 1fr); }
            .hero-container { height: 280px !important; }
            .hero-content h1 { font-size: 2.5rem !important; }
          }

          /* Hover effect for View Details */
          .product-card:hover .hover-btn { 
            opacity: 1 !important; 
            visibility: visible !important;
          }
        `}
      </style>

      <section className="hero-container" style={styles.heroContainer}>
  <div style={styles.overlay}></div>
  <div style={styles.contentGrid}>
    <div className="hero-content" style={styles.leftSide}>
      <span style={styles.label}>FASHION PRESENTATION</span>
      <h1 style={styles.mainTitle}>FASHION</h1>
      <p style={styles.url}>WWW.ELANCOTTS.COM</p>
    </div>
    <div style={styles.rightSide} className="brand-side-text">
      <span style={styles.brandSide}>NainikaEssentials</span>
    </div>
  </div>
</section>


  {/* Heading */}
      <div style={styles.footerText}>
        <h2 style={styles.sectionHeading}>Featured Collections</h2>
        <p style={styles.sectionSubheading}>Handpicked styles that define our signature look</p>
      </div>

      {/* Featured Products Grid */}
      {loading ? (
        <p style={{ padding: "0 5%" }}>Loading featured products...</p>
      ) : products.length === 0 ? (
        <p style={{ padding: "0 5%" }}>No featured products found.</p>
      ) : (
        <div className="product-grid" style={styles.productGrid}>
          {products.map((item) => (
            <div
              key={item.id}
              style={styles.card}
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <div style={styles.imageWrapper}>
                <img src={item.main_image} alt={item.name} style={styles.productImg} />
                <div style={styles.discountTag}>{item.discount || "Best Deal"}</div>
              </div>
              <div style={styles.cardContent}>
                <p style={styles.cardBrand}>ELAN COTTS</p>
                <h3 style={styles.cardTitle}>{item.name}</h3>
                {item.variants?.length > 0 && (
                  <p style={styles.cardOptions}>
                    {item.variants.length} {item.variants.length > 1 ? "options available" : "option available"}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  pageWrapper: { width: '100%', backgroundColor: '#fff', fontFamily: 'Arial, sans-serif' },
  // Inside your styles object, update heroContainer:
heroContainer: {
  position: 'relative',
  width: '100%',
  maxWidth: '1200px',         // Limit maximum width
  margin: '0 auto',           // Center on page
  height: '400px',
  border: '2px solid #ddd',   // Add border
  borderRadius: '10px',       // Rounded corners
  overflow: 'hidden',         // Prevent overflow
  backgroundImage: `url('/featured.jpeg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center 20%',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#000',
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)' // optional shadow for depth
},

  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.3)' },
  contentGrid: { position: 'relative', zIndex: 2, width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 5%', color: '#fff' },
  mainTitle: { fontSize: '6rem', margin: '0', fontWeight: '400', letterSpacing: '8px', fontFamily: '"Playfair Display", serif' },
  label: { letterSpacing: '3px', fontSize: '0.8rem' },
  url: { fontSize: '0.7rem', marginTop: '15px' },
  brandSide: { fontSize: '1.2rem', letterSpacing: '3px' },
  
  footerText: { padding: '40px 5% 20px 5%' },
  sectionHeading: { fontSize: '1.8rem', margin: '0 0 5px 0', color: '#1a1a1a', fontWeight: 'bold' },
  sectionSubheading: { color: '#888', fontSize: '0.9rem', marginBottom: '20px' },
  
  // Compact Card Styles
  card: { cursor: 'pointer', transition: '0.3s' },
  imageWrapper: { 
    position: 'relative', 
    width: '100%', 
    aspectRatio: '0.85', // Makes images slightly taller/slimmer
    backgroundColor: '#f5f5f5', 
    overflow: 'hidden' 
  },
  productImg: { width: '100%', height: '100%', objectFit: 'cover' },
  discountTag: {
    position: 'absolute', top: '0', right: '12px', backgroundColor: '#d0021b',
    color: 'white', padding: '8px 4px', fontSize: '0.6rem', fontWeight: 'bold',
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 88%, 0 100%)'
  },
  viewBtn: {
    position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)',
    padding: '8px 12px', backgroundColor: 'white', border: 'none', borderRadius: '4px',
    transition: '0.3s', fontWeight: 'bold', fontSize: '0.7rem', color: '#333', cursor: 'pointer'
  },
  cardContent: { padding: '12px 0' },
  cardBrand: { fontSize: '0.65rem', color: '#999', margin: '0 0 3px 0', letterSpacing: '0.5px' },
  cardTitle: { fontSize: '0.9rem', margin: '0 0 5px 0', color: '#333', fontWeight: '500' },
  cardOptions: { fontSize: '0.75rem', color: '#aaa' }
};

export default FeaturedSection;