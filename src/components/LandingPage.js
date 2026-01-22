import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FiX, FiMessageCircle, FiPhone, FiMail } from "react-icons/fi";
import { FaWhatsapp ,FaComment} from "react-icons/fa";
import { HiChatAlt2 } from "react-icons/hi";
const LandingPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Images for the scrolling modal header
  const saleImages = ["/shoptoday.jpeg", "/featured.jpeg"]; 
  const scrollingSale = [...saleImages, ...saleImages];

  return (
    <div className="page-container">
      <style>{cssStyles}</style>
      
      {/* APP EXCLUSIVE BANNER SECTION */}
      <section className="banner-container">
        <div className="exclusive-banner" onClick={() => navigate('/shop')}>
          {/* Replace with your actual banner image path */}
          <img 
            src="/landingimage.jpeg" 
            alt="App Exclusive Offer - Flat 15% Off" 
            className="banner-image"
          />
        </div>
      </section>
{/* FLOATING CHAT BUBBLE */}
<div className={`chat-bubble ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
  {/* HiChatAlt2 gives you the overlapping double-bubble look from your screenshot */}
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

/* BANNER STYLING */
.banner-container {
  padding: 40px 4%; /* Matches the padding of the New Arrivals section */
  box-sizing: border-box;
}

.exclusive-banner {
  width: 100%;
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: transform 0.3s ease;
}

.exclusive-banner:hover {
  transform: translateY(-3px);
}

.banner-image {
  width: 100%;
  display: block;
  object-fit: cover;
}

/* UPDATED CHAT BUBBLE - EXACT MATCH */
.chat-bubble { 
  position: fixed; 
  bottom: 110px; /* Increased to sit clearly above the white nav bar on mobile */
  right: 25px; 
  background: #5D5FEF; /* The specific vibrant purple from your screenshot */
  width: 58px; 
  height: 58px; 
  border-radius: 50%; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  color: white; 
  cursor: pointer; 
  z-index: 9999;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2); /* Soft shadow for depth */
  transition: transform 0.2s ease, background 0.2s ease;
}

.chat-bubble:hover {
  transform: scale(1.05);
  background: #4e50e5; /* Subtle darken on hover */
}

/* Ensure the icon stays perfectly centered */
.chat-bubble svg {
  display: block;
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .chat-bubble { 
    width: 54px; 
    height: 54px; 
    bottom: 100px; /* Positioned to avoid overlapping your bottom menu icons */
    right: 20px; 
  }
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.modal-header { position: relative; width: 100%; height: 130px; overflow: hidden; background: #f0f0f0; }
.slider-track { display: flex; width: max-content; }
.modal-track { animation: scrollContinuous 12s linear infinite; }
@keyframes scrollContinuous { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
.modal-slide { width: 330px; height: 130px; flex-shrink: 0; }
.modal-slide img { width: 100%; height: 100%; object-fit: cover; }

.modal-close-btn { 
  position: absolute; top: 10px; right: 10px; 
  background: white; border: none; width: 30px; height: 30px; border-radius: 50%; 
  cursor: pointer; display: flex; align-items: center; justify-content: center; 
  z-index: 100; box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.modal-body { padding: 20px; }
.modal-intro h3 { margin: 0; font-size: 1.1rem; font-weight: 700; color: #1a2b48; }
.modal-intro p { margin: 4px 0 18px 0; color: #666; font-size: 0.85rem; }

.options-container { display: flex; flex-direction: column; gap: 12px; }
.support-option { 
  display: flex; 
  align-items: center; 
  gap: 15px; 
  padding: 12px 15px; 
  border: 1px solid #f0f2f5; 
  border-radius: 12px; 
  cursor: pointer; 
  transition: all 0.2s ease; 
}
.support-option:hover { background: #f8f9ff; border-color: #5a4fcf; }
.option-icon { font-size: 1.4rem; color: #5a4fcf; display: flex; align-items: center; }
.option-icon.whatsapp { color: #25D366; }
.option-text strong { display: block; font-size: 0.9rem; color: #1a2b48; }
.option-text span { font-size: 0.75rem; color: #888; }

/* CHAT MODAL RESPONSIVE FIX */
@media (max-width: 768px) {
  .chat-modal { 
    width: 90% !important;     /* Fit most of the screen */
    max-width: 360px;          /* Optional: cap max width */
    right: 5% !important;      /* Centered horizontally */
    bottom: 80px !important;
    border-radius: 16px;
  }

  .modal-slide { 
    width: 100% !important;    /* Fit the chat modal width */
    height: auto !important;   /* Maintain aspect ratio */
  }

  .modal-header { 
    height: auto !important;   /* Adjust according to slides */
  }

  .slider-track, .modal-track {
    width: 100% !important;    /* Ensure the scrolling track fits modal */
  }

  .chat-bubble { 
    width: 50px !important; 
    height: 50px !important; 
    bottom: 50px !important; 
    right: 20px !important; 
  }
}

}

`;

export default LandingPage;