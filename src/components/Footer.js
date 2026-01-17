import React from 'react';
import { FiFacebook, FiInstagram, FiTwitter, FiLinkedin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <style>{`
        .footer-wrapper {
          background-color: #ffffff;
          padding: 60px 20px 20px 20px;
          border-top: 1px solid #f0f0f0;
          font-family: 'Inter', -apple-system, sans-serif;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 40px;
        }

        /* Brand Column */
        .footer-brand .logo-container {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .footer-brand .footer-logo {
          height: 40px; /* Adjusted for footer visibility */
          width: auto;
        }

        .footer-brand h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
        }

        .footer-brand p {
          color: #666;
          font-size: 0.9rem;
          line-height: 1.6;
          max-width: 300px;
        }

        /* Link Columns */
        .footer-column h3 {
          font-size: 0.95rem;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 20px;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li { margin-bottom: 12px; }

        .footer-links a {
          color: #666;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s ease;
        }

        .footer-links a:hover { color: #5b5bf0; }

        /* Social Icons */
        .social-links {
          display: flex;
          gap: 12px;
          margin-top: 20px;
        }

        .social-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #444;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 18px;
        }

        .social-icon:hover {
          background-color: #5b5bf0;
          color: white;
          border-color: #5b5bf0;
          transform: translateY(-3px);
        }

        .footer-bottom {
          margin-top: 60px;
          padding-top: 20px;
          border-top: 1px solid #f0f0f0;
          text-align: center;
          color: #999;
          font-size: 0.8rem;
          letter-spacing: 0.5px;
        }

        @media (max-width: 992px) {
          .footer-container { grid-template-columns: 1fr 1fr; gap: 30px; }
        }

        @media (max-width: 576px) {
          .footer-container { grid-template-columns: 1fr; text-align: center; }
          .footer-brand .logo-container { justify-content: center; }
          .footer-brand p { margin: 0 auto; }
          .social-links { justify-content: center; }
        }
      `}</style>

      <div className="footer-container">
        {/* Column 1: Brand Info with Logo */}
        <div className="footer-brand">
          <div className="logo-container">
            <img 
              src="/logoimage.jpeg" 
              alt="ElanCotts Logo" 
              className="footer-logo" 
            />
            <h2>Nainika Essentials</h2>
          </div>
          <p>
            Premium clothing crafted with quality fabrics, modern fits, and timeless design — 
            made for everyday confidence and comfort.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Column 3: Customer Support */}
        <div className="footer-column">
          <h3>Customer Support</h3>
          <ul className="footer-links">
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
            <li><a href="/returns">Returns & Refunds</a></li>
            <li><a href="/shipping">Shipping Information</a></li>
            <li><a href="/faq">FAQs</a></li>
          </ul>
        </div>

        {/* Column 4: Follow Us */}
        <div className="footer-column">
          <h3>Follow Us</h3>
          <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '15px' }}>
            Stay updated with our latest collections.
          </p>
          <div className="social-links">
            <a href="#" className="social-icon"><FiFacebook /></a>
            <a href="#" className="social-icon"><FiInstagram /></a>
            <a href="#" className="social-icon"><FiTwitter /></a>
            <a href="#" className="social-icon"><FiLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} ElanCotts. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;