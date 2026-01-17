import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ShopByCategory from "./components/ShopByCategories";
import NewArrivals from "./components/NewArrival";
import LandingPage from "./components/LandingPage";
import BestSellers from "./components/BestSeller";
import FeaturedSection from "./components/HeroBanner";
import RecentlyViewed from "./components/Recentlyviewd";
import InstagramFeed from "./components/InstagramFeed";
import Testimonials from "./components/Testimonals";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import ShopPage from "./Pages/ShopPage";
import AboutPage from "./Pages/AboutPage";
import OrdersPage from "./Pages/Orders";
import ContactPage from "./Pages/ContactPage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";

function App() {
  return (
    <Router>
      {/* Navbar visible on all pages */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <>
            <HeroSection/>
            <ShopByCategory/>
            <NewArrivals/>
            <LandingPage/>
            <BestSellers/>
            <FeaturedSection/>
            <RecentlyViewed/>
            <InstagramFeed/>
            <Testimonials/>
            <FAQ/>
            </>
          }
        />

        {/* Add other routes later */}
        
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />

       
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
