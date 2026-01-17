import React, { useState } from 'react';

const FAQ = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="faq-wrapper">
      <style>{`
        .faq-wrapper {
          max-width: 900px;
          margin: 40px auto;
          padding: 0 20px;
          font-family: 'Inter', sans-serif;
        }

        .faq-container {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
          background: #fff;
        }

        /* Header / Toggle Area */
        .faq-header {
          padding: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          background-color: #fff;
          transition: background-color 0.2s ease;
        }

        .faq-header:hover {
          background-color: #f9f9f9;
        }

        .faq-header h2 {
          font-size: 0.9rem;
          font-weight: 500;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin: 0;
        }

        .faq-icon {
          font-size: 1.5rem;
          color: #888;
          transition: transform 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
        }

        /* Content Area */
        .faq-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease-out, padding 0.3s ease;
          background-color: #fff;
          padding: 0 24px;
        }

        .faq-content.open {
          max-height: 2000px; /* High enough to contain all text */
          padding: 0 24px 40px 24px;
          border-top: 1px solid #f0f0f0;
        }

        /* Typography Inside */
        .faq-section-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
          margin: 30px 0 15px 0;
        }

        .faq-item {
          margin-bottom: 20px;
        }

        .faq-question {
          font-weight: 600;
          color: #1a1a1a;
          font-size: 0.95rem;
          margin-bottom: 6px;
          display: block;
        }

        .faq-answer {
          font-size: 0.9rem;
          line-height: 1.6;
          color: #777;
          margin: 0;
        }

        .highlight {
          color: #444;
          font-weight: 500;
        }

        /* Mobile Adjustments */
        @media (max-width: 600px) {
          .faq-header { padding: 18px; }
          .faq-header h2 { font-size: 0.8rem; }
          .faq-section-title { font-size: 1rem; }
        }
      `}</style>

      <div className="faq-container">
        <div className="faq-header" onClick={toggleAccordion}>
          <h2>Frequently Asked Questions</h2>
          <span className="faq-icon">{isOpen ? '−' : '+'}</span>
        </div>

        <div className={`faq-content ${isOpen ? 'open' : ''}`}>
          
          {/* General Fabric Questions */}
          <h3 className="faq-section-title">General Fabric Questions</h3>
          
          <div className="faq-item">
            <span className="faq-question">What makes Elan Cotts fabric "Premium"?</span>
            <p className="faq-answer">
              We use <span className="highlight">extra-long-staple (ELS) cotton</span>. Unlike standard cotton, these longer fibers create a smoother surface with fewer ends sticking out, resulting in a fabric that is softer, stronger, and more resistant to pilling.
            </p>
          </div>

          <div className="faq-item">
            <span className="faq-question">Does your cotton shrink?</span>
            <p className="faq-answer">
              Because we use high-density weaves, shrinkage is minimal. However, because it is a 100% natural fiber, slight shrinkage (approx. 1-2%) may occur if washed in hot water. Following our cold-wash instructions will prevent this.
            </p>
          </div>

          {/* Care & Maintenance */}
          <h3 className="faq-section-title">Care & Maintenance</h3>

          <div className="faq-item">
            <span className="faq-question">Can I use fabric softener?</span>
            <p className="faq-answer">
              We recommend avoiding heavy fabric softeners. Our cotton is naturally soft; chemical softeners can actually coat the fibers, reducing the fabric's natural breathability and moisture-wicking properties.
            </p>
          </div>

          <div className="faq-item">
            <span className="faq-question">How do I prevent the colors from fading?</span>
            <p className="faq-answer">
              To keep colors deep and rich, always wash dark colors with like colors, stay away from direct sunlight when drying, and always wash in cold water.
            </p>
          </div>

          <div className="faq-item">
            <span className="faq-question">How should I store my Elan Cotts garments?</span>
            <p className="faq-answer">
              For knit items (like tees), we recommend folding them to prevent "hanger bumps." For woven shirts or dresses, use padded or wooden hangers to maintain the shoulder structure.
            </p>
          </div>

          {/* Sustainability */}
          <h3 className="faq-section-title">Sustainability</h3>

          <div className="faq-item">
            <span className="faq-question">Is your cotton ethically sourced?</span>
            <p className="faq-answer">
              Yes. Quality starts at the source. We work with suppliers who prioritize fair labor practices and environmentally conscious processing to ensure your garment feels as good as it looks.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;