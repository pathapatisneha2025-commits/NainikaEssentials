import React from 'react';

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      rating: 5,
      text: "Truly premium quality shirts and T-shirts. The stitching and finish are world-class. Customer service is helpful and delivery is fast.",
      author: "Anil K."
    },
    {
      id: 2,
      rating: 5,
      text: "Best formal shirts I have ever purchased online. The cotton material is breathable and high quality. Fits perfectly across the shoulders.",
      author: "Suresh M."
    },
    {
      id: 3,
      rating: 5,
      text: "The mirror work on my onion pink saree is stunning. It looks even better in person than in the photos. ElanCotts understands trends perfectly.",
      author: "Megha S."
    },
    {
      id: 4,
      rating: 4,
      text: "Impressive range of casual T-shirts for daily use. The colors remain vibrant even after several washes. Very soft on the skin.",
      author: "Vikram P."
    }
  ];

  // Doubling the array for infinite scroll
  const scrollItems = [...reviews, ...reviews];

  return (
    <section className="reviews-section">
      <style>{`
        .reviews-section {
          padding: 80px 0;
          background-color: #fcfcfc;
          overflow: hidden;
          text-align: center;
        }

        .reviews-header {
          margin-bottom: 50px;
          padding: 0 20px;
        }

        .reviews-header h2 {
          font-size: 2.2rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 10px;
        }

        .reviews-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #666;
          font-size: 0.95rem;
        }

        .star-icon { color: #ffb400; font-size: 1.2rem; }

        /* Marquee Container */
        .reviews-viewport {
          width: 100%;
          position: relative;
          display: flex;
        }

        .reviews-track {
          display: flex;
          gap: 24px;
          padding: 20px 0;
          animation: scrollReviews 45s linear infinite; /* Slower than insta for readability */
          width: max-content;
        }

        .reviews-track:hover {
          animation-play-state: paused;
        }

        /* Testimonial Card */
        .review-card {
          flex: 0 0 350px;
          background: #ffffff;
          padding: 30px;
          border-radius: 16px;
          border: 1px solid #f0f0f0;
          text-align: left;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .card-stars {
          color: #ffb400;
          margin-bottom: 15px;
          letter-spacing: 2px;
        }

        .review-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #444;
          margin-bottom: 20px;
          min-height: 80px;
        }

        .review-author {
          font-weight: 600;
          color: #1a1a1a;
          font-size: 0.9rem;
        }

        /* Animation */
        @keyframes scrollReviews {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 12px)); }
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .reviews-header h2 { font-size: 1.8rem; }
          .review-card { flex: 0 0 280px; padding: 20px; }
          .reviews-track { animation-duration: 30s; }
        }
      `}</style>

      <div className="reviews-header">
        <h2>Our customers love us</h2>
        <div className="reviews-stats">
          <span className="star-icon">★</span>
          <strong>4.8 star</strong> based on 611 customer reviews
        </div>
      </div>

      <div className="reviews-viewport">
        <div className="reviews-track">
          {scrollItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="review-card">
              <div>
                <div className="card-stars">
                  {"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}
                </div>
                <p className="review-text">"{item.text}"</p>
              </div>
              <div className="review-author">{item.author}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;