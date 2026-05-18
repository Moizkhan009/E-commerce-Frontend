// // src/components/SalesChart.jsx
// import React from 'react';


// const SalesChart = ({ fullPage }) => {
//   const data = [
//     { day: 'Mon', value: 45, label: '$4.5k' },
//     { day: 'Tue', value: 60, label: '$6.0k' },
//     { day: 'Wed', value: 75, label: '$7.5k' },
//     { day: 'Thu', value: 50, label: '$5.0k' },
//     { day: 'Fri', value: 85, label: '$8.5k' },
//     { day: 'Sat', value: 95, label: '$9.5k' },
//     { day: 'Sun', value: 70, label: '$7.0k' },
//   ];

//   const maxValue = Math.max(...data.map(d => d.value));

//   return (
//     <div className={`card ${fullPage ? 'full-page' : ''}`}>
//       <div className="card-header">
//         <h3 className="card-title">📈 Sales Analytics</h3>
//         <select style={{
//           padding: '8px 16px',
//           borderRadius: '8px',
//           border: '2px solid #E5E5E5',
//           fontFamily: 'inherit',
//           fontWeight: 600,
//           color: '#253D4E',
//           cursor: 'pointer'
//         }}>
//           <option>This Week</option>
//           <option>Last Week</option>
//           <option>This Month</option>
//         </select>
//       </div>
//       <div className="card-body">
//         <div className="chart-container">
//           <div className="chart-bar-group">
//             {data.map((item, index) => (
//               <div
//                 key={index}
//                 className="chart-bar"
//                 style={{ height: `${(item.value / maxValue) * 100}%` }}
//                 data-value={item.label}
//               />
//             ))}
//           </div>
//           <div className="chart-labels">
//             {data.map((item, index) => (
//               <span key={index}>{item.day}</span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SalesChart;
// src/components/SalesChart.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardStats } from '../../redux/Dashboard/dashboardSlice';

const SalesChart = ({ fullPage }) => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.dashboard);
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  // Function to generate chart data
  const generateChartData = () => {
    const baseData = [
      { day: 'Mon', value: 45 },
      { day: 'Tue', value: 60 },
      { day: 'Wed', value: 75 },
      { day: 'Thu', value: 50 },
      { day: 'Fri', value: 85 },
      { day: 'Sat', value: 95 },
      { day: 'Sun', value: 70 },
    ];

    if (stats && stats.totalRevenue) {
      // Scale data based on actual revenue
      const scale = stats.totalRevenue / 100000;
      return baseData.map(item => ({
        ...item,
        value: Math.round(item.value * scale),
        label: `$${Math.round(item.value * scale).toLocaleString()}`
      }));
    }
    
    return baseData.map(item => ({
      ...item,
      label: `$${item.value}k`
    }));
  };

  const chartData = generateChartData();
  const maxValue = Math.max(...chartData.map(d => d.value));

  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
    // You can dispatch different API calls here based on period
  };

  if (loading) {
    return (
      <div className={`card ${fullPage ? 'full-page' : ''}`}>
        <div className="card-header">
          <h3 className="card-title">📈 Sales Analytics</h3>
          <select style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '2px solid #E5E5E5',
            fontFamily: 'inherit',
            fontWeight: 600,
            color: '#253D4E',
            cursor: 'pointer'
          }}>
            <option>This Week</option>
            <option>Last Week</option>
            <option>This Month</option>
          </select>
        </div>
        <div className="card-body">
          <div style={{ textAlign: 'center', padding: '50px' }}>
            Loading chart data...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`card ${fullPage ? 'full-page' : ''}`}>
        <div className="card-header">
          <h3 className="card-title">📈 Sales Analytics</h3>
        </div>
        <div className="card-body">
          <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
            Error: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`card ${fullPage ? 'full-page' : ''}`}>
      <div className="card-header">
        <h3 className="card-title">📈 Sales Analytics</h3>
        <select 
          value={selectedPeriod}
          onChange={handlePeriodChange}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '2px solid #E5E5E5',
            fontFamily: 'inherit',
            fontWeight: 600,
            color: '#253D4E',
            cursor: 'pointer'
          }}>
          <option value="week">This Week</option>
          <option value="lastWeek">Last Week</option>
          <option value="month">This Month</option>
        </select>
      </div>
      <div className="card-body">
        <div className="chart-container">
          <div className="chart-bar-group">
            {chartData.map((item, index) => (
              <div
                key={index}
                className="chart-bar"
                style={{ height: `${(item.value / maxValue) * 100}%` }}
                data-value={item.label}
              />
            ))}
          </div>
          <div className="chart-labels">
            {chartData.map((item, index) => (
              <span key={index}>{item.day}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;