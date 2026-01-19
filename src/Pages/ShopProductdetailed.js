import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Share2, MessageCircle, User } from "lucide-react";

// Product data
const PRODUCTS = [
  { id: 1, name: "Elegant Onion Pink Silk Saree with Geometric Weave &...", discount: "40%", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400", rating: 4.0, reviews: 5, slug: "elegant-onion-pink-silk-saree", price: 2499, originalPrice: 4199, stock: 10, colors: ["Pink"], description: "Elegant silk saree with geometric patterns." },
  { id: 2, name: "Radiant Gold Tissue Silk Saree with Antique Zari Work", discount: "52%", img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400", rating: 3.5, reviews: 2, slug: "radiant-gold-tissue-silk-saree", price: 3299, originalPrice: 6899, stock: 5, colors: ["Gold"], description: "Traditional tissue silk saree with zari work." },
  { id: 3, name: "Midnight Noir Sequinned Georgette Saree", discount: "50%", img: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400", rating: 4.5, reviews: 10, slug: "midnight-noir-sequinned-georgette-saree", price: 3299, originalPrice: 6599, stock: 7, colors: ["Black"], description: "Sequinned georgette saree for evening wear." },
  { id: 4, name: "Elegant Handloom Silk Saree with Zari Border", discount: "50%", img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400", rating: 4.2, reviews: 8, slug: "elegant-handloom-silk-saree", price: 1899, originalPrice: 3799, stock: 12, colors: ["Cream"], description: "Handloom silk saree with elegant zari border." },
];

// Mock Similar Products
const SIMILAR_PRODUCTS = [
  { id: 101, name: "Elegant Onion Pink Silk Saree with Geometric Weave &...", price: 2499, originalPrice: 4199, image: "/saree2.jpg", discount: "40% OFF" },
  { id: 102, name: "Midnight Noir Sequinned Georgette Saree", price: 3299, originalPrice: 6599, image: "/saree3.jpg", discount: "50% OFF" },
  { id: 103, name: "Elegant Handloom Silk Blend Saree with Zari Border", price: 1899, originalPrice: 3799, image: "/saree4.jpg", discount: "50% OFF" },
];

// Mock Reviews
const REVIEWS = [
  { 
    id: 1, 
    user: "Balaganesh", 
    rating: 5, 
    comment: "The saree fabric feels incredibly premium and soft. Perfect for weddings and festive occasions.", 
    verified: true 
  }
];

export default function ShopProductDetails() {
  const { slug, productId } = useParams();
  const product = PRODUCTS.find(
    (p) => p.slug === slug || p.id === Number(productId)
  );

  const [mainImage, setMainImage] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) setMainImage(product.img || "/placeholder.png");
  }, [product]);

  if (!product) return <p style={{ padding: 100, textAlign: "center" }}>Product not found</p>;

  const handleAddToCart = () => {
  const user = JSON.parse(localStorage.getItem("adminUser"));
  const productObj = {
    product_id: product.id,
    product_name: product.name,
    selected_color: product.colors[0] || "Default",
    selected_size: "Free Size",
    quantity: qty,
    price_at_addition: product.price,
    product_images: [product.img],
  };

  if (qty > product.stock) {
    alert(`Only ${product.stock} items in stock`);
    return;
  }

  if (user && user.user_id) {
    // Logged-in: send to backend
    fetch("https://nainikaessentialsdatabas.onrender.com/carts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.user_id, product: productObj }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          alert(`${product.name} added to cart!`);
          window.dispatchEvent(new Event("cartUpdated"));
        }
      })
      .catch(err => alert("Failed to add to cart."));
  } else {
    // Guest: store in localStorage
    let guestCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product already exists
    const index = guestCart.findIndex(item => item.product_id === product.id);
    if (index > -1) {
      guestCart[index].quantity += qty;
    } else {
      guestCart.push(productObj);
    }

    localStorage.setItem("cart", JSON.stringify(guestCart));
    alert(`${product.name} added to cart!`);
    window.dispatchEvent(new Event("cartUpdated"));
  }
};


  const incrementQty = () => { if (qty < product.stock) setQty(qty + 1); };
  const decrementQty = () => { if (qty > 1) setQty(qty - 1); };

  return (
    <div style={{ fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>
      {/* Product Main Section */}
      <div style={{
        padding: "40px 5%",
        display: "grid",
        gridTemplateColumns: "80px 1fr 1fr",
        gap: "40px",
        alignItems: "start",
        flexWrap: "wrap"
      }}>
        {/* Sidebar Thumbnails */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {[...Array(5)].map((_, index) => (
            <div key={index} style={{
              width: "70px",
              height: "90px",
              borderRadius: "4px",
              overflow: "hidden",
              border: index === 0 ? "2px solid #5d5ad1" : "1px solid #e0e0e0",
              cursor: "pointer"
            }}
            onClick={() => setMainImage(product.img)}>
              <img src={product.img} alt="thumbnail" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>

        {/* Main Image */}
        <div style={{ backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #f0f0f0", overflow: "hidden" }}>
          <img src={mainImage} alt={product.name} style={{ width: "100%", display: "block" }} />
        </div>

        {/* Product Details */}
        <div style={{ paddingLeft: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <h1 style={{ fontSize: "24px", fontWeight: "600", margin: "0 0 10px 0", color: "#1a1a1a", lineHeight: "1.3" }}>{product.name}</h1>
            <div style={{ border: "1px solid #eee", padding: "6px", borderRadius: "50%", cursor: "pointer", display: 'flex' }}>
              <Share2 size={18} color="#666" />
            </div>
          </div>

          <p style={{ color: "#666", fontSize: "14px", lineHeight: "1.6", marginBottom: "15px" }}>{product.description}</p>

          {/* Price */}
          <div style={{ marginBottom: "25px" }}>
            <div style={{ fontSize: "12px", color: "#999", marginBottom: "4px" }}>Price</div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "28px", fontWeight: "700", color: "#000" }}>₹{product.price}</span>
              <span style={{ fontSize: "16px", color: "#ccc", textDecoration: "line-through" }}>₹{product.originalPrice}</span>
            </div>
          </div>

          {/* Quantity & Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "25px" }}>
            <span style={{ fontSize: "13px", fontWeight: "600" }}>Qty</span>
            <div style={{ display: "flex", border: "1px solid #e0e0e0", borderRadius: "6px", alignItems: "center" }}>
              <button onClick={decrementQty} style={{ padding: "6px 14px", border: "none", background: "none", fontSize: "18px", cursor: "pointer" }}>-</button>
              <div style={{ padding: "6px 12px", borderLeft: "1px solid #eee", borderRight: "1px solid #eee", fontSize: "14px" }}>{qty}</div>
              <button onClick={incrementQty} style={{ padding: "6px 14px", border: "none", background: "none", fontSize: "18px", cursor: "pointer" }}>+</button>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button onClick={handleAddToCart} style={{ flex: 1, padding: "14px", background: "white", border: "1px solid #5d5ad1", color: "#5d5ad1", borderRadius: "6px", fontWeight: "600", cursor: "pointer" }}>Add To Cart</button>
            <button onClick={() => { handleAddToCart(); alert("Proceeding to checkout..."); }} style={{ flex: 1, padding: "14px", background: "#2563eb", border: "none", color: "white", borderRadius: "6px", fontWeight: "600", cursor: "pointer" }}>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
