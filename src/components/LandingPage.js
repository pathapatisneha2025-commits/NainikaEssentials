import React, { useState } from 'react';
import { FiX, FiMessageCircle, FiPhone, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const LandingPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Main Page Banners
  const mainImages = ["/landingimage.jpeg", "/banner2.jpeg", "/banner3.jpeg"];
  const scrollingMain = [...mainImages, ...mainImages];

  // Chat Box Banners (Sankranti Sale)
  // Even if you only have one image, doubling it allows it to scroll smoothly
  const saleImages = ["/sale-banner.jpeg", "/sale-banner.jpeg"]; 
  const scrollingSale = [...saleImages, ...saleImages];

  return (
    <>
      <style>{cssStyles}</style>
      <div className="wrapper">
        <main className="container">
          {/* Main Hero Continuous Scroll */}
          <section className="hero-slider">
            <div className="slider-track main-track">
              {scrollingMain.map((img, index) => (
                <div key={index} className="slide"><img src={img} alt="banner" /></div>
              ))}
            </div>
          </section>
        </main>

        <div className={`chat-bubble ${isOpen ? 'modal-open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={26} /> : <FiMessageCircle size={26} />}
        </div>

        {isOpen && (
          <div className="chat-modal">
            {/* CONTINUOUS SCROLLING INSIDE MODAL HEADER */}
            <div className="modal-header">
              <div className="slider-track modal-track">
                {scrollingSale.map((img, index) => (
                  <div key={index} className="modal-slide"><img src={img} alt="sale" /></div>
                ))}
              </div>
              <button className="modal-close-btn" onClick={() => setIsOpen(false)}>
                <FiX size={16} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="modal-intro">
                <h3>How can we help?</h3>
                <p>Choose an option below</p>
              </div>
              
              <div className="options-container">
                <div className="support-option" onClick={() => window.open('https://wa.me/yournumber')}>
                  <div className="option-icon whatsapp"><FaWhatsapp /></div>
                  <div className="option-text">
                    <strong>Chat with us</strong>
                    <span>WhatsApp support</span>
                  </div>
                </div>
                <div className="support-option">
                  <div className="option-icon phone"><FiPhone /></div>
                  <div className="option-text"><strong>Talk to us</strong><span>Call customer care</span></div>
                </div>
                <div className="support-option">
                  <div className="option-icon mail"><FiMail /></div>
                  <div className="option-text"><strong>Write to us</strong><span>Email support</span></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const cssStyles = `
  :root { --brand-blue: #4f46e5; }

  /* Track Logic */
  .slider-track { display: flex; width: calc(200%); }
  
  /* Main Slider - 25 seconds */
  .main-track { animation: scrollContinuous 25s linear infinite; }
  
  /* Modal Slider - 10 seconds (faster for small area) */
  .modal-track { animation: scrollContinuous 10s linear infinite; }

  @keyframes scrollContinuous {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .hero-slider { position: relative; width: 100%; height: 400px; margin-top: 20px; border-radius: 12px; overflow: hidden; }
  .slide { width: 100%; height: 400px; flex-shrink: 0; }
  .slide img { width: 100%; height: 100%; object-fit: cover; }

  /* Chat Modal Styles */
  .chat-modal { position: fixed; bottom: 90px; right: 25px; width: 340px; background: white; border-radius: 20px; box-shadow: 0 15px 45px rgba(0,0,0,0.15); overflow: hidden; z-index: 2001; }
  
  /* Modal Header with Scroll */
  .modal-header { position: relative; width: 100%; height: 140px; overflow: hidden; }
  .modal-slide { width: 100%; height: 140px; flex-shrink: 0; }
  .modal-slide img { width: 100%; height: 100%; object-fit: cover; }

  .modal-close-btn { position: absolute; top: 12px; right: 12px; background: rgba(255,255,255,0.8); border: none; width: 28px; height: 28px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 20; color: #000; }
  .chat-bubble { position: fixed; bottom: 25px; right: 25px; background: #4b49e0; width: 55px; height: 55px; border-radius: 50%; display: flex; justify-content: center; align-items: center; color: white; cursor: pointer; z-index: 2000; }

  .modal-body { padding: 20px; }
  .modal-intro h3 { margin: 0; font-size: 1.2rem; font-weight: 700; }
  .modal-intro p { margin: 2px 0 15px 0; color: #777; font-size: 0.95rem; }
  .options-container { display: flex; flex-direction: column; gap: 10px; }
  .support-option { display: flex; align-items: center; gap: 15px; padding: 12px 16px; border: 1px solid #f1f1f6; border-radius: 15px; cursor: pointer; }
  .option-icon { font-size: 1.4rem; color: #4b49e0; }
  .option-text strong { display: block; font-size: 1rem; }
  .option-text span { font-size: 0.85rem; color: #999; }
`;

export default LandingPage;