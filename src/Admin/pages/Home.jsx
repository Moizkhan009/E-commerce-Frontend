import React from 'react';

const Home = () => {
  return (
    <div>
      <h1 className="page-title">Dashboard Overview</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">1,234</div>
          <div className="stat-label">Total Orders</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">567</div>
          <div className="stat-label">Products</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">89</div>
          <div className="stat-label">Categories</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">$45.2K</div>
          <div className="stat-label">Revenue</div>
        </div>
      </div>
    </div>
  );
};

export default Home;