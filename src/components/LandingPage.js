import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FiX, FiMessageCircle, FiPhone, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const LandingPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const saleImages = ["/shoptoday.jpeg", "/featured.jpeg"]; 
  const scrollingSale = [...saleImages, ...saleImages];

  return (
    <div className="page-container">
      <style>{cssStyles}</style>
      
      <section className="hero-banner" onClick={() => navigate('/shop')}></section>

     

      {/* Floating Chat Widget */}
      <div className="chat-bubble" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiX size={24} /> : <FiMessageCircle size={24} />}
      </div>

      {isOpen && (
        <div className="chat-modal">
          {/* HEADER WITH REDUCED HEIGHT */}
          <div className="modal-header">
            <div className="slider-track modal-track">
              {scrollingSale.map((img, index) => (
                <div key={index} className="modal-slide">
                  <img src={img} alt="sale" />
                </div>
              ))}
            </div>
            {/* CLOSE BUTTON - Fixed Z-Index */}
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

              <div className="support-option">
                <div className="option-icon phone"><FiPhone /></div>
                <div className="option-text">
                  <strong>Talk to us</strong>
                  <span>Call customer care</span>
                </div>
              </div>

              <div className="support-option">
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
  .page-container { width: 100%; min-height: 100vh; font-family: 'Inter', sans-serif; }

  .hero-banner {
    width: 100%; height: 400px;
    background: url('/landingimage.jpeg') no-repeat center center/cover;
    cursor: pointer;
  }

  /* CHAT MODAL - COMPACT */
  .chat-modal { 
    position: fixed; 
    bottom: 90px; 
    right: 25px; 
    width: 330px; 
    max-height: 500px; /* Limits total height */
    background: white; 
    border-radius: 20px; 
    box-shadow: 0 10px 30px rgba(0,0,0,0.15); 
    overflow: hidden; 
    z-index: 9999; 
  }
  
  /* Reduced Header Height */
  .modal-header { position: relative; width: 100%; height: 130px; overflow: hidden; }
  
  .slider-track { display: flex; width: max-content; }
  .modal-track { animation: scrollContinuous 12s linear infinite; }

  @keyframes scrollContinuous {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  /* Slide matches new header height */
  .modal-slide { width: 330px; height: 130px; flex-shrink: 0; }
  .modal-slide img { width: 100%; height: 100%; object-fit: cover; }

  /* CLOSE BUTTON - Forced to the top layer */
  .modal-close-btn { 
    position: absolute; 
    top: 10px; 
    right: 10px; 
    background: white; 
    border: none; 
    width: 30px; 
    height: 30px; 
    border-radius: 50%; 
    cursor: pointer; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    z-index: 100; /* Higher than images */
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    color: #333;
  }

  /* Compact Body */
  .modal-body { padding: 18px; }
  .modal-intro h3 { margin: 0; font-size: 1.1rem; font-weight: 700; color: #111; }
  .modal-intro p { margin: 2px 0 15px 0; color: #666; font-size: 0.85rem; }

  .options-container { display: flex; flex-direction: column; gap: 10px; }

  /* Compact Options */
  .support-option { 
    display: flex; 
    align-items: center; 
    gap: 12px; 
    padding: 12px; 
    border: 1px solid #f0f0f0; 
    border-radius: 15px; 
    cursor: pointer;
    transition: 0.2s ease;
  }
  .support-option:hover { background: #f9f9ff; border-color: #4b49e0; }

  .option-icon { font-size: 1.3rem; color: #4b49e0; }
  .option-text strong { display: block; font-size: 0.95rem; color: #111; }
  .option-text span { font-size: 0.8rem; color: #888; }

  .chat-bubble { 
    position: fixed; bottom: 25px; right: 25px; 
    background: #4b49e0; width: 55px; height: 55px; 
    border-radius: 50%; display: flex; justify-content: center; 
    align-items: center; color: white; cursor: pointer; z-index: 9998;
  }

  .category-section { padding: 40px 20px; }
  .category-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; }
  .cat-card { background: #eee; height: 150px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
`;

export default LandingPage;