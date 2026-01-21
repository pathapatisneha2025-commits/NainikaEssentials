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
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [showPopup, setShowPopup] = useState(true);
  const [loginModal, setLoginModal] = useState(false);

  /* ================= AUTH STATE ================= */
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("adminUser");
    return stored ? JSON.parse(stored) : null;
  });
  const isLoggedIn = !!user;

  /* ================= EFFECTS ================= */

  // Lock scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  // Sync auth on location change
useEffect(() => {
  setMenuOpen(false);
  const stored = localStorage.getItem("adminUser");
  setUser(stored ? JSON.parse(stored) : null);
}, [location.key]);

// Sync auth across tabs AND after login in same tab
useEffect(() => {
  const handleStorageChange = () => {
    const stored = localStorage.getItem("adminUser");
    setUser(stored ? JSON.parse(stored) : null);
  };

  window.addEventListener("storage", handleStorageChange);

  // Call immediately in case login just happened in this tab
  handleStorageChange();

  return () => window.removeEventListener("storage", handleStorageChange);
}, []);

// const updateCartCount = async () => {
//   try {
//     let count = 0;

//     if (isLoggedIn && user?.user_id) {
//       // Merge guest cart if exists
//       const guestCart = JSON.parse(localStorage.getItem("cart") || "[]");
//       if (guestCart.length > 0) {
//         await fetch(`https://nainikaessentialsdatabas.onrender.com/carts/merge/${user.user_id}`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ products: guestCart }),
//         });
//         localStorage.removeItem("cart"); // clear guest cart
//       }

//       // Fetch server cart
//       const res = await fetch(`https://nainikaessentialsdatabas.onrender.com/carts/${user.user_id}`);
//       const data = await res.json();
//       count = data.products?.reduce((sum, item) => sum + item.quantity, 0) || 0;

//     } else {
//       // Guest cart
//       const guestCart = JSON.parse(localStorage.getItem("cart") || "[]");
//       count = guestCart.reduce((sum, item) => sum + item.quantity, 0);
//     }

//     setCartCount(count);
//   } catch (err) {
//     console.error("Cart count update error:", err);
//   }
// };


//   const fetchCart = async () => {
//     const user = JSON.parse(localStorage.getItem("adminUser") || "{}");
//     const isGuest = !user?.user_id;

//     if (isGuest) {
//       const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
//       setCartCount(storedCart.reduce((acc, item) => acc + item.quantity, 0));
//     } else {
//       try {
//         const res = await fetch(`https://nainikaessentialsdatabas.onrender.com/carts/${user.user_id}`);
//         const data = await res.json();
//         if (res.ok) {
//           setCartCount(data.cart.reduce((acc, item) => acc + item.quantity, 0));
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   };
// useEffect(() => {
//     fetchCart(); // fetch on mount

//     const handleCartUpdate = () => fetchCart();
//     window.addEventListener("cartUpdated", handleCartUpdate);
//     return () => window.removeEventListener("cartUpdated", handleCartUpdate);
//   }, []);
  // Initial load
 // Re-run count when user state changes (login/logout) or location changes
// Re-run cart count when user logs in/out or page changes
// Run whenever user logs in/out or location changes
const fetchCart = async () => {
  try {
    let userId;
    if (isLoggedIn && user) {
      userId = user.user_id;
    } else {
      userId = JSON.parse(localStorage.getItem("adminUser"))?.user_id;
    }

    const res = await fetch(`https://nainikaessentialsdatabas.onrender.com/carts/${userId}`);
    const data = await res.json();

    // Make sure items exist
    return data.items || [];
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    return [];
  }
};

