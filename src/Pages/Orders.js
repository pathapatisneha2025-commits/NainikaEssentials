import React from 'react';

const OrdersPage = () => {
  // SVG Icon Components
  const Icons = {
    Package: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
    ),
    Clock: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    ),
    CheckCircle: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    ),
    Truck: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
    )
  };

  const orderData = [
    { id: '#EC-8841', date: 'Jan 12, 2026', status: 'Delivered', total: '₹2,499', items: 2, img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=100' },
    { id: '#EC-8720', date: 'Jan 15, 2026', status: 'In Transit', total: '₹1,250', items: 1, img: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=100' },
    { id: '#EC-8611', date: 'Jan 08, 2026', status: 'Processing', total: '₹4,800', items: 3, img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=100' }
  ];

  return (
    <>
      <style>{`
        :root {
          --primary-purple: #5a4fcf;
          --bg-light: #f8f9ff;
          --text-dark: #111827;
          --text-gray: #6b7280;
          --white: #ffffff;
          --success: #10b981;
          --warning: #f59e0b;
        }

        .page-wrapper { font-family: 'Inter', sans-serif; color: var(--text-dark); background: #fff; min-height: 100vh; }
        .container { max-width: 1000px; margin: 0 auto; padding: 60px 20px; }

        /* HEADER */
        .header { margin-bottom: 40px; }
        .subtitle { color: var(--primary-purple); font-weight: 700; font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; }
        .header h1 { font-size: 36px; margin: 10px 0; font-weight: 800; letter-spacing: -1px; }

        /* QUICK STATS (Matching About Page Format) */
        .order-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 50px; }
        .stat-card { background: var(--bg-light); padding: 30px; border-radius: 20px; border: 1px solid rgba(90, 79, 207, 0.05); }
        .stat-card h3 { color: var(--primary-purple); font-size: 28px; margin: 0; }
        .stat-card p { color: var(--text-gray); font-size: 14px; margin: 5px 0 0; font-weight: 500; }

        /* ORDER LIST */
        .orders-list { display: flex; flex-direction: column; gap: 20px; }
        .order-row { 
          display: flex; 
          align-items: center; 
          padding: 24px; 
          border: 1px solid #f0f0f0; 
          border-radius: 24px; 
          background: white; 
          transition: all 0.3s ease;
        }
        .order-row:hover { border-color: #d8d4ff; box-shadow: 0 10px 25px rgba(90, 79, 207, 0.06); transform: translateY(-2px); }

        .order-img { width: 80px; height: 80px; border-radius: 16px; object-fit: cover; background: #f3f4f6; }
        
        .order-info { flex: 1; margin-left: 20px; }
        .order-info h4 { margin: 0; font-size: 18px; font-weight: 700; }
        .order-info p { color: var(--text-gray); font-size: 14px; margin: 4px 0 0; }

        .order-meta { text-align: right; }
        .order-price { display: block; font-weight: 800; font-size: 18px; margin-bottom: 8px; }

        /* STATUS BADGES */
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
        }
        .badge.delivered { background: #ecfdf5; color: var(--success); }
        .badge.transit { background: #fffbeb; color: var(--warning); }
        .badge.processing { background: #eef2ff; color: var(--primary-purple); }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .order-stats { grid-template-columns: 1fr; }
          .order-row { flex-direction: column; text-align: center; }
          .order-info { margin: 20px 0; }
          .order-meta { text-align: center; width: 100%; border-top: 1px solid #f0f0f0; pt: 15px; margin-top: 15px; }
          .header { text-align: center; }
        }
      `}</style>

      <div className="page-wrapper">
        <div className="container">
          
          <header className="header">
            <span className="subtitle">ACCOUNT AREA</span>
            <h1>My Orders</h1>
            <p style={{color: 'var(--text-gray)'}}>Track, manage, and view your order history with Elan Cotts.</p>
          </header>

          <section className="order-stats">
            <div className="stat-card">
              <h3>12</h3>
              <p>Total Orders</p>
            </div>
            <div className="stat-card">
              <h3>01</h3>
              <p>In Transit</p>
            </div>
            <div className="stat-card">
              <h3>₹14,580</h3>
              <p>Total Spent</p>
            </div>
          </section>

          <section className="orders-list">
            <h3 style={{marginBottom: '20px', fontWeight: '800'}}>Recent History</h3>
            
            {orderData.map((order) => (
              <div className="order-row" key={order.id}>
                <img src={order.img} alt="Product" className="order-img" />
                
                <div className="order-info">
                  <h4>Order {order.id}</h4>
                  <p>Placed on {order.date} • {order.items} Items</p>
                </div>

                <div className="order-meta">
                  <span className="order-price">{order.total}</span>
                  <span className={`badge ${order.status.toLowerCase().replace(' ', '')}`}>
                    {order.status === 'Delivered' && <Icons.CheckCircle />}
                    {order.status === 'In Transit' && <Icons.Truck />}
                    {order.status === 'Processing' && <Icons.Clock />}
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </section>

          {/* EMPTY STATE HELPER (Optional) */}
          <section style={{marginTop: '60px', textAlign: 'center', padding: '40px', background: 'var(--bg-light)', borderRadius: '30px'}}>
             <div style={{color: 'var(--primary-purple)', marginBottom: '15px'}}><Icons.Package /></div>
             <h4 style={{margin: '0'}}>Need help with an order?</h4>
             <p style={{color: 'var(--text-gray)', fontSize: '14px'}}>Visit our Help Center or contact customer support 24/7.</p>
          </section>

        </div>
      </div>
    </>
  );
};

export default OrdersPage;