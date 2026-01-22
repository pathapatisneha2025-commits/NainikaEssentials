import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FiX, FiPhone, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { HiChatAlt2 } from "react-icons/hi";

const LandingPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const saleImages = ["/shoptoday.jpeg", "/featured.jpeg"]; 
  const scrollingSale = [...saleImages, ...saleImages];

  return (
    <div className="page-container">
      <style>{cssStyles}</style>

      {/* APP EXCLUSIVE BANNER SECTION */}
      <section className="banner-container">
        <div className="exclusive-banner" onClick={() => navigate('/shop')}>
          <img src="/landingimage.jpeg" alt="App Exclusive Offer" className="banner-image"/>
        </div>
      </section>

      {/* FLOATING CHAT BUBBLE */}
      <div className="chat-bubble" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiX size={24} /> : <HiChatAlt2 size={32} />}
      </div>

      {/* SUPPORT MODAL */}
      {isOpen && (
        <div className="chat-modal">
          <div className="modal-header">
            <div className="slider-track modal-track">
              {scrollingSale.map((img, index) => (
                <div key={index} className="modal-slide">
                  <img src={img} alt="sale" />
                </div>
              ))}
            </div>
            <button className="modal-close-btn" onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}>
              <FiX size={18} />
            </button>
          </div>

          <div className="modal-body">
            <div className="modal-intro">
              <h3>How can we help?</h3>
              <p>Choose one option below</p>
            </div>

            <div className="options-container">
              <div className="support-option" onClick={() => window.open('https://wa.me/yournumber', '_blank')}>
                <div className="option-icon whatsapp"><FaWhatsapp /></div>
                <div className="option-text">
                  <strong>Chat with us</strong>
                  <span>Instant WhatsApp support</span>
                </div>
              </div>

              <div className="support-option" onClick={() => window.location.href = 'tel:+1234567890'}>
                <div className="option-icon phone"><FiPhone /></div>
                <div className="option-text">
                  <strong>Talk to us</strong>
                  <span>Call customer care</span>
                </div>
              </div>

              <div className="support-option" onClick={() => window.location.href = 'mailto:support@example.com'}>
                <div className="option-icon mail"><FiMail /></div>
                <div className="option-text">
                  <strong>Write to us</strong>
                  <span>Email support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const cssStyles = `
.page-container { width: 100%; background-color: #fff; }

/* Banner */
.banner-container { padding: 40px 4%; box-sizing: border-box; }
.exclusive-banner { width: 100%; cursor: pointer; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); transition: transform 0.3s ease; }
.exclusive-banner:hover { transform: translateY(-3px); }
.banner-image { width: 100%; display: block; object-fit: cover; }

/* Chat Bubble */
.chat-bubble { 
  position: fixed; 
  bottom: 120px; 
  right: 25px; 
  width: 58px; 
  height: 58px;
  background: #5D5FEF; 
  border-radius: 50%; 
  display: flex; 
  align-items: center; 
  justify-content: center;
  color: white; 
  cursor: pointer; 
  z-index: 99999;
  box-shadow: 0 4px 14px rgba(0,0,0,0.2);
  transition: transform 0.2s ease, background 0.2s ease;
}
.chat-bubble:hover { transform: scale(1.05); background: #4e50e5; }
.chat-bubble svg { display: block; }

/* Chat Modal */
.chat-modal {
  position: fixed; 
  bottom: 180px; 
  right: 20px;
  width: 350px; 
  max-width: 90%; 
  background: #fff; 
  border-radius: 16px; 
  box-shadow: 0 8px 25px rgba(0,0,0,0.2);
  z-index: 99998; 
  animation: slideUp 0.3s ease;
  overflow: hidden; /* prevents content overflow */
}

/* Modal Animation */
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Modal Header */
.modal-header {
  position: relative; 
  width: 100%; 
  height: 80px; /* reduced from 130px */
  overflow: hidden; 
  background: #f0f0f0; 
}
.slider-track { display: flex; width: max-content; }
.modal-track { animation: scrollContinuous 12s linear infinite; }
@keyframes scrollContinuous { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
.modal-slide { width: 330px; height: 80px; flex-shrink: 0; } /* match header */
.modal-slide img { width: 100%; height: 100%; object-fit: cover; }

.modal-close-btn { 
  position: absolute; top: 10px; right: 10px; 
  background: white; border: none; width: 30px; height: 30px; border-radius: 50%; 
  cursor: pointer; display: flex; align-items: center; justify-content: center; 
  z-index: 100; box-shadow: 0 2px 8px rgba(0,0,0,0.1); 
}

/* Modal Body */
.modal-body { padding: 15px; } /* reduced padding */
.modal-intro h3 { margin: 0; font-size: 1.1rem; font-weight: 700; color: #1a2b48; }
.modal-intro p { margin: 4px 0 12px 0; color: #666; font-size: 0.85rem; } /* smaller margin */

.options-container { display: flex; flex-direction: column; gap: 10px; } /* smaller gap */
.support-option { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border: 1px solid #f0f2f5; border-radius: 12px; cursor: pointer; transition: all 0.2s ease; }
.support-option:hover { background: #f8f9ff; border-color: #5a4fcf; }
.option-icon { font-size: 1.2rem; display: flex; align-items: center; }
.option-icon.whatsapp { color: #25D366; }
.option-icon.phone { color: #5a4fcf; }
.option-icon.mail { color: #5a4fcf; }
.option-text strong { display: block; font-size: 0.85rem; color: #1a2b48; }
.option-text span { font-size: 0.7rem; color: #888; }

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .chat-modal { width: 90%; max-width: 360px; right: 5%; bottom: 150px; border-radius: 16px; }
  .chat-bubble { bottom: 120px; right: 20px; width: 50px; height: 50px; }
  .modal-slide { width: 100%; height: 60px; } /* smaller on mobile */
  .modal-header { height: 60px; } 
  .modal-body { padding: 12px; }
  .slider-track, .modal-track { width: 100%; }
}
`;

export default LandingPage;
