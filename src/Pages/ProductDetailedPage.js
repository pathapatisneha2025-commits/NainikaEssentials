import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Share2, MessageCircle, ChevronUp, ChevronDown } from "lucide-react";

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [qty, setQty] = useState(1);
  const [width, setWidth] = useState(window.innerWidth);
  const [newReview, setNewReview] = useState({ name: "", rating: 0, comment: "" });
  const [submitting, setSubmitting] = useState(false);

  const [showDetails, setShowDetails] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const productType = location.state?.type || "bestseller";
  const endpointMap = { bestseller: "bestseller", newarrival: "newarrival", featured: "featured" };

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://nainikaessentialsdatabas.onrender.com/${endpointMap[productType]}/${productId}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
        setSelectedVariant(
          data?.variants?.[0] || {
            color: "Default",
            size: "Free Size",
            price: data.price || 0,
            stock: data.stock || 0,
            main_image: data.main_image,
          }
        );
setReviews(Array.isArray(data.reviews) ? data.reviews : []);
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId, productType]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <p style={{ padding: 100, textAlign: "center" }}>Loading product...</p>;
  if (!product) return <p style={{ padding: 100, textAlign: "center" }}>Product not found</p>;

  const isMobile = width < 768;
  const currentStock = selectedVariant?.stock || 0;
// Calculate discounted price
const discount = parseFloat(product.discount || 0); // discount % from product
const originalPrice = selectedVariant?.price || 0;
const currentPrice = Math.round(originalPrice * (1 - discount / 100));

  const incrementQty = () => qty < currentStock && setQty(qty + 1);
  const decrementQty = () => qty > 1 && setQty(qty - 1);
  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    setQty(1);
  };
const handleAddToCart = async () => {
  if (!selectedVariant) return alert("Please select a variant!");
  if (qty > selectedVariant.stock) return alert(`Only ${selectedVariant.stock} items in stock`);

  // Determine userId (guest or logged-in)
  const user = JSON.parse(localStorage.getItem("adminUser"));
  let userId = user?.user_id;

  // Guest user
  if (!userId) {
    let guestId = localStorage.getItem("guestId");
    if (!guestId) {
      guestId = `guest_${Date.now()}`;
      localStorage.setItem("guestId", guestId); // only for consistency
    }
    userId = guestId;
  }

  const productObj = {
    product_id: product.id,
    product_name: product.name,
    selected_color: selectedVariant.color || "Default",
    selected_size: selectedVariant.size || "Free Size",
    quantity: qty,
    price_at_addition: currentPrice,
    product_images: [product.main_image, ...(product.thumbnails || [])],
  };

  try {
    // Reduce stock in DB
    const resStock = await fetch(`https://nainikaessentialsdatabas.onrender.com/bestseller/reduce-stock`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: product.id,
        size: selectedVariant.size,
        color: selectedVariant.color,
        quantity: qty,
      }),
    });
    if (!resStock.ok) throw new Error("Failed to reduce stock");

    setSelectedVariant(prev => ({ ...prev, stock: prev.stock - qty }));

    // Add cart to DB (guest or logged-in)
    const resCart = await fetch("https://nainikaessentialsdatabas.onrender.com/carts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, product: productObj }),
    });
    if (!resCart.ok) throw new Error("Failed to add to cart");

    alert(`${product.name} added to cart!`);
    window.dispatchEvent(new Event("cartUpdated"));
  } catch (err) {
    alert(err.message);
  }
};



const handleBuyNow = async () => {
  await handleAddToCart(); // Add to cart first
  navigate("/checkout"); // Redirect to checkout
};


  const handleShare = async () => {
    if (navigator.share) await navigator.share({ title: product.name, text: product.category, url: window.location.href });
    else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    }
  };

  const submitReview = async () => {
    if (!newReview.name || !newReview.rating || !newReview.comment) return alert("Fill all fields!");
    setSubmitting(true);
    try {
      const res = await fetch(
        `https://nainikaessentialsdatabas.onrender.com/${endpointMap[productType]}/${productId}/review`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newReview),
        }
      );
      if (!res.ok) throw new Error("Failed to submit review");
      const savedReview = await res.json();
      setReviews((prev) => [...prev, savedReview]);
      setNewReview({ name: "", rating: 0, comment: "" });
      alert("Review submitted!");
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = { display: "block", width: "100%", padding: 10, marginBottom: 10, borderRadius: 6, border: "1px solid #ddd" };
  const averageRating = reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  // Make sure description is always a string
