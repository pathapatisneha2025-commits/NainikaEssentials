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

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }

        .navbar {
          height: 70px;
          padding: 0 16px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 1000;
          font-family: 'Inter', sans-serif;
        }

        /* LOGO */
        .logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          font-size: 18px;
          color: #1a1a1a;
          text-decoration: none;
          white-space: nowrap;
        }

        .logo img {
          height: 32px;
        }

        /* NAV LINKS (HIDDEN BY DEFAULT) */
        .nav-links {
          display: none; /* 🔴 IMPORTANT FIX */
          align-items: center;
          background: #f0f2ff;
          padding: 6px;
          border-radius: 40px;
          gap: 4px;
        }

        .nav-links.open {
          display: flex;
        }

        .nav-item {
          text-decoration: none;
          color: #666;
          font-weight: 500;
          font-size: 14px;
          padding: 10px 16px;
          border-radius: 30px;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.25s ease;
        }

        .nav-item.active {
          background: #e0e4ff;
          color: #5b5bf0;
        }

        /* RIGHT SIDE */
        .right {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .nav-icons {
          display: flex;
          gap: 18px;
          font-size: 22px;
          color: #333;
        }

        .hamburger {
          display: none;
          font-size: 26px;
          cursor: pointer;
        }

        /* ===== MOBILE ===== */
        @media (max-width: 992px) {
          .nav-links {
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            background: #fff;
            flex-direction: column;
            padding: 16px 0;
            border-radius: 0;
            box-shadow: 0 12px 24px rgba(0,0,0,0.1);
          }

          .nav-item {
            width: 100%;
            justify-content: center;
            font-size: 16px;
            padding: 14px 0;
          }

          .nav-icons {
            display: none;
          }

          .hamburger {
            display: block;
          }
        }
      `}</style>

      <header className="navbar">
        {/* LEFT */}
        <Link to="/" className="logo">
          <img src="/logoimage.jpeg" alt="Nainika Essentials" />
          <span>Nainika Essentials</span>
        </Link>

        {/* CENTER / MOBILE MENU */}
        <nav className={`nav-links ${open ? "open" : ""}`}>
          <Link to="/" className={`nav-item ${isActive("/") ? "active" : ""}`}>
            <FiHome /> Home
          </Link>
          <Link to="/shop" className={`nav-item ${isActive("/shop") ? "active" : ""}`}>
            <FiShoppingBag /> Shop
          </Link>
          <Link to="/orders" className={`nav-item ${isActive("/orders") ? "active" : ""}`}>
            <FiPackage /> My Orders
          </Link>
          <Link to="/about" className={`nav-item ${isActive("/about") ? "active" : ""}`}>
            <FiInfo /> About
          </Link>
          <Link to="/contact" className={`nav-item ${isActive("/contact") ? "active" : ""}`}>
            <FiPhone /> Contact
          </Link>
        </nav>

        {/* RIGHT */}
        <div className="right">
          <div className="nav-icons">
            <Link to="/login">
              <FiUser />
            </Link>
            <FiShoppingCart />
          </div>

          <div className="hamburger" onClick={() => setOpen(!open)}>
            {open ? <FiX /> : <FiMenu />}
          </div>
        </div>
      </header>
    </>
  );
}
