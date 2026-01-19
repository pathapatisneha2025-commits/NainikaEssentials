import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
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
  FiLogOut,
  FiChevronRight
} from "react-icons/fi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [showPopup, setShowPopup] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("adminUser"));
  const navigate = useNavigate();
  const location = useLocation();

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Update cart count
  const updateCartCount = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = storedCart.reduce((acc, item) => acc + item.qty, 0);
    setCartCount(count);
  };

  // Sync login state and cart count on mount and storage change
  useEffect(() => {
    updateCartCount();

    const handleStorageChange = () => {
      setCartCount(
        (JSON.parse(localStorage.getItem("cart")) || []).reduce(
          (acc, item) => acc + item.qty,
          0
        )
      );
      setIsLoggedIn(!!localStorage.getItem("adminUser"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Ensure isLoggedIn updates on every route change
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("adminUser"));
  }, [location.pathname]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    setIsLoggedIn(false);
    setMenuOpen(false);
    navigate("/login", { replace: true });
  };

  const handleViewOffers = () => {
    setShowPopup(false);
    navigate("/category/clothing");
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .navbar { height: 80px; padding: 0 5%; background: #fff; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 1000; border-bottom: 1px solid #f0f0f0; font-family: 'Inter', sans-serif; }
        .logo { font-weight: 700; font-size: 22px; color: #1a1a1a; text-decoration: none; }
        .nav-center { display: flex; align-items: center; background: #f3f4ff; padding: 6px; border-radius: 40px; gap: 4px; }
        .nav-item { text-decoration: none; color: #666; font-size: 14px; font-weight: 500; padding: 10px 20px; border-radius: 30px; display: flex; align-items: center; gap: 8px; transition: 0.3s; }
        .nav-item svg { display: none; }
        .nav-item.active { background: #fff; color: #5b5bf0; font-weight: 600; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .nav-item.active svg { display: block; }
        .nav-right { display: flex; align-items: center; gap: 20px; font-size: 22px; }
        .icon-link { color: #333; text-decoration: none; position: relative; display: flex; align-items: center; }
        .sidebar-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: rgba(0,0,0,0.4); z-index: 2000; display: ${menuOpen ? "block" : "none"}; }
        .sidebar { position: fixed; top: 0; left: ${menuOpen ? "0" : "-100%"}; width: 85%; max-width: 320px; height: 100vh; background: #fff; z-index: 2100; transition: 0.4s ease; display: flex; flex-direction: column; box-shadow: 10px 0 30px rgba(0,0,0,0.1); }
        .sidebar-header { padding: 25px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f5f5f5; }
        .sidebar-logo { font-weight: 800; font-size: 20px; color: #1a1a1a; }
        .sidebar-content { padding: 15px; flex: 1; overflow-y: auto; }
        .sidebar-link { display: flex; align-items: center; justify-content: space-between; padding: 16px; text-decoration: none; color: #333; font-weight: 500; font-size: 16px; border-radius: 12px; margin-bottom: 5px; transition: 0.2s; }
        .sidebar-link-content { display: flex; align-items: center; gap: 15px; }
        .sidebar-link-content svg { font-size: 20px; color: #5b5bf0; }
        .sidebar-link.active { background: #f0f2ff; color: #5b5bf0; }
        .sidebar-footer { padding: 20px; border-top: 1px solid #f5f5f5; }
        .mobile-bottom-nav { display: none; position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); width: 92%; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); height: 65px; border-radius: 35px; box-shadow: 0 8px 30px rgba(0,0,0,0.1); z-index: 1000; justify-content: space-around; align-items: center; border: 1px solid #eee; }
        .cart-badge { position: absolute; top: -8px; right: -10px; background: #ff4d4f; color: white; border-radius: 50%; font-size: 10px; padding: 2px 6px; }
        @media (max-width: 992px) {
          .nav-center, .nav-right { display: none; }
          .mobile-bottom-nav { display: flex; }
          .hamburger { display: block; font-size: 28px; cursor: pointer; }
        }
        .hamburger { display: none; }
        @media (min-width: 993px) {
          .sidebar, .sidebar-overlay { display: none !important; }
        }
        @media (max-width: 992px) {
          .nav-center, .nav-right { display: none; }
          .mobile-bottom-nav { display: flex; }
          .hamburger { display: block; font-size: 28px; cursor: pointer; color: #333; }
        }
      `}</style>

      {/* Sidebar */}
      <div className="sidebar-overlay" onClick={() => setMenuOpen(false)} />
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="sidebar-logo">NainikaEssentials</span>
          <FiX size={26} onClick={() => setMenuOpen(false)} style={{ cursor: 'pointer' }} />
        </div>
        <div className="sidebar-content">
          <NavLink to="/" className="sidebar-link">
            <div className="sidebar-link-content"><FiHome /> Home</div>
            <FiChevronRight color="#ccc" />
          </NavLink>
          <NavLink to="/shop" className="sidebar-link">
            <div className="sidebar-link-content"><FiPackage /> Shop</div>
            <FiChevronRight color="#ccc" />
          </NavLink>
          <NavLink to="/orders" className="sidebar-link">
            <div className="sidebar-link-content"><FiShoppingBag /> My Orders</div>
            <FiChevronRight color="#ccc" />
          </NavLink>
          <NavLink to="/about" className="sidebar-link">
            <div className="sidebar-link-content"><FiInfo /> About Us</div>
            <FiChevronRight color="#ccc" />
          </NavLink>
          <NavLink to="/contact" className="sidebar-link">
            <div className="sidebar-link-content"><FiPhone /> Contact</div>
            <FiChevronRight color="#ccc" />
          </NavLink>
        </div>
        <div className="sidebar-footer">
          {isLoggedIn ? (
            <div className="sidebar-link" onClick={handleLogout} style={{ color: '#ff4d4f', cursor: 'pointer' }}>
              <div className="sidebar-link-content"><FiLogOut /> Logout</div>
            </div>
          ) : (
            <NavLink to="/login" className="sidebar-link">
              <div className="sidebar-link-content"><FiUser /> Login / Register</div>
              <FiChevronRight color="#ccc" />
            </NavLink>
          )}
        </div>
      </aside>

      {/* Navbar */}
      <header className="navbar">
        <NavLink to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/logoimage.jpeg" alt="ElanCotts" style={{ height: '40px', width: 'auto' }} />
          NainikaEssentials
        </NavLink>
        <nav className="nav-center">
          <NavLink to="/" className="nav-item"><FiHome /> Home</NavLink>
          <NavLink to="/shop" className="nav-item"><FiPackage /> Shop</NavLink>
          <NavLink to="/orders" className="nav-item"><FiShoppingBag /> My Orders</NavLink>
          <NavLink to="/about" className="nav-item"><FiInfo /> About</NavLink>
          <NavLink to="/contact" className="nav-item"><FiPhone /> Contact</NavLink>
        </nav>
        <div className="nav-right">
          {isLoggedIn ? (
            <FiUser className="icon-link" onClick={handleLogout} style={{ cursor: "pointer" }} />
          ) : (
            <NavLink to="/login" className="icon-link"><FiUser /></NavLink>
          )}
          <NavLink to="/cart" className="icon-link">
            <FiShoppingCart />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </NavLink>
        </div>
        <div className="hamburger" onClick={() => setMenuOpen(true)}><FiMenu /></div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="mobile-bottom-nav">
        <NavLink to="/" className="m-nav-item"><FiHome /></NavLink>
        <NavLink to="/shop" className="m-nav-item"><FiPackage /></NavLink>
        <NavLink to="/cart" className="m-nav-item" style={{ position:'relative' }}>
          <FiShoppingCart />
          {cartCount > 0 && <span className="cart-badge" style={{top:'5px', right:'5px'}}>{cartCount}</span>}
        </NavLink>
        <NavLink to="/orders" className="m-nav-item"><FiShoppingBag /></NavLink>
        <div className="m-nav-item" onClick={() => setMenuOpen(true)}><FiMenu /></div>
      </nav>
    </>
  );
}
