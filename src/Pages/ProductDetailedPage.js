import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Share2, MessageCircle, Star } from "lucide-react";

// Product data
const PRODUCTS = [
  {
    id: 1,
    slug: "black-hoodie",
    name: "Black Hoodie",
    category: "hoodie",
    price: 1299,
    originalPrice: 1999,
    description: "Premium black cotton hoodie with a comfortable fit, featuring a double-lined hood and heavy-duty ribbed cuffs.",
    fabric: "Cotton",
    care: "Machine Wash",
    sizes: ["S", "M", "L", "XL"],
    variants: [
      {
        color: "Black",
        image: "/blackhoddie.jpeg",
        images: {
          front: "/blackhoddie.jpeg",
          back: "/black-hoodie-back.jpeg",
          side: "/black-hoodie-side.jpeg"
        },
        stock: { S: 5, M: 4, L: 3, XL: 2 }
      },
      {
        color: "White",
        image: "/whiteHoodie.jpeg",
        images: {
          front: "/whiteHoodie.jpeg",
          back: "/white-hoodie-back.jpeg",
          side: "/white-hoodie-side.jpeg"
        },
        stock: { S: 3, M: 2, L: 1, XL: 0 }
      }
    ]
  },
  {
    id: 3,
    slug: "casual-shirt",
    name: "Casual Shirt",
    category: "shirts",
    price: 999,
    originalPrice: 1499,
    description: "Lightweight casual shirt suitable for everyday use, crafted from breathable linen for all-day comfort.",
    fabric: "Linen",
    care: "Hand Wash",
    sizes: ["S", "M", "L", "XL"],
    variants: [
      {
        color: "Blue",
        image: "/shirt-blue.jpeg",
        images: {
          front: "/shirt-blue.jpeg",
          detail: "/shirt-blue-detail.jpeg",
          cuff: "/shirt-blue-cuff.jpeg"
        },
        stock: { S: 4, M: 6, L: 3, XL: 2 }
      },
      {
        color: "White",
        image: "/shirt-white.jpeg",
        images: {
          front: "/shirt-white.jpeg",
          detail: "/shirt-white-detail.jpeg",
          cuff: "/shirt-white-cuff.jpeg"
        },
        stock: { S: 2, M: 4, L: 2, XL: 1 }
      }
    ]
  },
  {
    id: 7,
    slug: "mens-slim-fit-denim-pant",
    name: "Men's Slim Fit Denim Pant",
    category: "pants",
    price: 1399,
    originalPrice: 2499,
    description: "Slim fit denim pants perfect for casual outings, featuring a classic five-pocket design and stretch fabric.",
    fabric: "Denim",
    care: "Machine Wash",
    sizes: ["30", "32", "34", "36"],
    variants: [
      {
        color: "Blue",
        image: "/bluepants.jpeg",
        images: {
          front: "/bluepants.jpeg",
          back: "/bluepants-back.jpeg",
          texture: "/bluepants-texture.jpeg"
        },
        stock: { 30: 3, 32: 4, 34: 2, 36: 1 }
      },
      {
        color: "Black",
        image: "/blackpants.jpeg",
        images: {
          front: "/blackpants.jpeg",
          back: "/blackpants-back.jpeg",
          texture: "/blackpants-texture.jpeg"
        },
        stock: { 30: 2, 32: 3, 34: 2, 36: 0 }
      }
    ]
  },
  {
    id: 9,
    slug: "midnight-noir-sequinned-georgette-saree",
    name: "Midnight Noir Sequinned Georgette Saree",
    category: "saree",
    price: 3299,
    originalPrice: 6599,
    description: "Glamorous georgette saree with intricate sequined detailing, perfect for evening galas and festive celebrations.",
    fabric: "Georgette",
    care: "Dry Clean Only",
    sizes: ["Free Size"],
    variants: [
      {
        color: "Black",
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500",
        images: {
          front: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500",
          drape: "https://images.unsplash.com/photo-1610030469668-93510ec678f5?w=500",
          detail: "https://images.unsplash.com/photo-1610189012906-4078873656c0?w=500"
        },
        stock: { "Free Size": 7 }
      }
    ]
  }
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

// Inside ProductDetails component, after getting `product`
const [selectedColor, setSelectedColor] = useState(product.variants[0]);
const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
const [selectedView, setSelectedView] = useState("front");
const [width, setWidth] = useState(window.innerWidth);
// Utility function to get main image safely
const getInitialImage = (variant) => {
  if (!variant) return "";
  // If variant has multiple images
  if (variant.images) {
    return variant.images.front || Object.values(variant.images)[0] || "";
  }
  // If variant has a single image
  return variant.image || "";
};

// State initialization
const [mainImage, setMainImage] = useState(getInitialImage(product.variants[0]));

// State initialization

useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

const [qty, setQty] = useState(1);

useEffect(() => {
  if (product) {
    const initialVariant = product.variants[0];
    setSelectedColor(initialVariant);
    setSelectedView("front");
    setMainImage(getInitialImage(initialVariant)); // ✅ safe
    setSelectedSize(product.sizes[0]);
  }
}, [product]);



  const maxStock = selectedColor.stock[selectedSize];

  if (!product) return <p style={{ padding: 100, textAlign: "center" }}>Product not found</p>;


  const isMobile = width < 768;
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
    <div style={{ fontFamily: "Inter, sans-serif", maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      
      {/* Main Grid: Responsive column for mobile, 2 cols for desktop */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "window.innerWidth < 768 ? '1fr' : '1fr 1fr'", 
        gap: "30px",
        display: 'flex',
        flexDirection: window.innerWidth < 1024 ? 'column' : 'row'
      }}>
        
        {/* Left Side: Images */}
        <div style={{ flex: 1, display: "flex", gap: "15px" }}>
          {/* Thumbnails Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {Object.entries(selectedColor.images).map(([view, img]) => (
              <img
                key={view}
                src={img}
                onClick={() => { setSelectedView(view); setMainImage(img); }}
                style={{
                  width: "60px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  cursor: "pointer",
                  border: selectedView === view ? "2px solid #4F46E5" : "1px solid #ddd"
                }}
              />
            ))}
          </div>
          {/* Main Large Image */}
          <div style={{ flex: 1 }}>
            <img src={mainImage} style={{ width: "100%", borderRadius: "16px", objectFit: "cover" }} alt="Product" />
          </div>
        </div>

        {/* Right Side: Info */}
        <div style={{ flex: 1, padding: "0 10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1 style={{ fontSize: "28px", fontWeight: "600", color: "#111" }}>{product.name}</h1>
            <Share2 size={20} style={{ cursor: "pointer", color: "#666" }} />
          </div>
          
          <p style={{ color: "#666", margin: "10px 0" }}>{product.description}</p>
          
          <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "20px" }}>
             {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < 4 ? "#FBBF24" : "none"} stroke="#FBBF24" />)}
             <span style={{ fontSize: "14px", color: "#666" }}>0.0 • 0 reviews</span>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <span style={{ fontSize: "12px", color: "#666", display: "block" }}>Price</span>
            <span style={{ fontSize: "24px", fontWeight: "700" }}>₹{product.price}</span>
            <span style={{ fontSize: "16px", color: "#999", textDecoration: "line-through", marginLeft: "10px" }}>₹{product.originalPrice}</span>
          </div>

          {/* Size Selection */}
          <div style={{ marginBottom: "20px" }}>
            <p style={{ fontSize: "14px", fontWeight: "500", marginBottom: "10px" }}>Size</p>
            <div style={{ display: "flex", gap: "10px" }}>
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "8px",
                    border: selectedSize === size ? "2px solid #4F46E5" : "1px solid #E5E7EB",
                    background: selectedSize === size ? "#fff" : "#fff",
                    color: selectedSize === size ? "#4F46E5" : "#666",
                    cursor: "pointer",
                    minWidth: "50px"
                  }}
                >{size}</button>
              ))}
            </div>
            <p style={{ fontSize: "12px", color: "#666", marginTop: "8px" }}>{selectedColor.stock[selectedSize]} available</p>
          </div>

          {/* Color Selection */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", gap: "15px" }}>
              {product.variants.map(v => (
                <div key={v.color} onClick={() => setSelectedColor(v)} style={{ cursor: "pointer", textAlign: "center" }}>
                  <img src={v.image} style={{ 
                    width: "50px", height: "60px", borderRadius: "8px", objectFit: "cover",
                    border: selectedColor.color === v.color ? "2px solid #4F46E5" : "1px solid #ddd"
                  }} />
                  <p style={{ fontSize: "12px", marginTop: "4px", color: selectedColor.color === v.color ? "#4F46E5" : "#666" }}>{v.color}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Qty Selector */}
          <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "30px" }}>
            <span style={{ fontSize: "14px" }}>Qty</span>
            <div style={{ display: "flex", alignItems: "center", border: "1px solid #ddd", borderRadius: "20px", padding: "2px 10px" }}>
              <button onClick={decrementQty} style={{ border: "none", background: "none", padding: "5px 10px", cursor: "pointer" }}>-</button>
              <span style={{ padding: "0 10px" }}>{qty}</span>
              <button onClick={incrementQty} style={{ border: "none", background: "none", padding: "5px 10px", cursor: "pointer" }}>+</button>
            </div>
          </div>

          {/* Action Buttons: Matches the blue style in your mobile screenshot */}
         {/* Action Buttons Container */}
<div style={{
  display: "flex",
  gap: "12px",
  padding: "16px",
  backgroundColor: "#fff",
  borderTop: "1px solid #f0f0f0",
  /* The following styles make it look like your screenshot on mobile */
  position: window.innerWidth < 768 ? "fixed" : "relative",
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  width: "100%",
  boxSizing: "border-box"
}}>
  <button 
    onClick={handleAddToCart}
    style={{ 
      flex: 1, 
      padding: "14px", 
      borderRadius: "10px", 
      border: "1px solid #d1d5db", // Subtle grey border like screenshot
      background: "#fff", 
      color: "#2563eb", // Deep blue text
      fontWeight: "600", 
      fontSize: "15px",
      cursor: "pointer",
      transition: "background 0.2s"
    }}
  >
    Add to Cart
  </button>
  
  <button 
    onClick={handleAddToCart}
    style={{ 
      flex: 1, 
      padding: "14px", 
      borderRadius: "10px", 
      border: "none", 
      background: "#2563eb", // Primary blue background
      color: "#fff", 
      fontWeight: "600", 
      fontSize: "15px",
      cursor: "pointer",
      boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.2)"
    }}
  >
    Buy Now
  </button>
</div>

{/* Spacer for mobile so content doesn't get hidden behind fixed buttons */}
{window.innerWidth < 768 && <div style={{ height: "80px" }} />}
        </div>
      </div>

      {/* Floating Message Icon */}
      <div style={{ 
        position: "fixed", bottom: "20px", right: "20px", 
        background: "#4F46E5", padding: "15px", borderRadius: "50%", 
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)", cursor: "pointer" 
      }}>
        <MessageCircle color="white" />
      </div>
    </div>
  );
}