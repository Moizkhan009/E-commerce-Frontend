// import React from 'react';

// const Home = () => {
//   return (
//     <div>
//       <h1 className="page-title">Dashboard Overview</h1>
//       <div className="stats-grid">
//         <div className="stat-card">
//           <div className="stat-number">1,234</div>
//           <div className="stat-label">Total Orders</div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-number">567</div>
//           <div className="stat-label">Products</div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-number">89</div>
//           <div className="stat-label">Categories</div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-number">$45.2K</div>
//           <div className="stat-label">Revenue</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


import React from 'react';
import { 
  ShoppingCart, 
  Package, 
  LayoutGrid, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Users,
  Activity
} from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, change, changeType, color }) => (
  <div className="stat-card">
    <div className="stat-card-header">
      <div className={`stat-icon-wrapper ${color}`}>
        <Icon size={22} />
      </div>
      <div className={`stat-change ${changeType}`}>
        {changeType === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        <span>{change}</span>
      </div>
    </div>
    <div className="stat-number">{value}</div>
    <div className="stat-label">{label}</div>
    <div className="stat-progress-bar">
      <div className="stat-progress-fill" style={{ width: `${Math.random() * 40 + 60}%` }}></div>
    </div>
  </div>
);

const RecentActivity = () => {
  const activities = [
    { user: 'John Doe', action: 'placed an order', time: '2 min ago', avatar: 'JD' },
    { user: 'Sarah Smith', action: 'added a product', time: '15 min ago', avatar: 'SS' },
    { user: 'Mike Johnson', action: 'updated category', time: '1 hour ago', avatar: 'MJ' },
    { user: 'Emily Brown', action: 'registered', time: '3 hours ago', avatar: 'EB' },
  ];

  return (
    <div className="activity-card">
      <div className="card-header">
        <h3>Recent Activity</h3>
        <Activity size={18} className="text-muted" />
      </div>
      <div className="activity-list">
        {activities.map((activity, index) => (
          <div key={index} className="activity-item">
            <div className="activity-avatar">{activity.avatar}</div>
            <div className="activity-content">
              <p><strong>{activity.user}</strong> {activity.action}</p>
              <span className="activity-time">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const stats = [
    { 
      icon: ShoppingCart, 
      label: 'Total Orders', 
      value: '1,234', 
      change: '+12.5%', 
      changeType: 'up',
      color: 'blue'
    },
    { 
      icon: Package, 
      label: 'Products', 
      value: '567', 
      change: '+8.2%', 
      changeType: 'up',
      color: 'purple'
    },
    { 
      icon: LayoutGrid, 
      label: 'Categories', 
      value: '89', 
      change: '+3.1%', 
      changeType: 'up',
      color: 'orange'
    },
    { 
      icon: DollarSign, 
      label: 'Revenue', 
      value: '$45.2K', 
      change: '+18.7%', 
      changeType: 'up',
      color: 'green'
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Dashboard Overview</h1>
          <p className="page-subtitle">Welcome back! Here's what's happening with your store.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline">
            <Users size={16} />
            View Reports
          </button>
          <button className="btn btn-primary">
            <TrendingUp size={16} />
            Analytics
          </button>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="chart-card">
          <div className="card-header">
            <h3>Revenue Overview</h3>
            <select className="select-dropdown">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="chart-placeholder">
            <div className="chart-bars">
              {[65, 45, 80, 55, 90, 70, 85].map((height, i) => (
                <div key={i} className="chart-bar" style={{ height: `${height}%` }}>
                  <div className="chart-bar-fill"></div>
                </div>
              ))}
            </div>
            <div className="chart-labels">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                <span key={i}>{day}</span>
              ))}
            </div>
          </div>
        </div>
        <RecentActivity />
      </div>

      <div className="quick-stats-row">
        <div className="quick-stat">
          <Users size={20} />
          <div>
            <span className="quick-stat-value">2,450</span>
            <span className="quick-stat-label">Total Customers</span>
          </div>
        </div>
        <div className="quick-stat">
          <Package size={20} />
          <div>
            <span className="quick-stat-value">98%</span>
            <span className="quick-stat-label">Stock Available</span>
          </div>
        </div>
        <div className="quick-stat">
          <ShoppingCart size={20} />
          <div>
            <span className="quick-stat-value">156</span>
            <span className="quick-stat-label">Pending Orders</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;