const productDescription =
  typeof product.description === "string"
    ? product.description
    : "";

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 20, fontFamily: "sans-serif" }}>
      {/* PRODUCT SECTION */}
      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 40 }}>
        {/* IMAGES */}
        <div style={{ flex: 1.2, display: "flex", gap: 15 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[product.main_image, ...(product.thumbnails || [])].map((img, idx) => (
              <img
                key={idx}
                src={img}
                onClick={() => setSelectedVariant((prev) => ({ ...prev, main_image: img }))}
                style={{
                  width: 50,
                  height: 40,
                  objectFit: "cover",
                  borderRadius: 8,
                  cursor: "pointer",
                  border: selectedVariant?.main_image === img ? "2px solid #4F46E5" : "1px solid #ddd",
                }}
              />
            ))}
          </div>
          <div style={{ flex: 1 }}>
            <img src={selectedVariant?.main_image || product.main_image} style={{ width: "100%", borderRadius: 16, objectFit: "cover" }} alt={product.name} />
          </div>
        </div>

        {/* INFO */}
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
            <h1 style={{ fontSize: 28, fontWeight: 600 }}>{product.name}</h1>
            <div
              onClick={handleShare}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Share2 size={18} color="#64748b" />
            </div>
          </div>
          <p style={{ color: "#666", margin: "10px 0" }}>Category: {product.category}</p>
<p style={{ fontSize: 24, fontWeight: 700 }}>
  ₹{currentPrice}
  {discount > 0 && (
    <span style={{ textDecoration: "line-through", color: "#999", fontSize: 14, marginLeft: 8 }}>
      ₹{originalPrice}
    </span>
  )}
</p>
          <p style={{ color: "#f59e0b", fontWeight: 600 }}>
            Average Rating: {averageRating.toFixed(1)} ★
          </p>

          {/* VARIANTS */}
          <div style={{ margin: "20px 0" }}>
            <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 10 }}>Variants</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {product.variants?.length ? (
                product.variants.map((v, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleVariantSelect(v)}
                    style={{
                      padding: "10px 20px",
                      borderRadius: 8,
                      border: selectedVariant === v ? "2px solid #4F46E5" : "1px solid #E5E7EB",
                      cursor: "pointer",
                      background: "#fff",
                    }}
                  >
                    {v.color} - {v.size}
                  </button>
                ))
              ) : (
                <span>No variants</span>
              )}
            </div>
            <p style={{ fontSize: 12, color: "#666", marginTop: 8 }}>{currentStock} available</p>
          </div>

          {/* QUANTITY */}
          <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 30 }}>
            <span>Qty</span>
            <div style={{ display: "flex", alignItems: "center", border: "1px solid #ddd", borderRadius: 20, padding: "2px 10px" }}>
              <button onClick={decrementQty} style={{ border: "none", background: "none", cursor: "pointer" }}>
                -
              </button>
              <span style={{ padding: "0 15px", fontWeight: 600 }}>{qty}</span>
              <button onClick={incrementQty} style={{ border: "none", background: "none", cursor: "pointer" }}>
                +
              </button>
            </div>
          </div>

          {/* ADD TO CART / BUY NOW */}
          <div style={{ display: "flex", gap: 12, marginBottom: 30 }}>
            <button
            onClick={handleAddToCart} 
              style={{ flex: 1, padding: 16, borderRadius: 10, border: "1px solid #2563eb", background: "#fff", color: "#2563eb", cursor: "pointer" }}
            >
              Add to Cart
            </button>
          <button
  onClick={handleBuyNow}
  style={{ flex: 1, padding: 16, borderRadius: 10, border: "none", background: "#2563eb", color: "#fff", cursor: "pointer" }}
>
  Buy Now
