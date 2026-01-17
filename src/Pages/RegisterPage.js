import React from 'react';

const RegisterPage = () => {
  // SVG Icon Components for form inputs
  const Icons = {
    User: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    ),
    Mail: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
    ),
    Phone: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    ),
    Lock: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    ),
    Eye: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
    )
  };

  return (
    <>
      <style>{`
        :root {
          --brand-blue: #3b59ff;
          --brand-gradient: linear-gradient(135deg, #3b59ff 0%, #2563eb 100%);
          --text-dark: #1f2937;
          --text-gray: #6b7280;
          --bg-light: #f9fafb;
          --white: #ffffff;
        }

        .register-container {
          display: flex;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
        }

        /* LEFT SIDE - BRAND PANEL */
        .brand-panel {
          flex: 1;
          background: var(--brand-gradient);
          color: var(--white);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px;
          position: relative;
        }

        .brand-panel h1 {
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .brand-panel p {
          font-size: 18px;
          opacity: 0.9;
          margin-bottom: 40px;
          max-width: 400px;
          line-height: 1.6;
        }

        .features-list {
          list-style: none;
          padding: 0;
        }

        .features-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          font-size: 16px;
          font-weight: 500;
        }

        .dot {
          width: 8px;
          height: 8px;
          background: var(--white);
          border-radius: 50%;
        }

        .footer-note {
          position: absolute;
          bottom: 40px;
          left: 60px;
          font-size: 14px;
          opacity: 0.7;
        }

        /* RIGHT SIDE - FORM PANEL */
        .form-panel {
          flex: 1;
          background: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }

        .form-content {
          width: 100%;
          max-width: 450px;
        }

        .form-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .form-header h2 {
          font-size: 28px;
          font-weight: 800;
          color: var(--text-dark);
          margin-bottom: 8px;
        }

        .form-header p {
          color: var(--text-gray);
          font-size: 15px;
        }

        .input-wrapper {
          margin-bottom: 20px;
        }

        .input-wrapper label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: var(--text-dark);
          margin-bottom: 8px;
        }

        .field-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .field-container input {
          width: 100%;
          padding: 14px 45px 14px 16px;
          background: var(--bg-light);
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          font-size: 15px;
          transition: all 0.3s ease;
          outline: none;
        }

        .field-container input:focus {
          border-color: var(--brand-blue);
          background: var(--white);
          box-shadow: 0 0 0 4px rgba(59, 89, 255, 0.1);
        }

        .field-icon {
          position: absolute;
          right: 16px;
          color: #9ca3af;
        }

        .submit-btn {
          width: 100%;
          background: var(--brand-blue);
          color: var(--white);
          padding: 16px;
          border-radius: 12px;
          border: none;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 10px;
          transition: all 0.3s ease;
        }

        .submit-btn:hover {
          background: #2b44d4;
          transform: translateY(-1px);
          box-shadow: 0 10px 15px -3px rgba(59, 89, 255, 0.3);
        }

        .login-link {
          text-align: center;
          margin-top: 25px;
          font-size: 14px;
          color: var(--text-gray);
        }

        .login-link a {
          color: var(--brand-blue);
          text-decoration: none;
          font-weight: 700;
        }

        /* RESPONSIVE */
        @media (max-width: 992px) {
          .register-container { flex-direction: column; }
          .brand-panel { padding: 60px 30px; min-height: 400px; }
          .footer-note { display: none; }
          .form-panel { padding: 60px 20px; }
        }

        @media (max-width: 480px) {
          .brand-panel h1 { font-size: 32px; }
          .brand-panel p { font-size: 16px; }
        }
      `}</style>

      <div className="register-container">
        {/* Left Side: Brand Story */}
        <section className="brand-panel">
          <h1>Create your account 🚀</h1>
          <p>Join us to place orders faster, track deliveries, and download invoices anytime from your dashboard.</p>
          
          <ul className="features-list">
            <li><div className="dot"></div> Quick & secure registration</li>
            <li><div className="dot"></div> Order tracking & history</li>
            <li><div className="dot"></div> Easy invoice downloads</li>
          </ul>

          <div className="footer-note">
            © 2026 Elan Cotts. All rights reserved.
          </div>
        </section>

        {/* Right Side: Form */}
        <section className="form-panel">
          <div className="form-content">
            <div className="form-header">
              <h2>Create an account</h2>
              <p>Fill in the details to get started</p>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="input-wrapper">
                <label>Full Name</label>
                <div className="field-container">
                  <input type="text" placeholder="Your name" required />
                  <span className="field-icon"><Icons.User /></span>
                </div>
              </div>

              <div className="input-wrapper">
                <label>Email address</label>
                <div className="field-container">
                  <input type="email" placeholder="you@example.com" required />
                  <span className="field-icon"><Icons.Mail /></span>
                </div>
              </div>

              <div className="input-wrapper">
                <label>Phone Number</label>
                <div className="field-container">
                  <input type="tel" placeholder="10-digit mobile number" required />
                  <span className="field-icon"><Icons.Phone /></span>
                </div>
              </div>

              <div className="input-wrapper">
                <label>Password</label>
                <div className="field-container">
                  <input type="password" placeholder="••••••••" required />
                  <span className="field-icon"><Icons.Eye /></span>
                </div>
              </div>

              <button type="submit" className="submit-btn">
                Create Account
              </button>

              <div className="login-link">
                Already have an account? <a href="/login">Log in</a>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default RegisterPage;