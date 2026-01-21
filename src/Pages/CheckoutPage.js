import React, { useState, useEffect } from "react";
import { ShieldCheck } from "lucide-react";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [address, setAddress] = useState({ name: "", street: "", city: "", state: "", phone: "", pincode: "" });
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [allCoupons, setAllCoupons] = useState([]);

  const user = JSON.parse(localStorage.getItem("adminUser"));
  let userId = user?.user_id || localStorage.getItem("guest_id");
  if (!userId) {
    userId = "GUEST_" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("guest_id", userId);
  }

  // Fetch cart
  useEffect(() => {
    fetch(`https://nainikaessentialsdatabas.onrender.com/carts/${userId}`)
      .then((res) => res.json())
      .then((data) => { setCart(data.items || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [userId]);

  // Fetch coupons
  useEffect(() => {
    fetch("https://nainikaessentialsdatabas.onrender.com/coupons/")
      .then((res) => res.json())
      .then((data) => setAllCoupons(data))
      .catch(console.error);
  }, []);

  // Handle resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <div style={{ padding: "30px", textAlign: "center" }}>Loading cart...</div>;
  if (!cart.length) return <div style={{ padding: "30px", textAlign: "center" }}>Your cart is empty.</div>;

  // Totals
  const subtotal = cart.reduce((acc, item) => acc + (item.price_at_addition || 0) * (item.quantity || 0), 0);
  const mrpTotal = cart.reduce((acc, item) => acc + ((item.price_at_addition || 0) + 500) * (item.quantity || 0), 0);
  const discount = mrpTotal - subtotal;
  const delivery = 0;
  const totalAmount = Math.max(0, subtotal + delivery - couponDiscount);

  // Apply coupon
  const applyCoupon = () => {
    if (!couponCode.trim()) return alert("Enter a coupon code");

    const coupon = allCoupons.find(c => c.code.toUpperCase() === couponCode.trim().toUpperCase());
    if (!coupon) return alert("Invalid coupon code");

    let discountAmount = 0;
    const discountValue = parseFloat(coupon.discount_value);

    cart.forEach(item => {
      const isProductApplicable = coupon.applicable_products.includes(item.product_id);
      const isCategoryApplicable = coupon.applicable_categories.map(c => c.toLowerCase()).includes(item.category?.toLowerCase());

      if (isProductApplicable || isCategoryApplicable) {
        if (coupon.discount_type === "percentage") {
          discountAmount += ((item.price_at_addition || 0) * item.quantity * discountValue) / 100;
        } else {
          discountAmount += discountValue * item.quantity;
        }
      }
    });

    if (discountAmount === 0) return alert("Coupon does not apply to any product in cart");

    setAppliedCoupon(coupon);
    setCouponDiscount(discountAmount);
    alert(`Coupon applied! You saved ₹${discountAmount.toFixed(2)}`);
  };

  // Place order
  const placeOrder = async () => {
    if (!address.name || !address.phone || !address.pincode) {
      alert("Please fill delivery address");
      return;
    }

    const payload = {
      user_id: userId,
      items: JSON.stringify(cart.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price_at_addition,
        size: item.selected_size,
        color: typeof item.selected_color === "string" ? item.selected_color : item.selected_color?.color || ""
      }))),
      total_amount: totalAmount.toFixed(2),
      shipping_address: JSON.stringify(address),
      payment_method: paymentMethod,
      applied_coupon: appliedCoupon?.code || null,
      coupon_discount: couponDiscount.toFixed(2),
    };

    try {
      const res = await fetch("https://nainikaessentialsdatabas.onrender.com/orders/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Order failed");

      alert("Order placed successfully 🎉");
      setCart([]);
      setAppliedCoupon(null);
      setCouponCode("");
      setCouponDiscount(0);
    } catch {
      alert("Order failed");
    }
  };

  // Sizes for mobile
  const size = isMobile ? {
    padding: "8px",
    inputPadding: "8px",
    fontSmall: "12px",
    fontMedium: "14px",
    fontLarge: "16px",
    gap: "8px",
    borderRadius: "6px",
    imageSize: "40px",
    buttonPadding: "10px",
    cardPadding: "15px"
  } : {
    padding: "25px",
    inputPadding: "12px",
    fontSmall: "14px",
    fontMedium: "16px",
    fontLarge: "18px",
    gap: "12px",
    borderRadius: "12px",
    imageSize: "50px",
    buttonPadding: "14px",
    cardPadding: "25px"
  };

  return (
    <div style={{ padding: size.padding, background: "#f9fafb", minHeight: "100vh", fontFamily: "Segoe UI, sans-serif" }}>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.7fr 1fr", gap: size.gap, maxWidth: "1200px", margin: "auto" }}>
        {/* Address + Payment */}
        <div>
          <div style={{ background: "#fff", padding: size.cardPadding, borderRadius: size.borderRadius, border: "1px solid #eee", marginBottom: size.gap }}>
            <h2 style={{ fontSize: size.fontLarge }}>Delivery Address</h2>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: size.gap }}>
              {["Full Name","Street Address","City","State","Phone Number","Pincode"].map((label, i) => (
                <input
                  key={i}
                  placeholder={label}
                  value={Object.values(address)[i]}
                  onChange={e => setAddress({...address, [Object.keys(address)[i]]: e.target.value})}
                  style={{ padding: size.inputPadding, borderRadius: size.borderRadius, border: "1px solid #ddd", fontSize: size.fontSmall }}
                />
              ))}
            </div>
          </div>

          <div style={{ background: "#fff", padding: size.cardPadding, borderRadius: size.borderRadius, border: "1px solid #eee", marginBottom: size.gap }}>
            <h2 style={{ fontSize: size.fontLarge }}>Payment Method</h2>
            {["cod","online"].map(method => (
              <label key={method} style={{
                display: "flex",
                gap: size.gap,
                padding: size.padding,
                borderRadius: size.borderRadius,
                border: paymentMethod===method ? `2px solid #4f46e5` : "1px solid #ddd",
                background: paymentMethod===method ? "#f5f7ff" : "#fff",
                cursor: "pointer",
                fontSize: size.fontSmall,
                marginBottom: size.gap
              }}>
                <input type="radio" checked={paymentMethod===method} onChange={()=>setPaymentMethod(method)} />
                {method==="cod" ? "Cash on Delivery" : "Online Payment"}
              </label>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div style={{ position: isMobile ? "static" : "sticky", top: isMobile ? "auto" : "20px" }}>
          <div style={{ background: "#fff", padding: size.cardPadding, borderRadius: size.borderRadius, border: "1px solid #eee" }}>
            <h3 style={{ fontSize: size.fontMedium }}>Order Summary</h3>

            <div style={{ display: "flex", gap: size.gap, marginBottom: size.gap, flexWrap: "wrap" }}>
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                style={{ padding: size.inputPadding, flex: 1, minWidth: "120px", borderRadius: size.borderRadius, border: "1px solid #ccc", fontSize: size.fontSmall }}
              />
              <button onClick={applyCoupon} style={{ padding: size.buttonPadding, borderRadius: size.borderRadius, background: "#4f46e5", color: "#fff", border: "none", fontSize: size.fontSmall }}>
                Apply
              </button>
            </div>

            {cart.map(item => {
              const image = item.product_images?.[0] || "/placeholder.png";
              const color = typeof item.selected_color==="string" ? item.selected_color : item.selected_color?.color || "";
              return (
                <div key={item.product_id+color+item.selected_size} style={{ display:"flex", flexDirection: isMobile?"column":"row", alignItems: isMobile?"flex-start":"center", gap: size.gap, marginBottom: size.gap }}>
                  <img src={image} alt={item.product_name} style={{ width: size.imageSize, height: size.imageSize, borderRadius: size.borderRadius, objectFit:"cover", marginBottom: isMobile?"8px":"0" }} />
                  <div style={{ flex: 1, fontSize: size.fontSmall }}>
                    <div>{item.product_name}</div>
                    <small>Qty: {item.quantity}</small>
                    <small>Size: {item.selected_size}</small>
                    <small>Color: {color}</small>
                  </div>
                  <b style={{ fontSize: size.fontMedium }}>₹{(item.price_at_addition||0)*(item.quantity||0)}</b>
                </div>
              )
            })}

            <div style={{ display:"flex", justifyContent:"space-between", margin:"6px 0", fontSize: size.fontSmall }}><span>MRP Total</span><span>₹{mrpTotal}</span></div>
            <div style={{ display:"flex", justifyContent:"space-between", margin:"6px 0", color:"#10b981", fontSize: size.fontSmall }}><span>Discount</span><span>-₹{discount}</span></div>
            {couponDiscount>0 && (
              <div style={{ display:"flex", justifyContent:"space-between", margin:"6px 0", color:"#10b981", fontSize: size.fontSmall }}>
                <span>Coupon Discount ({appliedCoupon.code})</span>
                <span>-₹{couponDiscount.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display:"flex", justifyContent:"space-between", margin:"6px 0", fontSize: size.fontSmall }}><span>Delivery</span><span>₹{delivery}</span></div>
            <div style={{ display:"flex", justifyContent:"space-between", fontWeight:"700", fontSize: size.fontMedium, margin:"12px 0" }}><span>Total Amount</span><span>₹{totalAmount.toFixed(2)}</span></div>

            <button style={{ width:"100%", padding: size.buttonPadding, background:"#4f46e5", color:"#fff", border:"none", borderRadius:size.borderRadius, fontSize:size.fontSmall, cursor:"pointer" }} onClick={placeOrder}>Place Order</button>
            <div style={{ textAlign:"center", marginTop:"8px", fontSize:size.fontSmall, color:"#999" }}><ShieldCheck size={16} /> Secure checkout</div>
          </div>
        </div>
      </div>
    </div>
  );
}