</button>

          </div>

      {/* PRODUCT DETAILS ACCORDION */}
      <div style={{ borderTop: "1px solid #eee", marginTop: 30 }}>
        <div
          onClick={() => setShowDetails(!showDetails)}
          style={{ display: "flex", justifyContent: "space-between", padding: "15px 0", cursor: "pointer", alignItems: "center" }}
        >
          <span style={{ fontWeight: 600 }}>Product Details</span>
          {showDetails ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
       {showDetails && (
  <div style={{ paddingBottom: 15 }}>
    {Array.isArray(product.product_details) && product.product_details.length > 0 ? (
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <tbody>
          {product.product_details.map((item, i) => {
            const fallbackLabels = [
              "Brand",
              "Fabric",
              "Fit",
              "Sleeve",
              "Occasion",
              "Made In",
            ];

            return (
              <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "8px 0", color: "#64748b" }}>
                  {item.label || fallbackLabels[i] || `Detail ${i + 1}`}
                </td>
                <td style={{ padding: "8px 0", textAlign: "right", fontWeight: 500 }}>
                  {item.value}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    ) : (
      <p style={{ fontSize: 14, color: "#666" }}>No product details available.</p>
    )}
  </div>
)}

      </div>

      {/* DESCRIPTION ACCORDION */}
      <div style={{ borderTop: "1px solid #eee", borderBottom: "1px solid #eee", marginTop: 15 }}>
        <div
          onClick={() => setShowDescription(!showDescription)}
          style={{ display: "flex", justifyContent: "space-between", padding: "15px 0", cursor: "pointer", alignItems: "center" }}
        >
          <span style={{ fontWeight: 600 }}>Description</span>
          {showDescription ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
     {showDescription && (
  <div style={{ padding: "10px 0", fontSize: 14, color: "#666", lineHeight: 1.6 }}>
    <p style={{ whiteSpace: "pre-line" }}>{productDescription}</p>

    <div style={{ display: "flex", gap: 20, marginTop: 15, fontSize: 12 }}>
      <span>7-day returns</span>
      <span>COD available</span>
    </div>
  </div>
)}

      </div>
      </div>
        </div>

      {/* REVIEWS */}
      <div style={{ marginTop: 30 }}>
        <p style={{ color: "#f59e0b", fontWeight: 600 }}>
          Average Rating: {averageRating.toFixed(1)}{" "}
          {Array.from({ length: 5 }).map((_, idx) => (
            <span key={idx} style={{ color: "#FFD700" }}>
              {idx < Math.round(averageRating) ? "★" : "☆"}
            </span>
          ))}
        </p>

        <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 20 }}>Customer Reviews</h2>
        {reviews.length ? (
          reviews.map((r, i) => (
            <div key={i} style={{ marginBottom: 20, padding: 12, border: "1px solid #eee", borderRadius: 8 }}>
              <p style={{ fontWeight: 600 }}>
                {r.name}{" "}
                <span style={{ fontWeight: 400, color: "#666", fontSize: 12 }}>
                  ({new Date(r.date).toLocaleDateString()})
                </span>
              </p>
              <div style={{ color: "#FFD700", marginBottom: 6 }}>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span key={idx}>{idx < r.rating ? "★" : "☆"}</span>
                ))}
              </div>
              <p>{r.comment}</p>
            </div>
          ))
        ) : (
          <p style={{ color: "#666", fontSize: 14 }}>No reviews yet. Be the first!</p>
        )}

        <div style={{ marginTop: 30 }}>
          <h3 style={{ fontWeight: 600, marginBottom: 10 }}>Write a Review</h3>
          <input
            type="text"
            placeholder="Your Name"
            value={newReview.name}
            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
            style={inputStyle}
          />
          <textarea
            placeholder="Write your review"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            style={{ ...inputStyle, height: 80 }}
          />
          <div style={{ display: "flex", gap: 5, marginBottom: 10 }}>
            {Array.from({ length: 5 }).map((_, idx) => (
              <span
                key={idx}
                onClick={() => setNewReview((prev) => ({ ...prev, rating: idx + 1 }))}
                style={{ cursor: "pointer", fontSize: 24, color: idx < newReview.rating ? "#FFD700" : "#ddd" }}
              >
                ★
              </span>
            ))}
          </div>
          <button
            onClick={submitReview}
            disabled={submitting}
            style={{ padding: 12, borderRadius: 8, background: "#2563eb", color: "#fff", border: "none", cursor: "pointer" }}
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>

      {/* Floating message */}
      <div
        style={{
          position: "fixed",
          bottom: 30,
          right: 30,
          background: "#4F46E5",
          width: 56,
          height: 56,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 15px rgba(79,70,229,0.4)",
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        <MessageCircle color="white" size={28} />
      </div>
    </div>
  );
}
