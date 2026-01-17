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

        .logo img { height: 32px; }

        .nav-links {
          display: none;
          align-items: center;
          background: #f0f2ff;
          padding: 6px;
          border-radius: 40px;
          gap: 4px;
        }

        .nav-links.open { display: flex; }

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

          .nav-icons { display: none; }
          .hamburger { display: block; }
        }
      `}</style>

      <header className="navbar">
        {/* LEFT */}
        <NavLink
          to="/"
          className="logo"
          onClickCapture={() => setMenuOpen(false)}
        >
          <img src="/logoimage.jpeg" alt="Nainika Essentials" />
          <span>Nainika Essentials</span>
        </NavLink>

        {/* CENTER */}
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <NavLink
            to="/"
            className="nav-item"
            onClickCapture={() => setMenuOpen(false)}
          >
            <FiHome /> Home
          </NavLink>

          <NavLink
            to="/shop"
            className="nav-item"
            onClickCapture={() => setMenuOpen(false)}
          >
            <FiShoppingBag /> Shop
          </NavLink>

          <NavLink
            to="/orders"
            className="nav-item"
            onClickCapture={() => setMenuOpen(false)}
          >
            <FiPackage /> My Orders
          </NavLink>

          <NavLink
            to="/about"
            className="nav-item"
            onClickCapture={() => setMenuOpen(false)}
          >
            <FiInfo /> About
          </NavLink>

          <NavLink
            to="/contact"
            className="nav-item"
            onClickCapture={() => setMenuOpen(false)}
          >
            <FiPhone /> Contact
          </NavLink>
        </nav>

        {/* RIGHT */}
        <div className="right">
          <div className="nav-icons">
            <NavLink to="/login">
              <FiUser />
            </NavLink>
            <NavLink to="/cart">
              <FiShoppingCart />
            </NavLink>
          </div>

          <div
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </div>
        </div>
      </header>
    </>
  );
}
