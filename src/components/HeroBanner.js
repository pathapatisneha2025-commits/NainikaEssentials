import React from 'react';

const FeaturedSection = () => {
  const products = [
    {
      id: 1,
      name: "Slim Fit Cotton Shirt",
      brand: "ELAN COTTS",
      discount: "50% OFF",
      options: "2 colours available",
      img: "/shirts.jpeg"
    },
    {
      id: 2,
      name: "Elan Cotts Slim Fit Cotton Pant",
      brand: "ELAN COTTS",
      discount: "43% OFF",
      options: "2 colours available",
      img: "/pants.jpeg"
    },
    {
      id: 3,
      name: "Elan Cotts Slim Fit Shirt",
      brand: "ELAN COTTS",
      discount: "25% OFF",
      options: "2 colours available",
      img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 4,
        name: "Casual Denim Jacket",
        brand: "ELAN COTTS",
        discount: "30% OFF",
        options: "1 colour available",
        img: "/hoodie.jpeg"
      }
  ];

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

      {/* Hero Banner Area */}
      <section className="hero-container" style={styles.heroContainer}>
        <div style={styles.overlay}></div>
        <div style={styles.contentGrid}>
          <div className="hero-content" style={styles.leftSide}>
            <span style={styles.label}>FASHION PRESENTATION</span>
            <h1 style={styles.mainTitle}>FASHION</h1>
            <p style={styles.url}>WWW.ELANCOTTS.COM</p>
          </div>
          <div style={styles.rightSide} className="brand-side-text">
            <span style={styles.brandSide}>ELAN COTTS</span>
          </div>
        </div>
      </section>

      {/* Heading matching Screenshot */}
      <div className="header-info" style={styles.footerText}>
        <h2 style={styles.sectionHeading}>Featured Collections</h2>
        <p style={styles.sectionSubheading}>Handpicked styles that define our signature look</p>
      </div>

      {/* Smaller Compact Product Grid */}
      <div className="product-grid">
        {products.map((item, index) => (
          <div key={item.id} className="product-card" style={styles.card}>
            <div style={styles.imageWrapper}>
              <img src={item.img} alt={item.name} style={styles.productImg} />
              <div style={styles.discountTag}>{item.discount}</div>
              
              {/* Force 'View Details' to show on 2nd card to mimic your screenshot exactly */}
              <button 
                className="hover-btn" 
                style={{...styles.viewBtn, opacity: index === 1 ? 1 : 0}}
              >
                View Details
              </button>
            </div>
            
            <div style={styles.cardContent}>
              <p style={styles.cardBrand}>{item.brand}</p>
              <h3 style={styles.cardTitle}>{item.name}</h3>
              <p style={styles.cardOptions}>{item.options}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: { width: '100%', backgroundColor: '#fff', fontFamily: 'Arial, sans-serif' },
  heroContainer: {
    position: 'relative', width: '100%', height: '400px',
    backgroundImage: `url('/featured.jpeg')`,
    backgroundSize: 'cover', backgroundPosition: 'center 20%',
    display: 'flex', alignItems: 'center', overflow: 'hidden', backgroundColor: '#000'
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