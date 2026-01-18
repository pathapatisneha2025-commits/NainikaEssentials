import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Share2, MessageCircle, User } from "lucide-react";

// Product data
const PRODUCTS = [
  { id: 1, slug: "black-hoodie", name: "Black Hoodie", price: 1299, originalPrice: 1999, category: "hoodie", image: "/blackhoddie.jpeg", description: "Premium black cotton hoodie with a comfortable fit.", colors: ["Black", "White"], fabric: "Cotton", care: "Machine Wash", stock: 12 },
  { id: 2, slug: "grey-hoodie", name: "Grey Hoodie", price: 1399, originalPrice: 2499, category: "hoodie", image: "/hoodie.jpeg", description: "Stylish grey hoodie perfect for casual wear.", colors: ["Grey", "Black"], fabric: "Cotton Blend", care: "Machine Wash", stock: 8 },
  { id: 3, slug: "casual-shirt", name: "Casual Shirt", price: 999, originalPrice: 1499, category: "shirts", image: "/shirt1.jpeg", description: "Lightweight casual shirt suitable for everyday use.", colors: ["Blue", "White", "Grey"], fabric: "Linen", care: "Hand Wash", stock: 20 },
  { id: 4, slug: "formal-pants", name: "Formal Pants", price: 1199, originalPrice: 1999, category: "pants", image: "/pants1.jpeg", description: "Slim-fit formal pants for office and occasions.", colors: ["Black", "Navy"], fabric: "Polyester Blend", care: "Dry Clean Only", stock: 10 },
  { id: 5, slug: "t-shirt", name: "T-Shirt", price: 699, originalPrice: 999, category: "clothing", image: "/clothing1.jpeg", description: "Soft cotton t-shirt with breathable fabric.", colors: ["White", "Grey", "Blue"], fabric: "Cotton", care: "Machine Wash", stock: 15 },

  // NEW ARRIVALS
  { id: 6, slug: "winter-fleece-hoodie", name: "Winter Fleece Hoodie", price: 1299, originalPrice: 1999, category: "hoodie", image: "/blackHoddie.jpeg", description: "Cozy winter fleece hoodie for ultimate comfort.", colors: ["Black", "Grey"], fabric: "Cotton", care: "Machine Wash", stock: 10 },
  { id: 7, slug: "mens-slim-fit-denim-pant", name: "Men's Slim Fit Denim cotton pant", price: 1399, originalPrice: 2499, category: "pants", image: "/whitepants.jpeg", description: "Slim fit denim pants perfect for casual outings.", colors: ["Blue", "Black"], fabric: "Denim", care: "Machine Wash", stock: 12 },
  { id: 8, slug: "mens-casual-cotton-shirt", name: "Men's Casual Cotton Shirt", price: 999, originalPrice: 1499, category: "shirts", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500", description: "Lightweight cotton shirt ideal for everyday wear.", colors: ["White", "Blue"], fabric: "Cotton", care: "Hand Wash", stock: 15 },
  { id: 9, slug: "radiant-gold-tissue-silk-saree", name: "Radiant Gold Tissue Silk Saree with Antique Zari Work", price: 4999, originalPrice: 10499, category: "saree", image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500", description: "Elegant saree with exquisite zari work, perfect for celebrations.", colors: ["Gold"], fabric: "Silk", care: "Dry Clean Only", stock: 5 },
  { id: 10, slug: "midnight-noir-sequinned-georgette-saree", name: "Midnight Noir Sequinned Georgette Saree", price: 3299, originalPrice: 6599, category: "saree", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500", description: "Glamorous georgette saree with sequined detailing.", colors: ["Black"], fabric: "Georgette", care: "Dry Clean Only", stock: 7 },
  { id: 11, slug: "slim-fit-cotton-shirt", name: "Slim Fit Cotton Shirt", price: 1099, originalPrice: 2199, category: "shirts", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500", description: "Slim fit cotton shirt suitable for casual and semi-formal occasions.", colors: ["White", "Blue"], fabric: "Cotton", care: "Machine Wash", stock: 10 },
  { id: 12, slug: "elan-cotts-slim-fit-pant", name: "Elan Cotts Slim Fit Cotton Pant", price: 1399, originalPrice: 2499, category: "pants", image: "/pants.jpeg", description: "Comfortable slim fit pants for daily wear.", colors: ["Black", "Navy"], fabric: "Cotton", care: "Machine Wash", stock: 8 },
  { id: 13, slug: "elan-cotts-slim-fit-shirt", name: "Elan Cotts Slim Fit Shirt", price: 1299, originalPrice: 1799, category: "shirts", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500", description: "Classic slim fit cotton shirt for versatile styling.", colors: ["White", "Grey"], fabric: "Cotton", care: "Machine Wash", stock: 10 },
  
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
    comment: "The saree fabric feels incredibly premium and soft. You can see the rich craftsmanship in every drape. Perfect for weddings and festive occasions. ElanCotts is now my go-to for ethnic wear.", 
    verified: true 
  }
];
export default function ProductDetails() {
const { slug, productId } = useParams();
const product = PRODUCTS.find(
  (p) => p.slug === slug || p.id === Number(productId)
);

  const [mainImage, setMainImage] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) setMainImage(product.image || "/placeholder.png");
  }, [product]);

  if (!product) return <p style={{ padding: 100, textAlign: "center" }}>Product not found</p>;

  // Add to Cart API
const handleAddToCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("adminUser"));
      if (!user?.user_id) {
        alert("Please log in to add items to cart.");
        return;
      }

      if (qty > product.stock) {
        alert(`Only ${product.stock} items in stock`);
        return;
      }

      const productObj = {
        product_id: product.id,
        product_name: product.name,
        selected_color: product.colors[0],
        selected_size: "Free Size",
        quantity: qty,
        price_at_addition: product.price,
        product_images: [product.image]
      };

      const response = await fetch("https://nainikaessentialsdatabas.onrender.com/carts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.user_id, product: productObj })
      });

      const data = await response.json();

      if (response.ok) {
        alert(`${product.name} added to cart!`);
      } else {
        alert(data.error || "Failed to add to cart");
      }

    } catch (err) {
      console.error("Add to Cart Error:", err);
      alert("Something went wrong, please try again.");
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
            }}>
              <img src={product.image} alt="thumbnail" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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

          {/* Size */}
          <div style={{ marginBottom: "25px" }}>
            <div style={{ fontSize: "13px", fontWeight: "500", color: "#666", marginBottom: "10px" }}>Size</div>
            <button style={{ padding: "8px 20px", border: "1px solid #5d5ad1", background: "#fff", color: "#5d5ad1", borderRadius: "6px", fontSize: "14px", cursor: "pointer" }}>
              Free Size
            </button>
            <div style={{ color: "#999", fontSize: "12px", marginTop: "8px" }}>{product.stock} available</div>
          </div>

          {/* Quantity */}
          <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "25px" }}>
            <span style={{ fontSize: "13px", fontWeight: "600" }}>Qty</span>
            <div style={{ display: "flex", border: "1px solid #e0e0e0", borderRadius: "6px", alignItems: "center" }}>
              <button onClick={decrementQty} style={{ padding: "6px 14px", border: "none", background: "none", fontSize: "18px", cursor: "pointer" }}>-</button>
              <div style={{ padding: "6px 12px", borderLeft: "1px solid #eee", borderRight: "1px solid #eee", fontSize: "14px" }}>{qty}</div>
              <button onClick={incrementQty} style={{ padding: "6px 14px", border: "none", background: "none", fontSize: "18px", cursor: "pointer" }}>+</button>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button onClick={handleAddToCart} style={{ flex: 1, padding: "14px", background: "white", border: "1px solid #5d5ad1", color: "#5d5ad1", borderRadius: "6px", fontWeight: "600", cursor: "pointer" }}>Add To Cart</button>
            <button onClick={() => { handleAddToCart(); alert("Proceeding to checkout..."); }} style={{ flex: 1, padding: "14px", background: "#2563eb", border: "none", color: "white", borderRadius: "6px", fontWeight: "600", cursor: "pointer" }}>Buy Now</button>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <div style={{ padding: "60px 5%" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "30px", color: "#1a1a1a" }}>Similar Products</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "25px" }}>
          {SIMILAR_PRODUCTS.map((item) => (
            <div key={item.id} style={{ border: "1px solid #f0f0f0", borderRadius: "8px", overflow: "hidden", position: "relative" }}>
              <span style={{ position: "absolute", top: "12px", left: "12px", background: "#f59e0b", color: "#fff", padding: "4px 10px", fontSize: "11px", borderRadius: "4px", fontWeight: "600" }}>Best Seller</span>
              <div style={{ position: "absolute", top: "0px", right: "15px", zIndex: 1 }}>
                <div style={{ background: "#dc2626", color: "#fff", padding: "8px 4px 12px 4px", fontSize: "10px", fontWeight: "700", textAlign: "center", clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)" }}>{item.discount}</div>
              </div>
              <img src={item.image} alt={item.name} style={{ width: "100%", height: "380px", objectFit: "cover" }} />
              <div style={{ padding: "15px" }}>
                <div style={{ color: "#999", fontSize: "12px", marginBottom: "6px", fontWeight: "500" }}>ELAN COTTS</div>
                <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#333", height: "40px", overflow: "hidden", lineHeight: "1.4" }}>{item.name}</h3>
                <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontWeight: "700", fontSize: "16px" }}>₹{item.price}</span>
                  <span style={{ color: "#ccc", textDecoration: "line-through", fontSize: "13px" }}>₹{item.originalPrice}</span>
                </div>
                <button style={{ width: "100%", marginTop: "15px", padding: "10px", border: "1px solid #eee", background: "#fff", borderRadius: "6px", fontWeight: "600", fontSize: "13px", cursor: "pointer" }}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Reviews */}
      <div style={{ padding: "0 5% 80px 5%" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "30px", color: "#1a1a1a" }}>Customer Reviews</h2>
        {REVIEWS.map((rev) => (
          <div key={rev.id} style={{ border: "1px solid #f0f0f0", borderRadius: "16px", padding: "30px", backgroundColor: "#fff", marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
              <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                <div style={{ width: "45px", height: "45px", borderRadius: "50%", backgroundColor: "#eef2ff", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <User size={22} color="#5d5ad1" />
                </div>
                <div>
                  <div style={{ fontWeight: "600", fontSize: "16px", color: "#333" }}>{rev.user}</div>
                  {rev.verified && (
                    <div style={{ color: "#10b981", fontSize: "13px", fontWeight: "500", display: "flex", alignItems: "center", gap: "4px" }}>
                      <span style={{ background: "#10b981", color: "#fff", borderRadius: "50%", width: "12px", height: "12px", fontSize: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>✓</span> Verified Purchase
                    </div>
                  )}
                </div>
              </div>
              <div style={{ color: "#facc15", display: "flex", gap: "2px" }}>
                {"★".repeat(rev.rating)}
              </div>
            </div>
            <p style={{ color: "#555", fontSize: "15px", lineHeight: "1.7", margin: 0 }}>{rev.comment}</p>
          </div>
        ))}
      </div>

      {/* Floating Chat */}
      <div style={{ position: "fixed", bottom: "30px", right: "30px", width: "55px", height: "55px", background: "#5d5ad1", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "0 4px 12px rgba(93, 90, 209, 0.3)", cursor: "pointer" }}>
        <MessageCircle color="white" size={24} fill="white" />
      </div>
    </div>
  );
}
