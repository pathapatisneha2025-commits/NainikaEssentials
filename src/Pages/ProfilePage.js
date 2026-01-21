import React, { useEffect, useState } from 'react';
import { Mail, Phone, User, LogOut, MessageCircle } from 'lucide-react';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('adminUser'));
    const Id = storedUser?.user_id;

    if (Id) {
      fetch(`https://nainikaessentialsdatabas.onrender.com/users/${Id}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data.user);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    window.location.href = '/login';
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif', color: '#64748b' }}>Loading profile...</div>;

  return (
    <div className="page-wrapper">
      {/* Internal CSS Styles */}
      <style>{`
        .page-wrapper {
          min-height: 100vh;
          background-color: #F8FAFC;
          padding: 40px 20px;
          font-family: 'Inter', -apple-system, sans-serif;
        }
        .container {
          max-width: 1100px;
          margin: 0 auto;
        }
        .banner {
          background-color: #6366F1;
          border-radius: 32px;
          padding: 60px;
          color: white;
          display: flex;
          align-items: center;
          gap: 30px;
          margin-bottom: 40px;
          box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.2);
        }
        .avatar {
          width: 110px;
          height: 110px;
          background-color: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 45px;
          font-weight: 600;
        }
        .name-section h1 {
          font-size: 50px;
          font-weight: 700;
          margin: 0;
          text-transform: lowercase;
          letter-spacing: -1px;
        }
        .welcome-msg {
          font-size: 18px;
          opacity: 0.9;
          margin-top: 5px;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
        }
        .card {
          background: white;
          padding: 35px;
          border-radius: 24px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .card-label {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #6366F1;
          font-weight: 700;
          font-size: 18px;
          margin-bottom: 8px;
        }
        .card-value {
          color: #64748b;
          font-size: 16px;
          margin: 0;
        }
        .footer-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 60px;
        }
        .logout-button {
          background-color: #EF4444;
          color: white;
          border: none;
          padding: 15px 40px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }
        .logout-button:hover {
          background-color: #DC2626;
          transform: translateY(-2px);
        }
        .chat-btn {
          position: fixed;
          bottom: 40px;
          right: 40px;
          background-color: #6366F1;
          color: white;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
          cursor: pointer;
          transition: transform 0.2s;
        }
        .chat-btn:hover {
          transform: scale(1.1);
        }
        @media (max-width: 768px) {
          .banner {
            flex-direction: column;
            text-align: center;
            padding: 40px 20px;
          }
          .name-section h1 { font-size: 35px; }
        }
      `}</style>

      <div className="container">
        {/* Banner Section */}
        <div className="banner">
          <div className="avatar">
            {userData?.full_name?.charAt(0).toUpperCase() || 'S'}
          </div>
          <div className="name-section">
            <h1>{userData?.full_name || 'sneha'}</h1>
            <p className="welcome-msg">Welcome back 👋</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid">
          <div className="card">
            <div className="card-label">
              <Mail size={22} />
              <span>Email</span>
            </div>
            <p className="card-value">{userData?.email || 'sneha@example.com'}</p>
          </div>

          <div className="card">
            <div className="card-label">
              <Phone size={22} />
              <span>Phone</span>
            </div>
            <p className="card-value">{userData?.phone_number || '09876543210'}</p>
          </div>

          <div className="card">
            <div className="card-label">
              <User size={22} />
              <span>Account Type</span>
            </div>
            <p className="card-value">{userData?.role || 'User'}</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="footer-actions">
          <button onClick={handleLogout} className="logout-button">
            <LogOut size={20} />
            Logout
          </button>
        </div>

        {/* Floating Chat */}
        <button className="chat-btn">
          <MessageCircle size={32} />
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;