const updateCartCount = async () => {
  const items = await fetchCart();

  // Sum quantities of all items
  const count = items.reduce((total, item) => total + item.quantity, 0);

  setCartCount(count);
};


  // Run whenever login state, user, or page changes
  useEffect(() => {
    updateCartCount();
  }, [isLoggedIn, user, location.pathname]);

  // Listen for global cart updates
  useEffect(() => {
    window.addEventListener("cartUpdated", updateCartCount);
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);


// Listen for cart updates
useEffect(() => {
  window.addEventListener("cartUpdated", updateCartCount);
  return () => window.removeEventListener("cartUpdated", updateCartCount);
}, []);


  /* ================= ACTIONS ================= */
  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    localStorage.removeItem(`cart_${user?.user_id}`);
    setUser(null);
    setMenuOpen(false);
    navigate("/login", { replace: true });
  };

  const handleCartClick = () => {
    if (!isLoggedIn) return setLoginModal(true);
    navigate("/cart");
  };

  const handleOrdersClick = () => {
    if (!isLoggedIn) return setLoginModal(true);
    navigate("/orders");
  };

  const handleViewOffers = () => {
    setShowPopup(false);
    navigate("/shop");
  };

  const closeLoginModal = () => setLoginModal(false);
  const goToLogin = () => {
    setLoginModal(false);
    navigate("/login");
  };


  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .navbar {
          height: 80px; padding: 0 5%; background: #fff;
          display: flex; align-items: center; justify-content: space-between;
          position: sticky; top: 0; z-index: 1000; border-bottom: 1px solid #f0f0f0;
          font-family: 'Inter', sans-serif;
        }
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
        .sidebar-link { display: flex; align-items: center; justify-content: space-between; padding: 16px; text-decoration: none; color: #333; font-weight: 500; font-size: 16px; border-radius: 12px; margin-bottom: 5px; transition: 0.2s; cursor: pointer; }
        .sidebar-link-content { display: flex; align-items: center; gap: 15px; }
        .sidebar-link-content svg { font-size: 20px; color: #5b5bf0; }
        .sidebar-link.active { background: #f0f2ff; color: #5b5bf0; }
        .sidebar-link:active { background: #f5f5f5; }
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 85%;
  max-width: 320px;
  height: 100vh;
  background: #fff;
  z-index: 2100;
  transition: 0.4s ease;
  display: flex;
  flex-direction: column;
  box-shadow: 10px 0 30px rgba(0,0,0,0.1);
  padding-bottom: env(safe-area-inset-bottom, 20px); /* Add safe padding for mobile */
}

.sidebar-footer {
  margin-top: auto; /* push footer to bottom */
  padding-bottom: 20px; /* extra spacing above mobile bottom nav */
  border-top: 1px solid #f5f5f5;
}

        .mobile-bottom-nav { display: none; position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); width: 92%; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); height: 65px; border-radius: 35px; box-shadow: 0 8px 30px rgba(0,0,0,0.1); z-index: 1000; justify-content: space-around; align-items: center; border: 1px solid #eee; }
.cart-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: #ff4d4f;
  color: white;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 600;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  line-height: 1;
  box-shadow: 0 0 2px rgba(0,0,0,0.2);
}
/* Increase mobile bottom nav icon size */
.mobile-bottom-nav .m-nav-item svg {
  font-size: 28px; /* increase to 28px (default is ~20px) */
  color: #333;     /* optional: make icons darker if needed */
}

/* Optional: increase the height of the mobile nav to match bigger icons */
.mobile-bottom-nav {
  height: 75px; /* increased from 65px */
}

        @media (max-width: 992px) { .nav-center, .nav-right { display: none; } .mobile-bottom-nav { display: flex; } .hamburger { display: block; font-size: 35px; cursor: pointer; } }
        .hamburger { display: none; }
        @media (min-width: 993px) { .sidebar, .sidebar-overlay { display: none !important; } }
        @media (max-width: 992px) { .nav-center, .nav-right { display: none; } .mobile-bottom-nav { display: flex; } .hamburger { display: block; font-size: 28px; cursor: pointer; color: #333; } }
@media (max-width: 992px) {
  .sidebar-footer {
    padding-bottom: 90px; /* leave space above mobile nav */
  }
}

        .login-modal { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #fff; padding: 24px; border-radius: 12px; z-index: 3000; width: 90%; max-width: 360px; box-shadow: 0 8px 25px rgba(0,0,0,0.2); text-align: center; }
        .login-modal button { margin-top: 12px; padding: 8px 16px; background: #5b5bf0; color: #fff; border: none; border-radius: 8px; cursor: pointer; }
      `}</style>

   {/* Sidebar Overlay */}
<div
  className="sidebar-overlay"
  style={{ display: menuOpen ? "block" : "none" }}
  onClick={() => setMenuOpen(false)}
></div>

{/* Sidebar Drawer */}
<aside
  className="sidebar"
  style={{ left: menuOpen ? "0" : "-100%" }}
>
  <div className="sidebar-header">
    <span className="sidebar-logo">NainikaEssentials</span>
    <FiX
      size={26}
      onClick={() => setMenuOpen(false)}
      style={{ cursor: "pointer" }}
    />
  </div>
  <div className="sidebar-content">
    <NavLink to="/" className="sidebar-link">
      <div className="sidebar-link-content"><FiHome /> Home</div>
      <FiChevronRight color="#ccc" />
    </NavLink>
<NavLink to="/shop" className="sidebar-link" onClick={() => setMenuOpen(false)}>
  <div className="sidebar-link-content"><FiPackage /> Shop</div>
  <FiChevronRight color="#ccc" />
</NavLink>

    <div className="sidebar-link" onClick={handleOrdersClick}>
      <div className="sidebar-link-content"><FiShoppingBag /> My Orders</div>
      <FiChevronRight color="#ccc" />
    </div>
    <div className="sidebar-link" onClick={handleCartClick}>
      <div className="sidebar-link-content"><FiShoppingCart /> Cart</div>
      <FiChevronRight color="#ccc" />
    </div>
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
      <div className="sidebar-link" onClick={handleLogout} style={{ color: "#ff4d4f" }}>
        <div className="sidebar-link-content"><FiLogOut /> Logout</div>
      </div>
    ) : (
      <div className="sidebar-link" onClick={() => navigate("/login")}>
        <div className="sidebar-link-content"><FiUser /> Login / Register</div>
      </div>
    )}
  </div>
</aside>

      {/* Navbar */}
      <header className="navbar">
        <NavLink to="/" className="logo"><img src="/logoimage.jpeg" alt="ElanCotts" style={{ height: "40px", width: "auto" }} /> NainikaEssentials</NavLink>
        <nav className="nav-center">
          <NavLink to="/" className="nav-item"><FiHome /> Home</NavLink>
          <NavLink to="/shop" className="nav-item"><FiPackage /> Shop</NavLink>
          <div className="nav-item" onClick={handleOrdersClick}><FiShoppingBag /> My Orders</div>
          <NavLink to="/about" className="nav-item"><FiInfo /> About</NavLink>
          <NavLink to="/contact" className="nav-item"><FiPhone /> Contact</NavLink>
        </nav>
        <div className="nav-right">
          {isLoggedIn ? (
  <NavLink to="/profile" className="icon-link"><FiUser /></NavLink>
) : (
  <NavLink to="/login" className="icon-link"><FiUser /></NavLink>
)}

         <div className="m-nav-item" style={{ position: "relative" }} onClick={handleCartClick}>
  <FiShoppingCart />
  {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
</div>

        </div>
        <div className="hamburger" onClick={() => setMenuOpen(true)}><FiMenu /></div>
      </header>
{/* Mobile Bottom Nav */}
<nav className="mobile-bottom-nav">
  <NavLink to="/" className="m-nav-item">
    <FiHome />
  </NavLink>

  <NavLink to="/shop" className="m-nav-item">
    <FiPackage />
  </NavLink>

  <div className="m-nav-item icon-link" style={{ position: "relative" }} onClick={handleCartClick}>
    <FiShoppingCart />
    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
  </div>

  <div className="m-nav-item" onClick={handleOrdersClick}>
    <FiShoppingBag />
  </div>

  {/* Uncomment if you want a menu button */}
  {/* <div className="m-nav-item" onClick={() => setMenuOpen(true)}>
        <FiMenu />
      </div> */}
</nav>



      {/* Offers Popup */}
      {showPopup && location.pathname === "/" && (
        <div className="offers-popup" style={{
          position: "fixed", bottom: "100px", left: "50%", transform: "translateX(-50%)",
          width: "90%", maxWidth: "600px", background: "#1a100a", color: "white",
          padding: "16px 24px", borderRadius: "16px", display: "flex", justifyContent: "space-between",
          alignItems: "center", zIndex: "1500", boxShadow: "0 12px 30px rgba(0,0,0,0.3)"
        }}>
          <div className="offers-text">
            <p style={{ fontSize: "10px", opacity: 0.7, letterSpacing: "1.2px", textTransform: "uppercase" }}>Saree Extravaganza</p>
            <h4 style={{ fontSize: "14px", fontWeight: 500 }}>Explore our unique patchy green collection.</h4>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <button className="view-btn" onClick={handleViewOffers}>VIEW OFFERS</button>
            <FiX onClick={() => setShowPopup(false)} style={{ cursor: "pointer" }} />
          </div>
        </div>
      )}

      {/* Login Required Modal */}
      {loginModal && (
        <div className="login-modal">
          <h3>Login Required</h3>
          <p>You need to log in to access this page.</p>
          <button onClick={goToLogin}>Go to Login</button>
          <button onClick={closeLoginModal} style={{ marginLeft: "8px", background: "#ccc", color: "#000" }}>Cancel</button>
        </div>
      )}
    </>
  );
}
