import React, { useState, useEffect } from "react";

const ContactPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  // SVG Icons
  const Icons = {
    Phone: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    Mail: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>,
    MapPin: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
    Support: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 18 0"/><path d="M12 21a9 9 0 0 1-9-9"/><circle cx="12" cy="12" r="3"/></svg>,
    WhatsApp: () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.52 3.48A11.91 11.91 0 0 0 12.04 0C5.42 0 .12 5.3.12 11.82c0 2.08.54 4.12 1.56 5.92L0 24l6.45-1.68a11.86 11.86 0 0 0 5.6 1.43h.01c6.62 0 11.92-5.3 11.92-11.82a11.9 11.9 0 0 0-3.46-8.45Zm-8.48 18.1a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.83 1 1.02-3.72-.23-.38a9.86 9.86 0 1 1 18.45-5.02c0 5.45-4.45 9.71-10 9.71Zm5.5-7.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.77-1.65-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.57-.48-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.1 4.49.71.3 1.27.48 1.7.61.71.22 1.36.19 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/>
  </svg>
),

Instagram: () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="3.5" />
    <circle cx="17.5" cy="6.5" r="1" />
  </svg>
),

Facebook: () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.325v21.351C0 23.4.6 24 1.325 24h11.495v-9.294H9.691V11.01h3.129V8.309c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.505 0-1.797.716-1.797 1.767v2.317h3.59l-.467 3.696h-3.123V24h6.127C23.4 24 24 23.4 24 22.676V1.325C24 .6 23.4 0 22.675 0z"/>
  </svg>
),

  };

  // Submit form using fetch
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://nainikaessentialsdatabas.onrender.com/contact/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: fullName, email, message }),
      });
      if (!res.ok) throw new Error("Failed to send message");
      alert("Message sent!");
      setFullName(""); setEmail(""); setMessage("");
      fetchMessages();
    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    }
  };

  // Fetch messages using fetch
  const fetchMessages = async () => {
    try {
      setLoadingMessages(true);
      const res = await fetch("https://nainikaessentialsdatabas.onrender.com/contact/messages");
      if (!res.ok) throw new Error("Failed to fetch messages");
      const data = await res.json();
      setMessages(data);
      setLoadingMessages(false);
    } catch (err) {
      console.error(err);
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Update status using fetch
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/messages/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <style>{`
        :root {
          --primary-purple: #5a4fcf;
          --bg-light: #f8f9ff;
          --text-dark: #111827;
          --text-gray: #6b7280;
          --input-border: #e5e7eb;
          --white: #ffffff;
        }

        .contact-wrapper { font-family: 'Inter', sans-serif; color: var(--text-dark); background: #fff; padding: 60px 20px; }
        .container { max-width: 1100px; margin: 0 auto; }

        /* HEADER */
        .contact-header { text-align: center; margin-bottom: 60px; }
        .contact-header h1 { font-size: 42px; font-weight: 800; margin-bottom: 15px; letter-spacing: -1px; }
        .contact-header p { color: var(--text-gray); font-size: 18px; max-width: 600px; margin: 0 auto; }

        /* MAIN GRID */
        .contact-grid { 
          display: grid; 
          grid-template-columns: 1fr 1.5fr; 
          gap: 40px; 
          align-items: start; 
        }

        /* INFO COLUMN */
        .info-card { padding: 40px; border-radius: 30px; background: white; border: 1px solid #f0f0f0; }
        .info-card h2 { font-size: 24px; font-weight: 800; margin-bottom: 30px; }
        
        .contact-method { display: flex; align-items: center; gap: 20px; margin-bottom: 30px; }
        .icon-box { 
          background: var(--bg-light); 
          color: var(--primary-purple); 
          width: 50px; 
          height: 50px; 
          border-radius: 14px; 
          display: flex; 
          justify-content: center; 
          align-items: center;
        }
        .method-text h4 { margin: 0; font-size: 14px; color: var(--text-gray); text-transform: uppercase; letter-spacing: 1px; }
        .method-text p { margin: 4px 0 0; font-size: 16px; font-weight: 600; }

        .trust-badges { margin-top: 40px; border-top: 1px solid #f3f4f6; pt: 30px; }
        .badge-item { display: flex; align-items: center; gap: 10px; color: var(--text-gray); font-size: 13px; margin-bottom: 12px; }

        /* FORM COLUMN */
        .form-card { 
          padding: 45px; 
          border-radius: 30px; 
          background: #ffffff; 
          box-shadow: 0 20px 40px rgba(0,0,0,0.03); 
          border: 1px solid #f0f0f0; 
        }
        .form-card h2 { font-size: 24px; font-weight: 800; margin-bottom: 30px; }

        .input-group { margin-bottom: 20px; }
        .input-group label { display: block; font-size: 14px; font-weight: 600; margin-bottom: 8px; color: var(--text-dark); }
        .input-group input, .input-group textarea {
          width: 100%;
          padding: 14px 18px;
          border: 1px solid var(--input-border);
          border-radius: 12px;
          font-size: 15px;
          outline: none;
          transition: border-color 0.3s;
          box-sizing: border-box;
        }
        .input-group input:focus, .input-group textarea:focus { border-color: var(--primary-purple); }

        .send-btn {
          width: 100%;
          background: var(--primary-purple);
          color: white;
          padding: 16px;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          transition: transform 0.2s, background 0.2s;
        }
        .send-btn:hover { background: #4a3ebf; transform: translateY(-2px); }

        /* MOBILE RESPONSIVE */
        @media (max-width: 992px) {
          .contact-grid { grid-template-columns: 1fr; }
          .contact-header h1 { font-size: 32px; }
          .form-card, .info-card { padding: 30px 20px; }
        }

        @media (max-width: 480px) {
          .contact-wrapper { padding: 40px 15px; }
          .contact-method { gap: 15px; }
          .icon-box { width: 40px; height: 40px; }
        }
      `}</style>

     
      <div className="contact-wrapper">
        <div className="container">
          <header className="contact-header">
            <h1>Contact Us</h1>
            <p>Have questions? We're here to help. Reach out and our team will get back to you shortly.</p>
          </header>

          <div className="contact-grid">
            {/* Info Section */}
            <div className="info-card">
              <h2>ElAN COTTS</h2>
<div className="contact-method">
  <div className="icon-box"><Icons.WhatsApp /></div>
  <div className="method-text">
    <h4>WhatsApp</h4>
    <p>
      <a href="https://wa.me/918332992789" target="_blank" rel="noreferrer">
        Chat with us
      </a>
    </p>
  </div>
</div>              <div className="contact-method"><div className="icon-box"><Icons.Mail /></div><div className="method-text"><h4>Email Us</h4><p> Nainika@nainikaessentials.com</p></div></div>
<div className="contact-method">
  <div className="icon-box"><Icons.Instagram /></div>
  <div className="method-text">
    <h4>Instagram</h4>
    <p>
      <a href="https://instagram.com/elancotts" target="_blank" rel="noreferrer">
        @elancotts
      </a>
    </p>
  </div>
</div>

<div className="contact-method">
  <div className="icon-box"><Icons.Facebook /></div>
  <div className="method-text">
    <h4>Facebook</h4>
    <p>
      <a href="https://facebook.com/elancotts" target="_blank" rel="noreferrer">
        Elan Cotts
      </a>
    </p>
  </div>
</div>              <div className="trust-badges">
                <div className="badge-item"><Icons.Support /> 24/7 Customer Support</div>
                <div className="badge-item"><Icons.Support /> Secure & Reliable Communication</div>
                <div className="badge-item"><Icons.Support /> Trusted Online Store</div>
              </div>
            </div>

            {/* Form Section */}
            <div className="form-card">
              <h2>Send Us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="input-group"><label>Full Name</label><input value={fullName} onChange={e => setFullName(e.target.value)} type="text" placeholder="Your Name" required /></div>
                <div className="input-group"><label>Email Address</label><input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="email@example.com" required /></div>
                <div className="input-group"><label>Your Message</label><textarea value={message} onChange={e => setMessage(e.target.value)} rows="5" placeholder="How can we help you?" required></textarea></div>
                <button type="submit" className="send-btn"><Icons.Mail /> Send Message</button>
              </form>

              {/* Admin Messages Table */}
              {/* <h2 style={{ marginTop: "40px" }}>Submitted Messages</h2>
              {loadingMessages ? <p>Loading messages...</p> : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #ddd" }}>
                      <th>ID</th><th>Name</th><th>Email</th><th>Message</th><th>Status</th><th>Created At</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map(msg => (
                      <tr key={msg.id} style={{ borderBottom: "1px solid #eee" }}>
                        <td>{msg.id}</td>
                        <td>{msg.full_name}</td>
                        <td>{msg.email}</td>
                        <td>{msg.message}</td>
                        <td>{msg.status}</td>
                        <td>{new Date(msg.created_at).toLocaleString()}</td>
                        <td>
                          {msg.status !== "read" && <button onClick={() => updateStatus(msg.id, "read")} style={{ marginRight: "5px" }}>Mark Read</button>}
                          {msg.status !== "replied" && <button onClick={() => updateStatus(msg.id, "replied")} style={{ marginRight: "5px" }}>Mark Replied</button>}
                        </td>
                      </tr>
                    ))}
                    {messages.length === 0 && <tr><td colSpan="7" style={{ textAlign: "center" }}>No messages found</td></tr>}
                  </tbody>
                </table>
              )} */}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;