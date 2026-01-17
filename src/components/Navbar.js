import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }

        body.menu-open {
          overflow: hidden;
        }

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
          border-bottom: 1px solid #eee;
        }

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

        /* DESKTOP LINKS */
        .nav-links {
          display: flex;
          align-items: center;
          background: #f0f2ff;
          padding: 6px;
          border-radius: 40px;
          gap: 4px;
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
          gap: 8px;
          transition: all 0.25s ease;
        }

        .nav-item.active {
          background: #eef0ff;
          color: #5b5bf0;
          font-weight: 600;
        }

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

        /* MOBILE */
        @media (max-width: 992px) {
          .nav-links {
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            height: calc(100vh - 70px);
            background: #fff;
            flex-direction: column;
            padding: 24px 16px;
            border-radius: 0;
            box-shadow: none;
            display: none;
            overflow-y: auto;
          }

          .nav-links.open {
            display: flex;
          }

          .nav-item {
            width: 100%;
            justify-content: flex-start;
            font-size: 17px;
            padding: 14px 18px;
            border-radius: 14px;
          }

          .nav-item + .nav-item {
            margin-top: 10px;
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
        {/* LOGO */}
        <NavLink
          to="/"
          className="logo"
          onClick={() => setMenuOpen(false)}
        >
          <img src="/logoimage.jpeg" alt="Nainika Essentials" />
          <span>Nainika Essentials</span>
        </NavLink>

        {/* NAV LINKS */}
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" className="nav-item" onClick={() => setMenuOpen(false)}>
            <FiHome /> Home
          </NavLink>

          <NavLink to="/shop" className="nav-item" onClick={() => setMenuOpen(false)}>
            <FiShoppingBag /> Shop
          </NavLink>

          <NavLink to="/orders" className="nav-item" onClick={() => setMenuOpen(false)}>
            <FiPackage /> My Orders
          </NavLink>

          <NavLink to="/about" className="nav-item" onClick={() => setMenuOpen(false)}>
            <FiInfo /> About
          </NavLink>

          <NavLink to="/contact" className="nav-item" onClick={() => setMenuOpen(false)}>
            <FiPhone /> Contact
          </NavLink>
        </nav>

        {/* RIGHT ICONS */}
        <div className="right">
          <div className="nav-icons">
            <NavLink to="/login"><FiUser /></NavLink>
            <NavLink to="/cart"><FiShoppingCart /></NavLink>
          </div>

          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </div>
        </div>
      </header>
    </>
  );
}
