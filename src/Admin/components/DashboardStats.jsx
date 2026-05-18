// src/components/DashboardStats.jsx
import React ,{ useEffect}from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getDashboardStats } from '../../redux/Dashboard/dashboardSlice';

const DashboardStats = () => {

  const dispatch = useDispatch();
  // const {  loading, error } = useSelector((state) => state.dashboard);
const { stats, loading } = useSelector(
  (state) => state.dashboard
);
useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

const dashboardCards  = [
    {
      icon: '💰',
      iconColor: 'green',
      value: stats.totalRevenue || 0 ,
      label: 'Total Revenue',
      // change: '+12.5%',
      // changeType: 'positive'
    },
    {
      icon: '📦',
      iconColor: 'blue',
      value: stats.totalOrders || 0,
      label: 'Total Orders',
      // change: '+8.2%',
      // changeType: 'positive'
    },
    {
      icon: '👥',
      iconColor: 'orange',
      value: stats.totalCustomers || 0,
      label: 'Total Customers',
      // change: '+15.3%',
      // changeType: 'positive'
    },
    {
      icon: '🛒',
      iconColor: 'pink',
      value: stats.totalProductsSold || 0,
      label: 'Products Sold',
      // change: '-2.4%',
      // changeType: 'negative'
    }
  ];

  return (
    <div>
      <h1 className="page-title">Dashboard Overview</h1>
      <div className="stats-grid">
        {dashboardCards.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className={`stat-icon ${stat.iconColor}`}>
              {stat.icon}
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
            <span className={`stat-change ${stat.changeType}`}>
              {stat.changeType === 'positive' ? '↑' : '↓'} {stat.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;