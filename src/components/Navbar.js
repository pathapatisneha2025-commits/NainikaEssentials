import React, { useState, useEffect } from "react";
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
  const [cartCount, setCartCount] = useState(0);

  // Lock background scroll when menu opens
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  // Update cart count from localStorage
  const updateCartCount = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = storedCart.reduce((acc, item) => acc + item.qty, 0);
    setCartCount(count);
  };

  useEffect(() => {
    updateCartCount();
    // Listen for storage changes from other tabs/windows
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

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
          border-bottom: 1px solid #eee;
          font-family: 'Inter', sans-serif;
        }

        .logo { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 18px; color: #1a1a1a; text-decoration: none; white-space: nowrap; }
        .logo img { height: 32px; }

        .nav-links { display: flex; align-items: center; background: #f0f2ff; padding: 6px; border-radius: 40px; gap: 4px; }
        .nav-item { text-decoration: none; color: #666; font-size: 14px; font-weight: 500; padding: 10px 16px; border-radius: 30px; display: flex; align-items: center; gap: 8px; }
        .nav-item.active { background: #eef0ff; color: #5b5bf0; font-weight: 600; }

        .right { display: flex; align-items: center; gap: 18px; position: relative; }
        .nav-icons { display: flex; gap: 18px; font-size: 22px; color: #333; position: relative; }

        .cart-badge {
          position: absolute;
          top: -8px;
          right: -10px;
          background: red;
          color: white;
          border-radius: 50%;
          font-size: 12px;
          padding: 2px 6px;
          font-weight: 600;
        }

        .hamburger { display: none; font-size: 26px; cursor: pointer; }

        /* MOBILE */
        .mobile-icons { display: none; }

        @media (max-width: 992px) {
          .nav-links { display: none !important; }
          .nav-links.open {
            display: flex !important;
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            height: calc(100vh - 70px);
            background: #fff;
            flex-direction: column;
            padding: 24px 16px;
            z-index: 999;
            overflow-y: auto;
          }
          .nav-item { width: 100%; font-size: 17px; padding: 14px 18px; border-radius: 14px; }
          .nav-item + .nav-item { margin-top: 10px; }

          /* Show icons inside mobile menu */
          .mobile-icons { display: flex; gap: 18px; font-size: 26px; margin-top: 24px; justify-content: center; }

          /* Hide desktop icons on mobile */
          .nav-icons { display: none; }
          .hamburger { display: block; }
        }
      `}</style>

      <header className="navbar">
        {/* LOGO */}
        <NavLink to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <img src="/logoimage.jpeg" alt="Nainika Essentials" />
          <span>Nainika Essentials</span>
        </NavLink>

        {/* MENU LINKS */}
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

          {/* MOBILE ICONS */}
          <div className="mobile-icons">
            <NavLink to="/login" onClick={() => setMenuOpen(false)}><FiUser /></NavLink>
            <NavLink to="/cart" onClick={() => setMenuOpen(false)}>
              <FiShoppingCart />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </NavLink>
          </div>
        </nav>

        {/* DESKTOP ICONS */}
        <div className="right">
          <div className="nav-icons">
            <NavLink to="/login"><FiUser /></NavLink>
            <NavLink to="/cart">
              <FiShoppingCart />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </NavLink>
          </div>

          {/* HAMBURGER */}
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </div>
        </div>
      </header>
    </>
  );
}
