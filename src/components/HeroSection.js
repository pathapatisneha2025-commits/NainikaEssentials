import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const banners = [
  {
    title: "Luxury drapes at best prices",
    subtitle: "THE GOLDEN HOUR COLLECTION",
    cta: "Shop the Luxe Range",
    image: "/luxury.jpeg",
    link: "/shop",
  },
  {
    title: "Saree Extravaganza: Limited Time Sale",
    subtitle: "UNVEIL THE ELEGANCE",
    cta: "Shop Today",
    image: "/shoptoday.jpeg",
    link: "/shop",
  },
  {
    title: "Exclusive sarees, 50% off",
    subtitle: "CHIC EVENING DRAPES",
    cta: "Explore Now",
    image: "/explore.jpeg",
    link: "/shop",
  },
];

export default function HeroSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % banners.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        .hero {
          height: 85vh;
          position: relative;
          overflow: hidden;
        }

        .slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.8s ease;
        }

        .slide.active {
          opacity: 1;
          z-index: 1;
        }

        .slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.6);
        }

        .hero-content {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          padding: 0 8%;
          color: #fff;
          z-index: 2;
        }

        .hero-text {
          max-width: 560px;
        }

        .badge {
          font-size: 13px;
          letter-spacing: 2px;
          opacity: 0.9;
          margin-bottom: 14px;
        }

        .hero h1 {
          font-size: clamp(34px, 5vw, 64px);
          line-height: 1.15;
          margin-bottom: 22px;
        }

        .hero-btn {
          background: #fff;
          color: #000;
          padding: 14px 30px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 600;
          display: inline-block;
          transition: 0.3s;
        }

        .hero-btn:hover {
          background: #000;
          color: #fff;
        }

        .dots {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 3;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255,255,255,0.4);
          cursor: pointer;
        }

        .dot.active {
          background: #fff;
        }

        /* ================= TABLET ================= */
        @media (max-width: 768px) {
          .hero {
            height: 70vh;
          }

          .hero-content {
            align-items: flex-end;
            padding: 0 6% 80px;
          }

          .hero h1 {
            font-size: 28px;
            margin-bottom: 16px;
          }

          .hero-btn {
            padding: 12px 22px;
            font-size: 14px;
          }

          .dots {
            bottom: 16px;
          }
        }

        /* ================= MOBILE ================= */
        @media (max-width: 480px) {
          .hero {
            height: 65vh;
          }

          .hero-content {
            padding: 0 5% 70px;
          }

          .badge {
            font-size: 11px;
            letter-spacing: 1.5px;
          }

          .hero h1 {
            font-size: 24px;
            line-height: 1.25;
          }

          .hero-btn {
            padding: 10px 20px;
            font-size: 13px;
          }

          .dot {
            width: 8px;
            height: 8px;
          }
        }
      `}</style>

      <section className="hero">
        {banners.map((item, index) => (
          <div
            key={index}
            className={`slide ${active === index ? "active" : ""}`}
          >
            <img src={item.image} alt={item.title} />

            <div className="hero-content">
              <div className="hero-text">
                <div className="badge">{item.subtitle}</div>
                <h1>{item.title}</h1>
                <Link to={item.link} className="hero-btn">
                  {item.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}

        <div className="dots">
          {banners.map((_, i) => (
            <div
              key={i}
              className={`dot ${active === i ? "active" : ""}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
