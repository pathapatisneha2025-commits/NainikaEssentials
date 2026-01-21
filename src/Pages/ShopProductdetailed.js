import React, { useState, useEffect } from "react"; 
import { useParams } from "react-router-dom";
import { Share2, MessageCircle } from "lucide-react";

export default function ShopProductDetails() {
  const { productId } = useParams(); // get product ID from route
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [qty, setQty] = useState(1);
  const [width, setWidth] = useState(window.innerWidth);

  // Fetch product from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://nainikaessentialsdatabas.onrender.com/products/${productId}`);
        const data = await res.json();
        setProduct(data);

        // Set default selected variant (first one)
        if (data?.variants?.length > 0) {
          setSelectedVariant(data.variants[0]);
          setSelectedSize(data.variants[0].size);
          setMainImage(data.main_image || data.thumbnails?.[0] || "");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <p style={{ padding: 100, textAlign: "center" }}>Loading product...</p>;
  if (!product) return <p style={{ padding: 100, textAlign: "center" }}>Product not found</p>;

  const isMobile = width < 768;
  const currentStock = selectedVariant?.stock || 0;
  const currentPrice = selectedVariant?.price || 0;

 
const handleAddToCart = async () => {
  const user = JSON.parse(localStorage.getItem("adminUser"));

  if (!selectedVariant) return alert("Please select a variant!");
  if (qty > selectedVariant.stock) return alert(`Only ${selectedVariant.stock} items in stock`);

  const productObj = {
    product_id: product.id,
    product_name: product.name,
    selected_color: selectedVariant.color || "Default",
    selected_size: selectedVariant.size || "Free Size",
    quantity: qty,
    price_at_addition: selectedVariant.price || 0,
    product_images: [product.main_image, ...(product.thumbnails || [])],
  };

  try {
    // 1️⃣ Reduce stock in backend immediately
    const res = await fetch(
      `https://nainikaessentialsdatabas.onrender.com/products/reduce-stock`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: product.id,
          size: selectedVariant.size,
          color: selectedVariant.color,
          quantity: qty,
        }),
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to reduce stock");

    // 2️⃣ Update frontend stock immediately
    setSelectedVariant(prev => ({ ...prev, stock: prev.stock - qty }));

    // 3️⃣ Add to cart (backend or localStorage)
    if (user && user.user_id) {
      const cartRes = await fetch(
        "https://nainikaessentialsdatabas.onrender.com/carts/add",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: user.user_id, product: productObj }),
        }
      );
      const cartData = await cartRes.json();
      if (!cartRes.ok) throw new Error(cartData.error || "Failed to add to cart");
    } else {
      let guestCart = JSON.parse(localStorage.getItem("cart")) || [];
      const index = guestCart.findIndex(
        item =>
          item.product_id === product.id &&
          item.selected_color === productObj.selected_color &&
          item.selected_size === productObj.selected_size
      );
      if (index > -1) guestCart[index].quantity += qty;
      else guestCart.push(productObj);
      localStorage.setItem("cart", JSON.stringify(guestCart));
    }

    alert(`${product.name} added to cart!`);
    window.dispatchEvent(new Event("cartUpdated"));
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};



 const incrementQty = () => {
  if (qty < (selectedVariant?.stock || 0)) {
    setQty(qty + 1);
  } else {
    alert(`Only ${selectedVariant.stock} items in stock`);
  }
};

const decrementQty = () => {
  if (qty > 1) {
    setQty(qty - 1);
  }
};
const handleVariantSelect = (variant) => {
  setSelectedVariant(variant);
  setSelectedSize(variant.size);
  setQty(1); // reset quantity
};

  
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: product.name, text: product.category, url: window.location.href });
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
            {[product.main_image, ...(product.thumbnails || [])].map((img, idx) => (
              <img
                key={idx}
                src={img}
                onClick={() => setMainImage(img)}
                style={{ width: '60px', height: '80px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer', border: mainImage === img ? '2px solid #4F46E5' : '1px solid #ddd' }}
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

          <p style={{ color: '#666', margin: '10px 0' }}>Category: {product.category}</p>

          {/* Price */}
          <div style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '12px', color: '#666', display: 'block' }}>Price</span>
            <span style={{ fontSize: '24px', fontWeight: '700' }}>₹{currentPrice}</span>
          </div>

          {/* Variant selection */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '14px', fontWeight: '500', marginBottom: '10px' }}>Variants</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
             {product.variants.map((v, idx) => (
  <button key={idx} onClick={() => handleVariantSelect(v)}
    style={{
      padding: '10px 20px',
      borderRadius: '8px',
      border: selectedVariant === v ? '2px solid #4F46E5' : '1px solid #E5E7EB',
      cursor: 'pointer'
    }}
  >
    {v.color} - {v.size}
  </button>
))}

            </div>
            <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>{currentStock} available</p>
          </div>

          {/* Qty */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
            <span>Qty</span>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: 20, padding: '2px 10px' }}>
              <button onClick={decrementQty} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>-</button>
              <span style={{ padding: '0 10px' }}>{qty}</span>
              <button onClick={incrementQty} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>+</button>
            </div>
          </div>

{/* Buttons */}
<div
  style={{
    display: 'flex',
    gap: 8,
    padding: 12,
    backgroundColor: '#fff',
    borderTop: '1px solid #f0f0f0',
    position: 'relative', // keep relative so buttons don't float over content
    bottom: 'auto',
    left: 0,
    right: 0,
    zIndex: 100,
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    flexDirection: 'row', // always side by side
  }}
>
  <button
    onClick={handleAddToCart}
    style={{
      flex: 1,        // share space equally
      padding: 14,
      borderRadius: 10,
      border: '1px solid #d1d5db',
      background: '#fff',
      color: '#2563eb',
      fontWeight: 600,
      cursor: 'pointer',
    }}
  >
    Add to Cart
  </button>
  <button
    onClick={handleAddToCart}
    style={{
      flex: 1,
      padding: 14,
      borderRadius: 10,
      border: 'none',
      background: '#2563eb',
      color: '#fff',
      fontWeight: 600,
      cursor: 'pointer',
    }}
  >
    Buy Now
  </button>
</div>


{/* Spacer so content is not hidden behind fixed buttons */}
<div style={{ height: 70 }} />


{/* Spacer so content is not hidden behind fixed bar */}
{isMobile && <div style={{ height: 70 }} />}

        </div>
      </div>

      {/* Floating Message Icon */}
      <div style={{ position: 'fixed', bottom: 20, right: 20, background: '#4F46E5', padding: 15, borderRadius: '50%', boxShadow: '0 4px 10px rgba(0,0,0,0.2)', cursor: 'pointer' }}>
        <MessageCircle color="white" />
      </div>
    </div>
  );
}
