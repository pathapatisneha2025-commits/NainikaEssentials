import React from 'react';

const FAQ = () => {
  return (
    <section className="faq-wrapper">
      <style>{`
        .faq-wrapper {
          max-width: 900px;
          margin: 40px auto;
          padding: 0 20px;
          font-family: 'Inter', sans-serif;
        }

        .faq-header h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 40px;
          text-align: center;
          color: #1a1a1a;
        }

        .faq-section-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #333;
          margin: 35px 0 15px 0;
          border-bottom: 2px solid #e0e0e0;
          padding-bottom: 5px;
        }

        .faq-item {
          margin-bottom: 20px;
        }

        .faq-question {
          font-weight: 600;
          color: #1a1a1a;
          font-size: 1rem;
          margin-bottom: 6px;
          display: block;
        }

        .faq-answer {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #555;
          margin: 0;
        }

        .highlight {
          color: #444;
          font-weight: 500;
        }

        @media (max-width: 600px) {
          .faq-section-title { font-size: 1.1rem; }
          .faq-question { font-size: 0.95rem; }
          .faq-answer { font-size: 0.9rem; }
        }
      `}</style>

      <div className="faq-header">
        <h1>Frequently Asked Questions</h1>
      </div>

      {/* General Fabric Questions */}
      <h2 className="faq-section-title">General Fabric Questions</h2>
      <div className="faq-item">
        <span className="faq-question">What makes Elan Cotts fabric "Premium"?</span>
        <p className="faq-answer">
          We use <span className="highlight">extra-long-staple (ELS) cotton</span>, which creates a smoother, stronger fabric that's softer and more resistant to pilling.
        </p>
      </div>
      <div className="faq-item">
        <span className="faq-question">Does your cotton shrink?</span>
        <p className="faq-answer">
          Slight shrinkage (approx. 1-2%) may occur if washed in hot water. Following cold-wash instructions helps maintain size and softness.
        </p>
      </div>

      {/* Care & Maintenance */}
      <h2 className="faq-section-title">Care & Maintenance</h2>
      <div className="faq-item">
        <span className="faq-question">Can I use fabric softener?</span>
        <p className="faq-answer">
          Heavy fabric softeners are not recommended as they can coat fibers and reduce breathability and moisture-wicking properties.
        </p>
      </div>
      <div className="faq-item">
        <span className="faq-question">How do I prevent the colors from fading?</span>
        <p className="faq-answer">
          Wash dark colors with like colors, avoid direct sunlight, and always wash in cold water to preserve vibrant colors.
        </p>
      </div>
      <div className="faq-item">
        <span className="faq-question">How should I store my Elan Cotts garments?</span>
        <p className="faq-answer">
          Fold knit items to avoid hanger bumps; use padded or wooden hangers for woven garments.
        </p>
      </div>

      {/* Sustainability */}
      <h2 className="faq-section-title">Sustainability</h2>
      <div className="faq-item">
        <span className="faq-question">Is your cotton ethically sourced?</span>
        <p className="faq-answer">
          Yes. We work with suppliers who follow fair labor practices and environmentally conscious processing.
        </p>
      </div>
    </section>
  );
};

export default FAQ;
