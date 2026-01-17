import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiShoppingCart,
  FiUser,
  FiHome,
  FiShoppingBag,
  FiPackage,
  FiInfo,
  FiPhone,
} from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // ✅ Close menu automatically on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        .navbar {
          height: 80px;
          padding: 0 40px;
          background: #fff;
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
          transition: all 0.3s ease;
        }

        .nav-item.active {
          background: #e0e4ff;
          color: #5b5bf0;
        }

        .nav-item:hover:not(.active) {
          background: rgba(91, 91, 240, 0.08);
        }

        .nav-icons {
          display: flex;
          gap: 22px;
          font-size: 22px;
          color: #333;
          align-items: center;
        }

        .icon-btn { cursor: pointer; }

        .hamburger {
          display: none;
          font-size: 26px;
          cursor: pointer;
        }

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
            box-shadow: 0 10px 20px rgba(0,0,0,0.08);
            display: ${open ? "flex" : "none"};
          }

          .nav-item {
            width: 100%;
            justify-content: center;
            font-size: 16px;
          }

          .nav-icons { display: none; }
          .hamburger { display: block; }
        }
      `}</style>

      <header className="navbar">
        <Link to="/" className="logo">
          <img src="/logoimage.jpeg" alt="Nainika Essentials" />
          <span>Nainika Essentials</span>
        </Link>

        <nav className="nav-links">
          <Link to="/" className={`nav-item ${isActive("/") ? "active" : ""}`}>
            {isActive("/") && <FiHome />} Home
          </Link>

          <Link to="/shop" className={`nav-item ${isActive("/shop") ? "active" : ""}`}>
            {isActive("/shop") && <FiShoppingBag />} Shop
          </Link>

          <Link to="/orders" className={`nav-item ${isActive("/orders") ? "active" : ""}`}>
            {isActive("/orders") && <FiPackage />} My Orders
          </Link>

          <Link to="/about" className={`nav-item ${isActive("/about") ? "active" : ""}`}>
            {isActive("/about") && <FiInfo />} About
          </Link>

          <Link to="/contact" className={`nav-item ${isActive("/contact") ? "active" : ""}`}>
            {isActive("/contact") && <FiPhone />} Contact
          </Link>
        </nav>

        <div className="nav-icons">
          <Link to="/login">
            <FiUser className="icon-btn" />
          </Link>
          <FiShoppingCart className="icon-btn" />
        </div>

        <div className="hamburger" onClick={() => setOpen(!open)}>
          {open ? <FiX /> : <FiMenu />}
        </div>
      </header>
    </>
  );
}
