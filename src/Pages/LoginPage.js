import React from 'react';

const LoginPage = () => {
  // SVG Icon Components
  const Icons = {
    Mail: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
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
          --brand-blue: #4f46e5;
          --brand-gradient: linear-gradient(135deg, #3b59ff 0%, #2563eb 100%);
          --text-dark: #111827;
          --text-gray: #6b7280;
          --bg-light: #f9fafb;
          --white: #ffffff;
        }

        .login-container {
          display: flex;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
        }

        /* LEFT PANEL - WELCOME AREA */
        .welcome-panel {
          flex: 1;
          background: var(--brand-gradient);
          color: var(--white);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px;
          position: relative;
        }

        .welcome-panel h1 {
          font-size: 52px;
          font-weight: 800;
          margin-bottom: 24px;
          letter-spacing: -1px;
        }

        .welcome-panel p {
          font-size: 18px;
          line-height: 1.6;
          opacity: 0.9;
          max-width: 440px;
          margin-bottom: 48px;
        }

        .feature-list {
          list-style: none;
          padding: 0;
        }

        .feature-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          font-weight: 500;
          font-size: 16px;
        }

        .bullet {
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
        }

        .copyright {
          position: absolute;
          bottom: 40px;
          left: 80px;
          font-size: 14px;
          opacity: 0.7;
        }

        /* RIGHT PANEL - FORM AREA */
        .form-panel {
          flex: 1;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }

        .form-box {
          width: 100%;
          max-width: 420px;
          background: white;
          padding: 40px;
          border-radius: 32px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08);
          border: 1px solid #f3f4f6;
        }

        .form-box h2 {
          font-size: 32px;
          font-weight: 800;
          text-align: center;
          margin-bottom: 8px;
          color: var(--text-dark);
        }

        .form-box .tagline {
          text-align: center;
          color: var(--text-gray);
          font-size: 15px;
          margin-bottom: 40px;
        }

        .input-group {
          margin-bottom: 24px;
        }

        .input-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 10px;
          color: var(--text-dark);
        }

        .field-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .field-box input {
          width: 100%;
          padding: 14px 45px 14px 16px;
          background: var(--bg-light);
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          font-size: 15px;
          outline: none;
          transition: all 0.2s ease;
        }

        .field-box input:focus {
          border-color: var(--brand-blue);
          background: #fff;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
        }

        .input-icon {
          position: absolute;
          right: 16px;
          color: #9ca3af;
          display: flex;
        }

        .login-btn {
          width: 100%;
          background: var(--brand-blue);
          color: white;
          padding: 16px;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 8px;
        }

        .login-btn:hover {
          background: #4338ca;
          transform: translateY(-1px);
          box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.4);
        }

        .signup-text {
          margin-top: 30px;
          text-align: center;
          font-size: 14px;
          color: var(--text-gray);
        }

        .signup-text a {
          color: var(--brand-blue);
          text-decoration: none;
          font-weight: 700;
        }

        /* RESPONSIVE DESIGN */
        @media (max-width: 1024px) {
          .welcome-panel { padding: 60px; }
          .welcome-panel h1 { font-size: 40px; }
        }

        @media (max-width: 900px) {
          .login-container { flex-direction: column; }
          .welcome-panel { padding: 60px 30px; min-height: auto; }
          .welcome-panel p { margin-bottom: 30px; }
          .feature-list { display: none; }
          .copyright { display: none; }
          .form-panel { padding: 40px 20px; }
          .form-box { border-radius: 24px; box-shadow: none; border: none; padding: 20px; }
        }
      `}</style>

      <div className="login-container">
        {/* Left Section */}
        <div className="welcome-panel">
          <h1>Welcome Back 👋</h1>
          <p>Log in to manage your orders, track deliveries, and access your invoices securely from one place.</p>
          
          <ul className="feature-list">
            <li><span className="bullet"></span> Secure & fast checkout experience</li>
            <li><span className="bullet"></span> Track your orders in real time</li>
            <li><span className="bullet"></span> Download GST invoices anytime</li>
          </ul>

          <div className="copyright">
            © 2026 Elan Cotts. All rights reserved.
          </div>
        </div>

        {/* Right Section */}
        <div className="form-panel">
          <div className="form-box">
            <h2>Login to your account</h2>
            <p className="tagline">Please enter your credentials</p>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="input-group">
                <label>Email address</label>
                <div className="field-box">
                  <input type="email" placeholder="you@example.com" required />
                  <span className="input-icon"><Icons.Mail /></span>
                </div>
              </div>

              <div className="input-group">
                <label>Password</label>
                <div className="field-box">
                  <input type="password" placeholder="••••••••" required />
                  <span className="input-icon" style={{cursor: 'pointer'}}><Icons.Eye /></span>
                </div>
              </div>

              <button type="submit" className="login-btn">
                Login
              </button>

              <div className="signup-text">
                Don't have an account? <a href="/register">Create one</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;