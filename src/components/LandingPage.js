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

/* CHAT BUBBLE - BASE STYLES */
.chat-bubble { 
  position: fixed; 
  bottom: 40px; 
  right: 30px; 
  background: #5D5FEF; 
  width: 58px; 
  height: 58px; 
  border-radius: 50%; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  color: white; 
  cursor: pointer; 
  z-index: 9999;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}

/* CHAT MODAL - FIX: Added fixed position and visibility */
.chat-modal {
  position: fixed;
  bottom: 110px; /* Sits above the bubble on desktop */
  right: 30px;
  width: 330px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  z-index: 10000;
  overflow: hidden;
  animation: slideUp 0.3s ease-out;
}

/* CONSOLIDATED MOBILE STYLES */
@media (max-width: 768px) {
  .chat-bubble { 
    width: 54px !important; 
    height: 54px !important; 
    bottom: 120px !important; /* Clears your bottom navigation bar */
    right: 20px !important; 
  }

  .chat-modal { 
    width: 90% !important;
    max-width: 360px;
    right: 5% !important;
    bottom: 185px !important; /* Sits above the moved bubble */
    border-radius: 16px;
  }

  .modal-slide, .modal-header { height: 110px !important; }
}

/* INTERNAL MODAL STYLES */
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
  z-index: 101; box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.modal-body { padding: 20px; }
.options-container { display: flex; flex-direction: column; gap: 12px; }
.support-option { display: flex; align-items: center; gap: 15px; padding: 12px; border: 1px solid #f0f2f5; border-radius: 12px; cursor: pointer; }
.option-icon.whatsapp { color: #25D366; }

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

export default LandingPage;