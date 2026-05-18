import React, { useState } from 'react';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [notifications] = useState([
    { id: 1, text: 'New order #1234 received', time: '2 min ago' },
    { id: 2, text: 'Low stock: Organic Eggs', time: '1 hour ago' },
    { id: 3, text: 'Payment confirmed #1230', time: '3 hours ago' },
  ]);

  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="menu-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? '✕' : '☰'}
        </button>
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search orders, products, customers..." />
        </div>
      </div>

      <div className="header-right">
        <div style={{ position: 'relative' }}>
          <button 
            className="header-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            🔔
            <span className="notification-badge"></span>
          </button>
          
          {showNotifications && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              width: '320px',
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
              marginTop: '12px',
              zIndex: 1000,
              overflow: 'hidden'
            }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #eee', fontWeight: 700 }}>
                Notifications ({notifications.length})
              </div>
              {notifications.map(n => (
                <div key={n.id} style={{ padding: '14px 20px', borderBottom: '1px solid #f5f5f5', cursor: 'pointer' }}>
                  <div style={{ fontSize: '14px', marginBottom: '4px' }}>{n.text}</div>
                  <div style={{ fontSize: '12px', color: '#7E7E7E' }}>{n.time}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="header-btn">✉️</button>
        <button className="header-btn">⚙️</button>
        <div style={{ 
          width: '36px', 
          height: '36px', 
          borderRadius: '50%', 
          background: '#DEF9EC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '18px'
        }}>
          👤
        </div>
      </div>
    </header>
  );
};

export default Header;