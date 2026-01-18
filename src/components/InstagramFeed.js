import React from 'react';

const InstagramFeed = () => {
  // Real-style fashion data reflecting your brand's aesthetic
  const posts = [
    { 
      id: 1, 
      img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&h=933&fit=crop", 
      alt: "Elegant Black Saree Detail" 
    },
 
    { 
      id: 3, 
      img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&h=933&fit=crop", 
      alt: "Deep Blue Silk Draping" 
    },
    { 
      id: 4, 
      img: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600&h=933&fit=crop", 
      alt: "Traditional Embroidery Close-up" 
    },
    { 
      id: 5, 
      img: "/blackhoddie.jpeg", 
      alt: "Fashion Model Portrait" 
    },
  ];

  const doublePosts = [...posts, ...posts];

  return (
    <section className="insta-section">
      <style>{`
        .insta-section {
          padding: 80px 0;
          text-align: center;
          background-color: #ffffff;
          overflow: hidden;
        }

        .insta-header {
          margin-bottom: 50px;
        }

        .insta-header h2 {
          font-family: 'Playfair Display', serif; /* Optional: adds a premium look */
          font-size: 2.5rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
        }

        .insta-header p {
          color: #777;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-size: 0.8rem;
        }

        /* Viewport with Side Fades */
        .insta-marquee-viewport {
          position: relative;
          width: 100%;
          margin-bottom: 50px;
        }

        /* The Gradient Overlay for a 'Premium' look */
        .insta-marquee-viewport::before,
        .insta-marquee-viewport::after {
          content: "";
          position: absolute;
          top: 0;
          width: 150px;
          height: 100%;
          z-index: 2;
          pointer-events: none;
        }

        .insta-marquee-viewport::before {
          left: 0;
          background: linear-gradient(to right, white, transparent);
        }

        .insta-marquee-viewport::after {
          right: 0;
          background: linear-gradient(to left, white, transparent);
        }

        .insta-track {
          display: flex;
          width: max-content;
          gap: 20px;
          animation: scroll 40s linear infinite;
        }

        .insta-track:hover {
          animation-play-state: paused;
        }

        .insta-card {
          flex: 0 0 280px;
          aspect-ratio: 9 / 14;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .insta-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .insta-card:hover img {
          transform: scale(1.1);
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 10px)); }
        }

        .insta-btn {
          background-color: #1e4d82;
          color: white;
          padding: 16px 40px;
          border-radius: 100px;
          border: none;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(30, 77, 130, 0.2);
        }

        .insta-btn:hover {
          background-color: #153a63;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(30, 77, 130, 0.3);
        }

        @media (max-width: 768px) {
          .insta-header h2 { font-size: 1.8rem; }
          .insta-card { flex: 0 0 200px; }
          .insta-marquee-viewport::before, .insta-marquee-viewport::after { width: 50px; }
        }
      `}</style>

      <div className="insta-header">
        <h2>From Our Instagram</h2>
        <p>Real moments • Real products • Real stories</p>
      </div>

      <div className="insta-marquee-viewport">
        <div className="insta-track">
          {doublePosts.map((post, index) => (
            <div key={`${post.id}-${index}`} className="insta-card">
              <img src={post.img} alt={post.alt} />
            </div>
          ))}
        </div>
      </div>

      <button className="insta-btn" onClick={() => window.open('https://instagram.com/elancotts', '_blank')}>
        View More on Instagram
      </button>
    </section>
  );
};

export default InstagramFeed;