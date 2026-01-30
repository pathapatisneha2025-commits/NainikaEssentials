import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Share2, MessageCircle, ChevronDown, ChevronUp } from "lucide-react"; // Added Chevrons

export default function ShopProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [qty, setQty] = useState(1);
  const [width, setWidth] = useState(window.innerWidth);
const [showDescription, setShowDescription] = useState(false);

  // New states for the UI sections in screenshots
  const [showDetails, setShowDetails] = useState(true);
  const [showReviews, setShowReviews] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://nainikaessentialsdatabas.onrender.com/products/${productId}`);
        const data = await res.json();
        setProduct(data);

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
const discountedPrice = product.discount
  ? Math.round(currentPrice - (currentPrice * Number(product.discount)) / 100)
  : currentPrice;

// --- Utility: Get user or guest ID ---
const getUserId = () => {
  const storedUser = JSON.parse(localStorage.getItem("adminUser") || "{}");
  if (storedUser.user_id) return storedUser.user_id;

  let guestId = localStorage.getItem("guestId");
  if (!guestId) {
    guestId = `guest_${Date.now()}`;
    localStorage.setItem("guestId", guestId);
  }
  return guestId;
};

// --- ADD TO CART FUNCTION ---
const handleAddToCart = async () => {
  const userId = getUserId();
  if (!selectedVariant) return alert("Please select a variant!");
  if (qty > selectedVariant.stock) return alert(`Only ${selectedVariant.stock} items in stock`);

  const productObj = {
    product_id: product.id,
    product_name: product.name,
    selected_color: selectedVariant.color || "Default",
    selected_size: selectedVariant.size || "Free Size",
    quantity: qty,
    price_at_addition: product.discount ? discountedPrice : selectedVariant.price,
    product_images: [product.main_image, ...(product.thumbnails || [])],
  };

  try {
    // Reduce stock
    const res = await fetch(`https://nainikaessentialsdatabas.onrender.com/products/reduce-stock`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: product.id,
        size: selectedVariant.size,
        color: selectedVariant.color,
        quantity: qty,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to reduce stock");
    setSelectedVariant(prev => ({ ...prev, stock: prev.stock - qty }));

    // Add to backend cart (user or guest)
    const cartRes = await fetch(`https://nainikaessentialsdatabas.onrender.com/carts/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, product: productObj }),
    });

    if (!cartRes.ok) throw new Error("Failed to add to cart");

    alert(`${product.name} added to cart!`);
    window.dispatchEvent(new Event("cartUpdated"));
  } catch (err) {
    alert(err.message);
  }
};

// --- BUY NOW FUNCTION ---
const handleBuyNow = async () => {
  const userId = getUserId();
  if (!selectedVariant) return alert("Please select a variant!");
  if (qty > selectedVariant.stock) return alert(`Only ${selectedVariant.stock} items in stock`);

  const productObj = {
    product_id: product.id,
    product_name: product.name,
    selected_color: selectedVariant.color || "Default",
    selected_size: selectedVariant.size || "Free Size",
    quantity: qty,
    price_at_addition: product.discount ? discountedPrice : selectedVariant.price,
    product_images: [product.main_image, ...(product.thumbnails || [])],
  };

  try {
    // Reduce stock
    const res = await fetch(`https://nainikaessentialsdatabas.onrender.com/products/reduce-stock`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: product.id,
        size: selectedVariant.size,
        color: selectedVariant.color,
        quantity: qty,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to reduce stock");
    setSelectedVariant(prev => ({ ...prev, stock: prev.stock - qty }));

    // Add to backend cart (user or guest)
    const cartRes = await fetch(`https://nainikaessentialsdatabas.onrender.com/carts/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, product: productObj }),
    });

    if (!cartRes.ok) throw new Error("Failed to add to cart");

    window.dispatchEvent(new Event("cartUpdated"));

    // Redirect to checkout
    window.location.href = "/checkout"; // or use navigate("/checkout") if using useNavigate
  } catch (err) {
    alert(err.message);
  }
};


  const incrementQty = () => qty < (selectedVariant?.stock || 0) ? setQty(qty + 1) : alert(`Only ${selectedVariant.stock} items in stock`);
  const decrementQty = () => qty > 1 && setQty(qty - 1);
  const handleVariantSelect = (variant) => { setSelectedVariant(variant); setSelectedSize(variant.size); setQty(1); };
  const handleShare = async () => {
    if (navigator.share) await navigator.share({ title: product.name, text: product.category, url: window.location.href });
    else { navigator.clipboard.writeText(window.location.href); alert("Link copied!"); }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px", fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: "40px" }}>
        
        {/* Left: Images */}
        <div style={{ flex: 1.2, display: 'flex', gap: '15px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[product.main_image, ...(product.thumbnails || [])].map((img, idx) => (
              <img
                key={idx}
                src={img}
                onClick={() => setMainImage(img)}
                style={{ width: '70px', height: '90px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer', border: mainImage === img ? '2px solid #4F46E5' : '1px solid #ddd' }}
              />
            ))}
          </div>
          <div style={{ flex: 1 }}>
            <img src={mainImage} style={{ width: "100%", borderRadius: "16px", objectFit: "cover" }} alt="Product" />
          </div>
        </div>

        {/* Right: Info */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '600', margin: 0 }}>{product.name}</h1>
            <div onClick={handleShare} style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Share2 size={18} color="#64748b" />
            </div>
          </div>

          <p style={{ color: '#666', margin: '10px 0' }}>Category: {product.category}</p>

       <div style={{ marginBottom: '20px' }}>
  <span style={{ fontSize: '12px', color: '#666', display: 'block' }}>Price</span>
  <span style={{ fontSize: '24px', fontWeight: '700' }}>
    {product.discount ? (
      <>
        <span style={{ textDecoration: 'line-through', color: '#888', marginRight: 8 }}>
          ₹{selectedVariant?.price}
        </span>
        <span style={{ color: '#f43f5e' }}>₹{discountedPrice}</span>
        <span style={{ color: '#16a34a', marginLeft: 6 }}>({product.discount}% OFF)</span>
      </>
    ) : (
      <>₹{selectedVariant?.price}</>
    )}
  </span>
</div>


          {/* Qty and Variant logic remains the same... */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '14px', fontWeight: '500', marginBottom: '10px' }}>Variants</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {product.variants.map((v, idx) => (
                <button key={idx} onClick={() => handleVariantSelect(v)}
                  style={{ padding: '10px 20px', borderRadius: '8px', 
                  border: selectedVariant?.size === v.size && selectedVariant?.color === v.color? '2px solid #4F46E5' : '1px solid #E5E7EB', background: '#fff', cursor: 'pointer' }}>
                  {v.color} - {v.size}
                </button>
              ))}
            </div>
            <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>{currentStock} available</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
            <span>Qty</span>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: 20, padding: '2px 10px' }}>
              <button onClick={decrementQty} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 18 }}>-</button>
              <span style={{ padding: '0 15px', fontWeight: 600 }}>{qty}</span>
              <button onClick={incrementQty} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 18 }}>+</button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, marginBottom: 30 }}>
  <button
    onClick={handleAddToCart}
    style={{ flex: 1, padding: 16, borderRadius: 10, border: '1px solid #2563eb', background: '#fff', color: '#2563eb', fontWeight: 600, cursor: 'pointer' }}
  >
    Add to Cart
  </button>

  <button
    onClick={handleBuyNow}
    style={{ flex: 1, padding: 16, borderRadius: 10, border: 'none', background: '#2563eb', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
  >
    Buy Now
  </button>
</div>


        {/* --- PRODUCT DETAILS ACCORDION --- */}
<div style={{ borderTop: '1px solid #eee' }}>
  <div
    onClick={() => setShowDetails(prev => !prev)}
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '15px 0',
      cursor: 'pointer',
      alignItems: 'center'
    }}
  >
    <span style={{ fontWeight: '600' }}>Product Details</span>
    {showDetails ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
  </div>

  {showDetails && (
    <div style={{ paddingBottom: 15 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <tbody>
          {product.product_details ? (
            Object.entries(product.product_details).map(([key, value], i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f9f9f9' }}>
                <td style={{ padding: '8px 0', color: '#666' }}>{key}</td>
                <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: '500' }}>
                  {value}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" style={{ padding: '10px 0', color: '#999', textAlign: 'center' }}>
                No product details available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )}
</div>


        {/* --- DESCRIPTION ACCORDION --- */}
<div style={{ borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
  <div
    onClick={() => setShowDescription(!showDescription)}
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '15px 0',
      cursor: 'pointer',
      alignItems: 'center'
    }}
  >
    <span style={{ fontWeight: '600' }}>Description</span>
    {showDescription ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
  </div>

  {showDescription && (
  <div
    style={{
      padding: '10px 0',
      fontSize: '14px',
      color: '#666',
      lineHeight: '1.6',
      whiteSpace: 'pre-line'
    }}
  >
    {product.description ? (
      <>
        <p>{product.description}</p>

        <div style={{ display: 'flex', gap: 20, marginTop: 15, fontSize: '12px', color: '#666' }}>
          <span>7-day returns</span>
          <span>COD available</span>
        </div>
      </>
    ) : (
      <p style={{ color: '#999' }}>No description available.</p>
    )}
  </div>
)}

</div>

          
         

        </div>
      </div>

      {/* --- CUSTOMER REVIEWS SECTION (Added from Screenshot 2) --- */}
      <div style={{ marginTop: 60, borderTop: '1px solid #eee', paddingTop: 40 }}>
        <h2 style={{ fontSize: '22px', fontWeight: '600', marginBottom: 20 }}>Customer Reviews</h2>
        <p style={{ color: '#666', fontSize: '14px' }}>No reviews yet. Be the first to review this product.</p>
      </div>

      {/* Floating Message Icon */}
      <div style={{ position: 'fixed', bottom: 30, right: 30, background: '#4F46E5', width: 56, height: 56, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(79, 70, 229, 0.4)', cursor: 'pointer', zIndex: 1000 }}>
        <MessageCircle color="white" size={28} />
      </div>
    </div>
  );
}