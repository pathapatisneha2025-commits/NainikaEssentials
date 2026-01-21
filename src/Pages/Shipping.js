import React from "react";

export default function ShippingInformation() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "20px" }}>
        Shipping Information – Customer Support
      </h1>

      <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.8", marginBottom: "20px" }}>
        At <strong>Nainika Essentials</strong>, we aim to deliver your orders safely and on time. This Shipping Information policy explains our order processing, delivery timelines, charges, and important conditions related to shipping.
      </p>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "10px" }}>1. Order Processing Time</h2>
      <ul style={{ fontSize: "14px", color: "#555", marginBottom: "20px", paddingLeft: "20px" }}>
        <li>Orders are processed within [X–Y] business days after payment confirmation.</li>
        <li>Orders placed on weekends or public holidays will be processed on the next business day.</li>
        <li>Once processed, the order will be handed over to our shipping partner for delivery.</li>
      </ul>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "10px" }}>2. Shipping Coverage</h2>
      <ul style={{ fontSize: "14px", color: "#555", marginBottom: "20px", paddingLeft: "20px" }}>
        <li>We currently ship to [locations / regions / country].</li>
        <li>Delivery availability may vary depending on your pin code or serviceable area.</li>
        <li>In rare cases, orders may be canceled if the location is not serviceable.</li>
      </ul>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "10px" }}>3. Estimated Delivery Time</h2>
      <ul style={{ fontSize: "14px", color: "#555", marginBottom: "20px", paddingLeft: "20px" }}>
        <li>Standard delivery: [X–Y] business days</li>
        <li>Delivery timelines may vary due to location, courier partner delays, weather conditions, strikes, or unforeseen circumstances.</li>
        <li>Delivery timelines are estimates and not guaranteed.</li>
      </ul>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "10px" }}>4. Shipping Charges</h2>
      <ul style={{ fontSize: "14px", color: "#555", marginBottom: "20px", paddingLeft: "20px" }}>
        <li>Shipping charges (if applicable) are displayed at checkout before payment.</li>
        <li>Free shipping may be available on orders above [minimum order value].</li>
        <li>Additional charges may apply for remote or special delivery locations.</li>
      </ul>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "10px" }}>5. Order Tracking</h2>
      <ul style={{ fontSize: "14px", color: "#555", marginBottom: "20px", paddingLeft: "20px" }}>
        <li>Once shipped, a tracking link or tracking ID will be shared via email/SMS/WhatsApp.</li>
        <li>Customers can track their order status using the provided tracking details.</li>
        <li>Tracking updates depend on the courier partner’s system.</li>
      </ul>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "10px" }}>6. Delayed or Failed Deliveries</h2>
      <ul style={{ fontSize: "14px", color: "#555", marginBottom: "20px", paddingLeft: "20px" }}>
        <li>Delivery delays may occur due to incorrect/incomplete address, customer unavailability, or courier issues beyond our control.</li>
        <li>If a delivery attempt fails, the courier may retry or return the shipment to us.</li>
      </ul>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "10px" }}>7. Incorrect Address or Non-Delivery</h2>
      <ul style={{ fontSize: "14px", color: "#555", marginBottom: "20px", paddingLeft: "20px" }}>
        <li>Customers are responsible for providing accurate shipping details.</li>
        <li>Orders returned due to incorrect address or repeated delivery failures may be re-shipped with additional charges or canceled with applicable deductions.</li>
      </ul>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "10px" }}>8. Damaged or Missing Packages</h2>
      <ul style={{ fontSize: "14px", color: "#555", marginBottom: "20px", paddingLeft: "20px" }}>
        <li>If you receive a package that is damaged, opened, or missing items, please contact Customer Support within [X] hours/days of delivery and share images/videos for verification.</li>
      </ul>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "10px" }}>9. Partial Shipments</h2>
      <ul style={{ fontSize: "14px", color: "#555", marginBottom: "20px", paddingLeft: "20px" }}>
        <li>In some cases, orders may be shipped in multiple packages.</li>
        <li>Customers will be informed if an order is split into partial shipments.</li>
      </ul>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "10px" }}>10. International Shipping (If Applicable)</h2>
      <ul style={{ fontSize: "14px", color: "#555", marginBottom: "20px", paddingLeft: "20px" }}>
        <li>International orders may be subject to customs duties, taxes, or import fees, which are the responsibility of the customer.</li>
        <li>Delivery timelines may vary due to customs clearance.</li>
      </ul>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "10px" }}>11. Customer Support Assistance</h2>
      <ul style={{ fontSize: "14px", color: "#555", marginBottom: "20px", paddingLeft: "20px" }}>
        <li>Our Customer Support team is available to assist with shipping status inquiries, delivery delays, and address corrections (before shipment only).</li>
        <li>Delivery timelines depend on third-party courier services.</li>
      </ul>
    </div>
  );
}
