import React, { useState, useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf"; // <-- added for invoice

const BASE_URL = "https://nainikaessentialsdatabas.onrender.com";
const GST_RATE = 0.18;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [address, setAddress] = useState({ name: "", street: "", city: "", state: "", phone: "", pincode: "" });
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [allCoupons, setAllCoupons] = useState([]);
  const [codCharge, setCodCharge] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(null);

  // --- Guest / User ID ---
  const user = JSON.parse(localStorage.getItem("adminUser"));
  let userId = user?.user_id || localStorage.getItem("guestId");
  if (!userId) {
    userId = "GUEST_" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("guestId", userId);
  }

  // --- Fetch cart ---
  useEffect(() => {
    fetch(`${BASE_URL}/carts/${userId}`)
      .then(res => res.json())
      .then(data => { setCart(data.items || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [userId]);

  // --- Fetch coupons ---
  useEffect(() => {
    fetch(`${BASE_URL}/coupons/`)
      .then(res => res.json())
      .then(data => setAllCoupons(data))
      .catch(console.error);
  }, []);

  // --- Fetch COD charge ---
  useEffect(() => {
    fetch(`${BASE_URL}/cod/all`)
      .then(res => res.json())
      .then(data => { if (data.length) setCodCharge(Number(data[0].cod_charge)); })
      .catch(console.error);
  }, []);

  // --- Handle resize ---
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <div style={{ padding: 30, textAlign: "center" }}>Loading cart...</div>;

  // --- Calculations ---
  const subtotal = cart.reduce((acc, item) => acc + (item.price_at_addition || 0) * (item.quantity || 0), 0);
  let couponDiscount = 0;

  if (appliedCoupon) {
    cart.forEach(item => {
      const itemId = Number(item.product_id);
      const itemCategory = item.category?.toLowerCase().trim();
      const isProductApplicable = appliedCoupon.applicable_products.map(Number).includes(itemId);
      const isCategoryApplicable = appliedCoupon.applicable_categories.map(c => c.toLowerCase().trim()).includes(itemCategory);
      if (isProductApplicable || isCategoryApplicable) {
        couponDiscount += appliedCoupon.discount_type === "percentage"
          ? (item.price_at_addition || 0) * item.quantity * (parseFloat(appliedCoupon.discount_value) / 100)
          : parseFloat(appliedCoupon.discount_value) * item.quantity;
      }
    });
  }

  const taxableAmount = subtotal - couponDiscount;
  const cgst = taxableAmount * (GST_RATE / 2);
  const sgst = taxableAmount * (GST_RATE / 2);
  const delivery = paymentMethod === "cod" ? codCharge : 0;
  const totalAmount = Math.max(0, taxableAmount + cgst + sgst + delivery);

  // --- Apply coupon ---
  const applyCoupon = () => {
    if (!couponCode.trim()) return alert("Enter a coupon code");
    const coupon = allCoupons.find(c => c.code.toUpperCase() === couponCode.trim().toUpperCase());
    if (!coupon) return alert("Invalid coupon code");

    let discountAmount = 0;
    cart.forEach(item => {
      const itemId = Number(item.product_id);
      const itemCategory = item.category?.toLowerCase().trim();
      const isProductApplicable = coupon.applicable_products.map(Number).includes(itemId);
      const isCategoryApplicable = coupon.applicable_categories.map(c => c.toLowerCase().trim()).includes(itemCategory);
      if (isProductApplicable || isCategoryApplicable) {
        discountAmount += coupon.discount_type === "percentage"
          ? (item.price_at_addition || 0) * item.quantity * (parseFloat(coupon.discount_value)/100)
          : parseFloat(coupon.discount_value) * item.quantity;
      }
    });

    if (discountAmount === 0) return alert("Coupon does not apply to any product in cart");
    setAppliedCoupon(coupon);
    alert(`Coupon applied! You saved ₹${discountAmount.toFixed(2)}`);
  };

  // --- Generate Invoice ---
const generateInvoice = (preview = false) => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Invoice", 105, 20, { align: "center" });

  let itemsToUse;
  let orderId, addr, total;

  if (preview) {
    // Use current cart for preview
    if (!cart.length) return alert("Cart is empty for preview!");
    itemsToUse = cart.map(item => ({
      product_name: item.product_name,
      quantity: item.quantity,
      size: item.selected_size,
      color: typeof item.selected_color === "string" ? item.selected_color : item.selected_color?.color || "",
      price: item.price_at_addition
    }));
    orderId = "PREVIEW_" + new Date().getTime();
    addr = address;
    total = totalAmount;
    doc.setFontSize(12);
    doc.text(`Order ID: ${orderId}`, 20, 40);
    doc.text(`Name: ${addr.name}`, 20, 50);
    doc.text(`Phone: ${addr.phone}`, 20, 60);
    doc.text(`Address: ${addr.street}, ${addr.city}, ${addr.state} - ${addr.pincode}`, 20, 70);
    doc.text(`Payment Method: ${paymentMethod.toUpperCase()}`, 20, 80);
    doc.text(`Total Amount: ₹${total.toFixed(2)}`, 20, 90);
  } else {
    // Use placed order for download
    if (!orderPlaced) return alert("No order to generate invoice");
    itemsToUse = typeof orderPlaced.items === "string" ? JSON.parse(orderPlaced.items) : orderPlaced.items;
    orderId = orderPlaced.order_id;
    addr = JSON.parse(orderPlaced.shipping_address);
    total = orderPlaced.total_amount;
    doc.setFontSize(12);
    doc.text(`Order ID: ${orderId}`, 20, 40);
    doc.text(`Name: ${addr.name}`, 20, 50);
    doc.text(`Phone: ${addr.phone}`, 20, 60);
    doc.text(`Address: ${addr.street}, ${addr.city}, ${addr.state} - ${addr.pincode}`, 20, 70);
    doc.text(`Payment Method: ${orderPlaced.payment_method.toUpperCase()}`, 20, 80);
    doc.text(`Total Amount: ₹${total}`, 20, 90);
  }

  // --- Items ---
  doc.text("Items:", 20, 105);
  let y = 115;
  itemsToUse.forEach((item, index) => {
    doc.text(
      `${index + 1}. ${item.product_name} | Qty: ${item.quantity} | Size: ${item.size} | Color: ${item.color} | ₹${item.price * item.quantity}`,
      20,
      y
    );
    y += 10;
    if (y > 280) {
      doc.addPage();
      y = 20;
    }
  });

  if (preview) {
    window.open(doc.output("bloburl"));
  } else {
    doc.save(`Invoice_${orderId}.pdf`);
  }
};


  // --- Place order ---
  const placeOrder = async () => {
    if (!address.name || !address.phone || !address.pincode) {
      alert("Please fill delivery address");
      return;
    }
    if (!cart.length) return alert("Cart is empty!");

    const payload = {
      user_id: userId,
      items: JSON.stringify(cart.map(item => ({
        product_id: item.product_id,
        product_name: item.product_name,
        product_image: item.product_images?.[0] || "",
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
      cgst: cgst.toFixed(2),
      sgst: sgst.toFixed(2),
      cod_extra: delivery.toFixed(2)
    };

    try {
      const res = await fetch(`${BASE_URL}/orders/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Order failed");
      const orderData = await res.json();

      setCart([]);
      setAppliedCoupon(null);
      setCouponCode("");
      setOrderPlaced(orderData);

      // setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      console.error(err);
      alert("Order failed");
    }
  };

  // --- THANK YOU PAGE ---
  if (orderPlaced) {
    const addr = JSON.parse(orderPlaced.shipping_address);
    return (
      <div className="thankyou-container" style={{ display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", minHeight:"100vh", background:"#f9fafb", padding:20 }}>
        <div style={{ background:"#fff", padding:40, borderRadius:16, textAlign:"center", boxShadow:"0 8px 20px rgba(0,0,0,0.1)" }}>
          <div style={{ fontSize:60, color:"#10b981" }}>✅</div>
          <h1 style={{ fontSize:28, margin:"16px 0" }}>Thank You!</h1>
          <p style={{ fontSize:16, color:"#374151", lineHeight:"1.5em" }}>
            Your order #{orderPlaced.order_id} has been placed successfully.<br/>
            Total: ₹{orderPlaced.total_amount}<br/>
            Payment Method: {orderPlaced.payment_method.toUpperCase()}
          </p>
          <h3 style={{ marginTop:20 }}>Shipping Address</h3>
          <p style={{ fontSize:14, color:"#4b5563" }}>
            {addr.name} <br/>
            {addr.street}, {addr.city}, {addr.state} <br/>
            Pincode: {addr.pincode} <br/>
            Phone: {addr.phone}
          </p>
          <button onClick={()=>generateInvoice()} style={{ marginTop:10, padding:"12px 24px", background:"#10b981", color:"#fff", border:"none", borderRadius:8, fontSize:16, cursor:"pointer" }}>
            Download Invoice
          </button>
          <button onClick={()=>navigate("/")} style={{ marginTop:10, padding:"12px 24px", background:"#4f46e5", color:"#fff", border:"none", borderRadius:8, fontSize:16, cursor:"pointer" }}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // --- Size config ---
  const size = isMobile 
    ? { padding: 10, inputPadding: 8, fontSmall: 12, fontMedium: 14, fontLarge: 16, gap: 8, borderRadius: 6, imageSize: 50, buttonPadding: 10, cardPadding: 15 }
    : { padding: 25, inputPadding: 12, fontSmall: 14, fontMedium: 16, fontLarge: 18, gap: 12, borderRadius: 12, imageSize: 60, buttonPadding: 14, cardPadding: 25 };

  return (
    <div style={{ padding:size.padding, background:"#f9fafb", minHeight:"100vh", fontFamily:"Segoe UI, sans-serif" }}>
      <div style={{ display:"grid", gridTemplateColumns: isMobile?"1fr":"1.7fr 1fr", gap:size.gap, maxWidth:1200, margin:"auto" }}>
        {/* Address + Payment */}
        <div>
          <div style={{ background:"#fff", padding:size.cardPadding, borderRadius:size.borderRadius, border:"1px solid #eee", marginBottom:size.gap }}>
            <h2 style={{ fontSize:size.fontLarge }}>Delivery Address</h2>
            <div style={{ display:"grid", gridTemplateColumns: isMobile?"1fr":"1fr 1fr", gap:size.gap }}>
              {["Full Name","Street Address","City","State","Phone Number","Pincode"].map((label,i) => (
                <input key={i} placeholder={label} value={Object.values(address)[i]}
                  onChange={e=>{
                    let val = e.target.value;
                    if(Object.keys(address)[i]==="phone") val=val.replace(/\D/g,"").slice(0,10);
                    setAddress({...address, [Object.keys(address)[i]]:val})
                  }}
                  style={{ padding:size.inputPadding, borderRadius:size.borderRadius, border:"1px solid #ddd", fontSize:size.fontSmall, width:"100%" }}
                />
              ))}
            </div>
          </div>

          <div style={{ background:"#fff", padding:size.cardPadding, borderRadius:size.borderRadius, border:"1px solid #eee", marginBottom:size.gap }}>
  <h2 style={{ fontSize:size.fontLarge }}>Payment Method</h2>
  {["online","cod"].map(method => (
    <div key={method} style={{ marginBottom:size.gap }}>
      <label style={{
        display:"flex", alignItems:"center", gap:size.gap, padding:size.padding,
        borderRadius:size.borderRadius, border: paymentMethod===method ? "2px solid #4f46e5" : "1px solid #ddd",
        background: paymentMethod===method ? "#f5f7ff" : "#fff", cursor:"pointer", fontSize:size.fontSmall,
      }}>
        <input type="radio" checked={paymentMethod===method} onChange={()=>setPaymentMethod(method)} />
        {method==="cod" ? "Cash on Delivery" : "Online Payment"}
      </label>

      {/* COD message BELOW radio button */}
      {method==="cod" && paymentMethod==="cod" && codCharge>0 &&
        <div style={{ color:"red", marginTop:4, marginLeft:4, fontSize:size.fontSmall }}>
          COD Extra Charge: ₹{codCharge}
        </div>
      }
    </div>
  ))}
</div>

        </div>

        {/* Order Summary */}
        <div style={{ position: isMobile?"static":"sticky", top:isMobile?"auto":20 }}>
          <div style={{ background:"#fff", padding:size.cardPadding, borderRadius:size.borderRadius, border:"1px solid #eee" }}>
            <h3 style={{ fontSize:size.fontMedium }}>Order Summary</h3>

            <div style={{ display:"flex", gap:size.gap, marginBottom:size.gap, flexWrap:"wrap" }}>
              <input type="text" placeholder="Enter coupon code" value={couponCode} onChange={e=>setCouponCode(e.target.value)}
                style={{ padding:size.inputPadding, flex:1, minWidth:"120px", borderRadius:size.borderRadius, border:"1px solid #ccc", fontSize:size.fontSmall }}
              />
              <button onClick={applyCoupon} style={{ padding:size.buttonPadding, borderRadius:size.borderRadius, background:"#4f46e5", color:"#fff", border:"none", fontSize:size.fontSmall }}>Apply</button>
            </div>

            {allCoupons.length>0 && (
              <div style={{ marginBottom:size.gap, fontSize:size.fontSmall }}>
                <strong>Available Coupons:</strong>
                <ul>{allCoupons.map(c=><li key={c.code}>Code: {c.code} | Discount: {c.discount_type==="percentage"?c.discount_value+"%":"₹"+c.discount_value}</li>)}</ul>
              </div>
            )}

            {cart.map(item=>{
              const image=item.product_images?.[0]||"/placeholder.png";
              const color=typeof item.selected_color==="string"?item.selected_color:item.selected_color?.color||"";
              return (
                <div key={item.product_id+color+item.selected_size} style={{ display:"flex", flexDirection:isMobile?"column":"row", alignItems:isMobile?"flex-start":"center", gap:size.gap, marginBottom:size.gap }}>
                  <img src={image} alt={item.product_name} style={{ width:size.imageSize, height:size.imageSize, borderRadius:size.borderRadius, objectFit:"cover", marginBottom:isMobile?"6px":"0" }} />
                  <div style={{ flex:1, fontSize:size.fontSmall }}>
                    <div style={{ whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{item.product_name}</div>
                    <small>Qty: {item.quantity}</small>
                    <small>Size: {item.selected_size}</small>
                    <small>Color: {color}</small>
                  </div>
                  <b style={{ fontSize:size.fontMedium }}>₹{(item.price_at_addition||0)*(item.quantity||0)}</b>
                </div>
              )
            })}

            <div style={{ display:"flex", justifyContent:"space-between", fontSize:size.fontSmall, margin:"6px 0" }}><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
            {appliedCoupon && couponDiscount>0 && <div style={{ display:"flex", justifyContent:"space-between", fontSize:size.fontSmall, color:"#10b981", margin:"6px 0" }}><span>Coupon ({appliedCoupon.code})</span><span>-₹{couponDiscount.toFixed(2)}</span></div>}
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:size.fontSmall, margin:"6px 0" }}><span>CGST (9%)</span><span>₹{cgst.toFixed(2)}</span></div>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:size.fontSmall, margin:"6px 0" }}><span>SGST (9%)</span><span>₹{sgst.toFixed(2)}</span></div>
            {paymentMethod==="cod" && codCharge>0 && <div style={{ display:"flex", justifyContent:"space-between", fontSize:size.fontSmall, margin:"6px 0", color:"red" }}><span>COD Extra Charges</span><span>₹{delivery.toFixed(2)}</span></div>}

            <div style={{ display:"flex", justifyContent:"space-between", fontWeight:"700", fontSize:size.fontMedium, margin:"12px 0" }}><span>Total Amount</span><span>₹{totalAmount.toFixed(2)}</span></div>

            {/* --- Preview / Download Invoice Button --- */}
            <button onClick={()=>generateInvoice(true)} style={{ width:"100%", padding:size.buttonPadding, background:"#10b981", color:"#fff", border:"none", borderRadius:size.borderRadius, fontSize:size.fontSmall, cursor:"pointer", marginBottom:6 }}>
              Preview / Download Invoice
            </button>

            <button onClick={placeOrder} style={{ width:"100%", padding:size.buttonPadding, background:"#4f46e5", color:"#fff", border:"none", borderRadius:size.borderRadius, fontSize:size.fontSmall, cursor:"pointer" }}>
              Place Order
            </button>
            <div style={{ textAlign:"center", marginTop:"8px", fontSize:size.fontSmall, color:"#999" }}><ShieldCheck size={16}/> Secure checkout</div>
          </div>
        </div>
      </div>
    </div>
  );
}
