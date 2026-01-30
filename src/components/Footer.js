import React from 'react';
import { Link } from "react-router-dom";

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
          .disabled-icon {
  cursor: not-allowed;
  opacity: 0.5;
}

.disabled-icon:hover {
  background-color: #fff; /* prevent hover effect */
  color: #444;
  transform: none;
  border-color: #e0e0e0;
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
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 3: Customer Support */}
        <div className="footer-column">
          <h3>Customer Support</h3>
          <ul className="footer-links">
            <li><Link to="/privacypolicy">Privacy Policy</Link></li>
            <li><Link to="/termsconditions">Terms & Conditions</Link></li>
            <li><Link to="/refund">Returns & Refunds</Link></li>
            <li><Link to="/shippolicy">Shipping Information</Link></li>
            <li><Link to="/faq">FAQs</Link></li>
          </ul>
        </div>

        {/* Column 4: Follow Us */}
        <div className="social-links">
  <a 
    href="https://www.facebook.com/YourPage" 
    className="social-icon" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    <FiFacebook />
  </a>
  
  <a 
    href="https://www.instagram.com/YourPage" 
    className="social-icon" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    <FiInstagram />
  </a>
  
  <span 
    className="social-icon disabled-icon" 
    title="Twitter currently disabled"
  >
    <FiTwitter />
  </span>
  
  <a 
    href="https://www.linkedin.com/in/YourPage" 
    className="social-icon" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    <FiLinkedin />
  </a>
</div>

      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} ElanCotts. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;