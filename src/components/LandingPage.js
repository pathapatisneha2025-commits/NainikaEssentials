import React from 'react';

const LandingPage = () => {
  return (
    <>
      <link href="/landingimage.jpeg" rel="stylesheet" />
      <style>{cssStyles}</style>
      
      <div className="wrapper">
     
        <main className="container">
          {/* Hero Banner Section using the full image */}
          <section className="hero-banner">
            {/* Clickable link or button area overlay if needed */}
            
          </section>

         
         
        </main>
        
        <div className="chat-bubble">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
        </div>
      </div>
    </>
  );
};

const cssStyles = `
  :root {
    --pill-bg: #eceffd;   
    --brand-blue: #4f46e5;
  }

  body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background-color: #fff;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* Navbar */
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
  }

  .pill-nav {
    background: var(--pill-bg);
    padding: 8px 30px;
    border-radius: 50px;
  }

  .nav-links {
    display: flex;
    list-style: none;
    gap: 30px;
    margin: 0;
    padding: 0;
  }

  .nav-links li {
    font-size: 0.9rem;
    cursor: pointer;
    color: #444;
  }

  .nav-links li.active {
    color: var(--brand-blue);
    font-weight: 600;
  }

  .icon {
    font-size: 1.2rem;
    margin-left: 20px;
    cursor: pointer;
  }

  /* Hero Banner - Using the full image directly */
  .hero-banner {
    /* Replace '/landing.jpeg' with the path to the WhatsApp image you uploaded */
    background-image: url('/landingimage.jpeg'); 
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 420px; /* Adjusted to match aspect ratio of the screenshot */
    border-radius: 8px;
    position: relative;
    margin-top: 10px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  }

  .banner-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end; /* Aligns with the 'Get the App' position */
    align-items: center;
    padding-right: 8%;
  }

  /* We style a button to sit exactly over the one in the image */
  .hidden-get-app-btn {
    background: white;
    color: #333;
    border: none;
    padding: 12px 24px;
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    opacity: 0; /* Make it 1 if you want a real button over the image one */
    transition: opacity 0.3s;
  }

  .hero-banner:hover .hidden-get-app-btn {
    opacity: 0.1; /* Slight highlight on hover to show it is clickable */
  }

  .section-title {
    margin: 40px 0;
    font-size: 2rem;
    font-weight: 600;
  }

  .chat-bubble {
    position: fixed;
    bottom: 25px;
    right: 25px;
    background: #4f46e5;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }
`;

export default LandingPage;