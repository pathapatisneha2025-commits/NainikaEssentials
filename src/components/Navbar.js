import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// Added more icons for each category
import { 
  FiMenu, FiX, FiShoppingCart, FiUser, 
  FiHome, FiShoppingBag, FiPackage, FiInfo, FiPhone 
} from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Helper to check if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        .navbar {
          height: 80px;
          padding: 0 40px;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 1000;
          font-family: 'Inter', sans-serif;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          font-size: 20px;
          color: #1a1a1a;
          text-decoration: none;
        }

        .logo img { height: 35px; }

        .nav-links {
          display: flex;
          align-items: center;
          background: #f0f2ff;
          padding: 6px 10px;
          border-radius: 50px;
          gap: 5px;
        }

        .nav-item {
          text-decoration: none;
          color: #666;
          font-weight: 500;
          font-size: 15px;
          padding: 10px 20px;
          border-radius: 40px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Active styling - Matches screenshot */
        .nav-item.active {
          background: #e0e4ff;
          color: #5b5bf0;
        }

        .nav-item:hover:not(.active) {
          background: rgba(91, 91, 240, 0.05);
        }

        .nav-icons {
          display: flex;
          gap: 25px;
          font-size: 22px;
          color: #333;
          align-items: center;
        }

        .icon-btn { cursor: pointer; transition: color 0.2s; }
        .icon-btn:hover { color: #5b5bf0; }

        .hamburger { display: none; }

        @media (max-width: 992px) {
          .nav-links {
            position: absolute;
            top: 80px;
            left: 0;
            width: 100%;
            background: white;
            flex-direction: column;
            border-radius: 0;
            padding: 20px 0;
            display: ${open ? "flex" : "none"};
            box-shadow: 0 10px 15px rgba(0,0,0,0.05);
          }
          .hamburger { display: block; cursor: pointer; font-size: 24px; }
          .nav-icons { display: none; }
        }
      `}</style>

      <header className="navbar">
        <Link to="/" className="logo">
          <img src="/logoimage.jpeg" alt="ElanCotts" />
          <span>Nainika Essentials</span>
        </Link>

        <nav className="nav-links">
          {/* Home Link */}
          <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`} onClick={() => setOpen(false)}>
            {isActive('/') && <FiHome size={18} />} Home
          </Link>

          {/* Shop Link */}
          <Link to="/shop" className={`nav-item ${isActive('/shop') ? 'active' : ''}`} onClick={() => setOpen(false)}>
            {isActive('/shop') && <FiShoppingBag size={18} />} Shop
          </Link>

          {/* Orders Link */}
          <Link to="/orders" className={`nav-item ${isActive('/orders') ? 'active' : ''}`} onClick={() => setOpen(false)}>
            {isActive('/orders') && <FiPackage size={18} />} My Orders
          </Link>

          {/* About Link */}
          <Link to="/about" className={`nav-item ${isActive('/about') ? 'active' : ''}`} onClick={() => setOpen(false)}>
            {isActive('/about') && <FiInfo size={18} />} About
          </Link>

          {/* Contact Link */}
          <Link to="/contact" className={`nav-item ${isActive('/contact') ? 'active' : ''}`} onClick={() => setOpen(false)}>
            {isActive('/contact') && <FiPhone size={18} />} Contact
          </Link>
        </nav>

        <div className="nav-icons">
<Link to="/login" className="icon-link-wrapper">
  <FiUser className="icon-btn" />
</Link>          <FiShoppingCart className="icon-btn" />
        </div>

        <div className="hamburger" onClick={() => setOpen(!open)}>
          {open ? <FiX /> : <FiMenu />}
        </div>
      </header>
    </>
  );
}