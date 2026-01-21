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
import CategoryProducts from "./Pages/CategoryProducts";
import ProductDetails from "./Pages/ProductDetailedPage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import ShopProductDetails from "./Pages/ShopProductdetailed";
import MyOrderDetails from "./Pages/MyOrdersPage";
import ProfilePage from "./Pages/ProfilePage";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsAndConditions from "./Pages/TermsCondition";
import ReturnsRefundsPolicy from "./Pages/ReturnPolicy";
import ShippingInformation from "./Pages/Shipping";
import ScrollToTop from "./components/ScrolllTop";

function App() {
  return (
    <Router>
      <ScrollToTop/>
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
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/profile" element={<ProfilePage />} />

        <Route path="/orders" element={<OrdersPage />} />
                <Route path="/myorders/:userId" element={<MyOrderDetails />} />

<Route path="/category/:category" element={<CategoryProducts />} />
        <Route path="/product/:slug/:productId" element={<ProductDetails />} />
<Route path="/shopproduct/:productId" element={<ShopProductDetails />} />

                <Route path="/contact" element={<ContactPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/privacypolicy" element={<PrivacyPolicy/>} />
                <Route path="/termsconditions" element={<TermsAndConditions/>} />
                <Route path="/refund" element={<ReturnsRefundsPolicy/>} />
                <Route path="/shippolicy" element={<ShippingInformation/>} />
                <Route path="/faq" element={<FAQ/>} />

       
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
