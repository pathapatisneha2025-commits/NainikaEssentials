import React, { useEffect, useState } from 'react';

const AboutPage = () => {

  /* ================= LIVE COUNTERS ================= */
  const [stats, setStats] = useState({
    customers: 0,
    products: 0,
    rating: 0,
    repeat: 0,
  });

  useEffect(() => {
    const targets = {
      customers: 10000,
      products: 250,
      rating: 5,
      repeat: 99,
    };

    const duration = 1200;
    const steps = 60;
    const interval = duration / steps;

    let current = { customers: 0, products: 0, rating: 0, repeat: 0 };

    const timer = setInterval(() => {
      current.customers += targets.customers / steps;
      current.products += targets.products / steps;
      current.rating += targets.rating / steps;
      current.repeat += targets.repeat / steps;

      setStats({
        customers: Math.min(Math.round(current.customers), targets.customers),
        products: Math.min(Math.round(current.products), targets.products),
        rating: Math.min(Math.round(current.rating), targets.rating),
        repeat: Math.min(Math.round(current.repeat), targets.repeat),
      });

      if (
        current.customers >= targets.customers &&
        current.products >= targets.products &&
        current.rating >= targets.rating &&
        current.repeat >= targets.repeat
      ) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  /* ================= ICONS ================= */
  const Icons = {
    Shirt: () => (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.62 1.96v4.42a2 2 0 0 0 .39 1.16l2 3a2 2 0 0 0 1.61.84H8v7a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-7h.39a2 2 0 0 0 1.61-.84l2-3a2 2 0 0 0 .39-1.16V5.42a2 2 0 0 0-1.62-1.96z"/></svg>
    ),
    Users: () => (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="7" r="4"/><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/></svg>
    ),
    Truck: () => (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16"/></svg>
    ),
    Shield: () => (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    ),
    Star: () => 
      <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15 8 22 9 17 14 18 21 12 18 6 21 7 14 2 9 9 8"/></svg>
    
  };

  return (
    <>
      <style>{`
        :root {
          --primary-purple: #5a4fcf;
          --bg-light: #f8f9ff;
          --text-dark: #111827;
          --text-gray: #4b5563;
          --white: #ffffff;
          --font-main: 'Inter', 'Segoe UI', sans-serif;
        }

        .about-wrapper { font-family: var(--font-main); color: var(--text-dark); line-height: 1.6; background: #fff; }
        .container { max-width: 1100px; margin: 0 auto; padding: 40px 20px; }

        /* HERO SECTION */
        .hero { display: flex; align-items: center; gap: 60px; padding: 80px 0; }
        .hero-text { flex: 1.2; }
        .subtitle { color: var(--primary-purple); font-weight: 700; font-size: 13px; letter-spacing: 1.5px; }
        .hero-text h1 { font-size: 52px; margin: 15px 0; font-weight: 800; letter-spacing: -1.5px; line-height: 1.1; }
        .hero-text p { font-size: 18px; color: var(--text-gray); margin-bottom: 30px; max-width: 500px; }
        .tags { display: flex; gap: 12px; flex-wrap: wrap; }
        .tag { background: #eeedff; color: var(--primary-purple); padding: 8px 18px; border-radius: 50px; font-size: 14px; font-weight: 600; }

        .hero-image-container { 
          flex: 1; 
          position: relative;
          border-radius: 30px; 
          overflow: hidden;
          aspect-ratio: 4/5;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
        }
        .hero-img { width: 100%; height: 100%; object-fit: cover; }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(90, 79, 207, 0.2), transparent);
        }

        /* STATS SECTION */
        .stats { display: grid; grid-template-columns: repeat(4, 1fr); background: var(--bg-light); padding: 50px; border-radius: 24px; text-align: center; margin: 40px 0; }
        .stat-item h2 { color: var(--primary-purple); font-size: 36px; margin: 0; font-weight: 800; }
        .stat-item p { color: var(--text-gray); margin-top: 8px; font-weight: 500; font-size: 15px; }

        /* STORY SECTION */
        .story { display: flex; gap: 60px; padding: 80px 0; align-items: center; }
        .story-content { flex: 1; }
        .story-content h2 { font-size: 40px; margin-bottom: 25px; font-weight: 800; letter-spacing: -1px; }
        .story-list { flex: 1; background: var(--bg-light); padding: 45px; border-radius: 24px; border: 1px solid rgba(90, 79, 207, 0.1); }
        .story-list ul { list-style: none; padding: 0; }
        .story-list li { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; font-weight: 600; font-size: 17px; }
        .check-icon { color: var(--primary-purple); font-weight: bold; font-size: 20px; }

        /* WHY CHOOSE SECTION */
        .why-choose { text-align: center; padding: 80px 0; }
        .why-choose h2 { font-size: 36px; margin-bottom: 50px; font-weight: 800; letter-spacing: -1px; }
        .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .card { padding: 45px 25px; border: 1px solid #f0f0f0; border-radius: 24px; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); background: white; }
        .card:hover { transform: translateY(-12px); box-shadow: 0 20px 40px rgba(90, 79, 207, 0.12); border-color: #d8d4ff; }
        .icon-box { color: var(--primary-purple); margin-bottom: 20px; display: inline-block; background: #eeedff; padding: 12px; border-radius: 16px; }
        .card h4 { margin-bottom: 12px; font-size: 19px; font-weight: 700; }
        .card p { color: var(--text-gray); font-size: 15px; line-height: 1.5; }

        /* EXPERIENCE SECTION */
        .experience { text-align: center; padding: 100px 20px; border-radius: 40px; background: linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%); margin: 40px 0; }
        .exp-star { color: var(--primary-purple); margin-bottom: 20px; display: inline-block; }
        .experience h2 { font-size: 38px; margin-bottom: 20px; font-weight: 800; letter-spacing: -1px; }
        .experience p { max-width: 650px; margin: 0 auto; color: var(--text-gray); font-size: 19px; }

        /* RESPONSIVE DESIGN */
        @media (max-width: 992px) {
          .hero, .story { flex-direction: column; text-align: center; padding: 40px 0; }
          .hero-text p, .experience p { margin: 0 auto 30px; }
          .tags { justify-content: center; }
          .grid, .stats { grid-template-columns: repeat(2, 1fr); }
          .hero-image-container { width: 100%; max-width: 500px; order: -1; }
        }
        @media (max-width: 600px) {
          .stats, .grid { grid-template-columns: 1fr; }
          .hero-text h1 { font-size: 38px; }
          .story-list { padding: 30px 20px; }
        }
      `}</style>

      <div className="about-wrapper">
        <div className="container">
          
          {/* HERO */}
          <section className="hero">
            <div className="hero-text">
              <span className="subtitle">ABOUT US</span>
              <h1>Elan Cotts</h1>
              <p>We are a modern clothing brand dedicated to crafting high-quality, stylish, and comfortable apparel for your everyday lifestyle.</p>
              <div className="tags">
                <span className="tag">Premium Fabrics</span>
                <span className="tag">Modern Fits</span>
                <span className="tag">Trusted Quality</span>
              </div>
            </div>
            <div className="hero-image-container">
              <img 
                src="/logoimage.jpeg" 
                alt="Elan Cotts Apparel" 
                className="hero-img"
              />
              <div className="hero-overlay"></div>
            </div>
          </section>

          
          {/* STATS WITH LIVE COUNT */}
          <section className="stats">
            <div className="stat-item">
              <h2>{stats.customers >= 1000 ? `${Math.floor(stats.customers / 1000)}K+` : stats.customers}</h2>
              <p>Happy Customers</p>
            </div>
            <div className="stat-item">
              <h2>{stats.products}+</h2>
              <p>Products Designed</p>
            </div>
            <div className="stat-item">
              <h2>{stats.rating}★</h2>
              <p>Customer Rating</p>
            </div>
            <div className="stat-item">
              <h2>{stats.repeat}%</h2>
              <p>Repeat Buyers</p>
            </div>
          </section>
          {/* STORY */}
          <section className="story">
            <div className="story-content">
              <h2>Our Story</h2>
              <p>Our journey began with a simple idea — create clothing that feels good, looks premium, and lasts longer than trends. We noticed a gap between affordability and quality, and decided to change that.</p>
              <p>Every product we release goes through careful design, fabric selection, and rigorous quality checks to ensure excellence.</p>
            </div>
            <div className="story-list">
              <ul>
                <li><span className="check-icon">✓</span> Designed for everyday comfort</li>
                <li><span className="check-icon">✓</span> Quality-first manufacturing</li>
                <li><span className="check-icon">✓</span> Honest pricing & transparency</li>
                <li><span className="check-icon">✓</span> Customer feedback driven</li>
              </ul>
            </div>
          </section>

          {/* WHY CHOOSE */}
          <section className="why-choose">
            <h2>Why Choose Elan Cotts</h2>
            <div className="grid">
              <div className="card">
                <div className="icon-box"><Icons.Shirt /></div>
                <h4>Quality Apparel</h4>
                <p>Carefully selected fabrics with superior comfort and durability.</p>
              </div>
              <div className="card">
                <div className="icon-box"><Icons.Users /></div>
                <h4>Customer First</h4>
                <p>Designed around real needs and real lifestyles.</p>
              </div>
              <div className="card">
                <div className="icon-box"><Icons.Truck /></div>
                <h4>Fast Delivery</h4>
                <p>Reliable shipping with safe and secure packaging.</p>
              </div>
              <div className="card">
                <div className="icon-box"><Icons.Shield /></div>
                <h4>Trusted Brand</h4>
                <p>Transparent policies and consistent product quality.</p>
              </div>
            </div>
          </section>

          {/* EXPERIENCE */}
          <section className="experience">
            <div className="exp-star"><Icons.Star /></div>
            <h2>Designed for a Better Shopping Experience</h2>
            <p>From browsing to checkout, every part of our platform is built to be smooth, secure, and user-friendly — so you can shop with confidence.</p>
          </section>

        </div>
      </div>
    </>
  );
};

export default AboutPage;