import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Share2, MessageCircle } from "lucide-react";

// Product data with price per size
export const PRODUCTS = [
  {
    id: 1,
    slug: "black-hoodie",
    name: "Black Hoodie",
    category: "hoodie",
    description: "Premium black cotton hoodie with a comfortable fit, featuring a double-lined hood and heavy-duty ribbed cuffs.",
    fabric: "Cotton",
    care: "Machine Wash",
    sizes: ["S", "M", "L", "XL"],
    variants: [
      {
        color: "Black",
        price: { S: 1299, M: 1399, L: 1499, XL: 1599 },
        originalPrice: { S: 1999, M: 2099, L: 2199, XL: 2299 },
        image: "/blackhoddie.jpeg",
        images: {
          front: "/blackhoddie.jpeg",
          back: "/backhoddie.jpeg",
          side: "/sidehoddie.jpeg"
        },
        stock: { S: 5, M: 4, L: 3, XL: 2 }
      },
      {
        color: "Brown",
        price: { S: 1399, M: 1499, L: 1599, XL: 1699 },
        originalPrice: { S: 2099, M: 2199, L: 2299, XL: 2399 },
        image: "/brown.jpeg",
        images: {
          front: "/brown.jpeg",
          back: "/brown.jpeg",
          side: "/brown.jpeg"
        },
        stock: { S: 3, M: 2, L: 1, XL: 0 }
      }
    ]
  },
  {
    id: 2,
    slug: "grey-hoodie",
    name: "Grey Hoodie",
    category: "hoodie",
    description: "Stylish grey hoodie perfect for casual wear.",
    fabric: "Cotton",
    care: "Machine Wash",
    sizes: ["S", "M", "L", "XL"],
    variants: [
      {
        color: "Grey",
        price: { S: 1399, M: 1499, L: 1599, XL: 1699 },
        originalPrice: { S: 1999, M: 2099, L: 2199, XL: 2299 },
        image: "/hoodie.jpeg",
        images: {
          front: "/hoodie.jpeg",
          back: "/hoodie-back.jpeg",
          side: "/hoodie-side.jpeg"
        },
        stock: { S: 4, M: 4, L: 3, XL: 2 }
      }
    ]
  },
  {
    id: 3,
    slug: "casual-shirt",
    name: "Casual Shirt",
    category: "shirts",
    description: "Lightweight casual shirt suitable for everyday use, crafted from breathable linen for all-day comfort.",
    fabric: "Linen",
    care: "Hand Wash",
    sizes: ["S", "M", "L", "XL"],
    variants: [
      {
        color: "Blue",
        price: { S: 999, M: 1049, L: 1099, XL: 1149 },
        originalPrice: { S: 1499, M: 1549, L: 1599, XL: 1649 },
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
        price: { S: 1099, M: 1149, L: 1199, XL: 1249 },
        originalPrice: { S: 1599, M: 1649, L: 1699, XL: 1749 },
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
    id: 4,
    slug: "t-shirt",
    name: "Casual T-Shirt",
    category: "shirts",
    description: "Lightweight casual t-shirt suitable for everyday use.",
    fabric: "Cotton",
    care: "Machine Wash",
    sizes: ["S", "M", "L", "XL"],
    variants: [
      {
        color: "White",
        price: { S: 699, M: 749, L: 799, XL: 849 },
        originalPrice: { S: 999, M: 1049, L: 1099, XL: 1149 },
        image: "/Tshirt.jpeg",
        images: {
          front: "/Tshirt.jpeg",
          back: "/Tshirt-back.jpeg"
        },
        stock: { S: 5, M: 4, L: 3, XL: 2 }
      }
    ]
  },
  {
    id: 5,
    slug: "formal-pants-white",
    name: "Formal Pants",
    category: "pants",
    description: "Slim-fit formal pants for office and occasions.",
    fabric: "Cotton Blend",
    care: "Machine Wash",
    sizes: ["30", "32", "34", "36"],
    variants: [
      {
        color: "White",
        price: { 30: 1199, 32: 1249, 34: 1299, 36: 1349 },
        originalPrice: { 30: 1599, 32: 1649, 34: 1699, 36: 1749 },
        image: "/whitepants.jpeg",
        images: {
          front: "/whitepants.jpeg",
          back: "/whitepants-back.jpeg"
        },
        stock: { 30: 4, 32: 3, 34: 2, 36: 1 }
      }
    ]
  },
  {
    id: 6,
    slug: "formal-pants-grey",
    name: "Formal Pants",
    category: "pants",
    description: "Slim-fit formal pants for office and occasions.",
    fabric: "Cotton Blend",
    care: "Machine Wash",
    sizes: ["30", "32", "34", "36"],
    variants: [
      {
        color: "Grey",
        price: { 30: 1199, 32: 1249, 34: 1299, 36: 1349 },
        originalPrice: { 30: 1599, 32: 1649, 34: 1699, 36: 1749 },
        image: "/greypants.jpeg",
        images: {
          front: "/greypants.jpeg",
          back: "/greypants-back.jpeg"
        },
        stock: { 30: 4, 32: 3, 34: 2, 36: 1 }
      }
    ]
  },
  {
    id: 7,
    slug: "soft-tshirt",
    name: "Soft T-Shirt",
    category: "clothing",
    description: "Soft cotton t-shirt with breathable fabric.",
    fabric: "Cotton",
    care: "Machine Wash",
    sizes: ["S", "M", "L", "XL"],
    variants: [
      {
        color: "Pink",
        price: { S: 699, M: 749, L: 799, XL: 849 },
        originalPrice: { S: 999, M: 1049, L: 1099, XL: 1149 },
        image: "/pinksaree.jpeg",
        images: {
          front: "/pinksaree.jpeg",
          back: "/pinksaree-back.jpeg"
        },
        stock: { S: 5, M: 4, L: 3, XL: 2 }
      }
    ]
  }
];

export default function ProductDetails() {
  const { slug, productId } = useParams();
  const product = PRODUCTS.find(p => p.slug === slug || p.id === Number(productId));

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedView, setSelectedView] = useState("front");
  const [mainImage, setMainImage] = useState("");
  const [qty, setQty] = useState(1);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    if (product) {
      const firstVariant = product.variants[0];
      setSelectedColor(firstVariant);
      setSelectedSize(product.sizes[0]);
      setSelectedView("front");
      setMainImage(firstVariant.images.front || firstVariant.image);
    }
  }, [product]);

  useEffect(() => {
    if (selectedColor) {
      setMainImage(selectedColor.images.front || selectedColor.image);
      setSelectedSize(product.sizes[0]); // reset size when color changes
    }
  }, [selectedColor, product]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!product) return <p style={{ padding: 100, textAlign: "center" }}>Product not found</p>;

  const isMobile = width < 768;
  const currentStock = selectedColor?.stock[selectedSize] || 0;
  const currentPrice = selectedColor?.price[selectedSize] || 0;
  const currentOriginalPrice = selectedColor?.originalPrice[selectedSize] || 0;

  const incrementQty = () => { if (qty < currentStock) setQty(qty + 1); };
  const decrementQty = () => { if (qty > 1) setQty(qty - 1); };

 const handleAddToCart = async () => {
  const user = JSON.parse(localStorage.getItem("adminUser") || "{}");
  let userId = user?.user_id || localStorage.getItem("guest_id");

  // If no guest ID yet, create one
  const isGuest = !user?.user_id;
  if (!userId) {
    userId = "GUEST_" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("guest_id", userId);
  }

  const productObj = {
    product_id: product.id,
    product_name: product.name,
    selected_color: selectedColor.color,
    selected_size: selectedSize,
    quantity: qty,
    price_at_addition: currentPrice,
    product_images: selectedColor.images,
  };

  if (isGuest) {
    // --- Guest: store in localStorage ---
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = storedCart.findIndex(
      item => item.product_id === productObj.product_id &&
              item.selected_size === productObj.selected_size &&
              item.selected_color === productObj.selected_color
    );

    if (existingIndex > -1) {
      storedCart[existingIndex].quantity += qty; // increment if already in cart
    } else {
      storedCart.push(productObj);
    }

    localStorage.setItem("cart", JSON.stringify(storedCart));
    window.dispatchEvent(new Event("cartUpdated")); // trigger cart refresh
    alert("Added to cart!");
  } else {
    // --- Logged-in user: send to API ---
    try {
      const res = await fetch("https://nainikaessentialsdatabas.onrender.com/carts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, product: productObj })
      });

      const data = await res.json();

      if (res.ok) {
        window.dispatchEvent(new Event("cartUpdated"));
        alert("Added to cart!");
      } else {
        alert(data.error || "Failed to add to cart.");
      }
    } catch (err) {
      console.error("Add to cart API error:", err);
      alert("Something went wrong.");
    }
  }
};


  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: product.name, text: product.description, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: "30px" }}>
        
        {/* Left: Images */}
        <div style={{ flex: 1, display: 'flex', gap: '15px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {selectedColor && Object.entries(selectedColor.images).map(([view, img]) => (
              <img
                key={view}
                src={img}
                onClick={() => { setSelectedView(view); setMainImage(img); }}
                style={{ width: '60px', height: '80px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer', border: selectedView === view ? '2px solid #4F46E5' : '1px solid #ddd' }}
              />
            ))}
          </div>
          <div style={{ flex: 1 }}>
            <img src={mainImage} style={{ width: "100%", borderRadius: "16px", objectFit: "cover" }} alt="Product" />
          </div>
        </div>

        {/* Right: Info */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '600' }}>{product.name}</h1>
            <div onClick={handleShare} style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Share2 size={18} color="#64748b" />
            </div>
          </div>

          <p style={{ color: '#666', margin: '10px 0' }}>{product.description}</p>

          {/* Price */}
          <div style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '12px', color: '#666', display: 'block' }}>Price</span>
            <span style={{ fontSize: '24px', fontWeight: '700' }}>₹{currentPrice}</span>
            <span style={{ fontSize: '16px', color: '#999', textDecoration: 'line-through', marginLeft: '10px' }}>₹{currentOriginalPrice}</span>
          </div>

          {/* Size */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '14px', fontWeight: '500', marginBottom: '10px' }}>Size</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {product.sizes.map(size => (
                <button key={size} onClick={() => setSelectedSize(size)}
                  style={{ padding: '10px 20px', borderRadius: '8px', border: selectedSize === size ? '2px solid #4F46E5' : '1px solid #E5E7EB', cursor: 'pointer' }}
                >{size}</button>
              ))}
            </div>
            <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>{currentStock} available</p>
          </div>

          {/* Color */}
          <div style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
            {product.variants.map(v => (
              <div key={v.color} onClick={() => setSelectedColor(v)} style={{ cursor: 'pointer', textAlign: 'center' }}>
                <img src={v.image} style={{ width: 50, height: 60, borderRadius: 8, objectFit: 'cover', border: selectedColor?.color === v.color ? '2px solid #4F46E5' : '1px solid #ddd' }} />
                <p style={{ fontSize: 12, marginTop: 4, color: selectedColor?.color === v.color ? "#4F46E5" : "#666" }}>{v.color}</p>
              </div>
            ))}
          </div>

          {/* Qty */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
            <span>Qty</span>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: 20, padding: '2px 10px' }}>
              <button onClick={() => qty > 1 && setQty(qty - 1)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>-</button>
              <span style={{ padding: '0 10px' }}>{qty}</span>
              <button onClick={() => qty < currentStock && setQty(qty + 1)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>+</button>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 12, padding: 16, backgroundColor: '#fff', borderTop: '1px solid #f0f0f0', position: isMobile ? 'fixed' : 'relative', bottom: 0, left: 0, right: 0, zIndex: 100 }}>
            <button onClick={handleAddToCart} style={{ flex: 1, padding: 14, borderRadius: 10, border: '1px solid #d1d5db', background: '#fff', color: '#2563eb', fontWeight: 600, cursor: 'pointer' }}>Add to Cart</button>
            <button onClick={handleAddToCart} style={{ flex: 1, padding: 14, borderRadius: 10, border: 'none', background: '#2563eb', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Buy Now</button>
          </div>
          {isMobile && <div style={{ height: '80px' }} />}
        </div>
      </div>

      {/* Floating Message Icon */}
      <div style={{ position: 'fixed', bottom: 20, right: 20, background: '#4F46E5', padding: 15, borderRadius: '50%', boxShadow: '0 4px 10px rgba(0,0,0,0.2)', cursor: 'pointer' }}>
        <MessageCircle color="white" />
      </div>
    </div>
  );
}
