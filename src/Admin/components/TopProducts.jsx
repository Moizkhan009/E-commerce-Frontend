// // src/components/TopProducts.jsx
// import React from 'react';
// import { useDispatch,useSelector } from 'react-redux';
// // 

// const TopProducts = ({ fullPage }) => {
//   const products = [
//     { name: 'Organic Cage Grade A Large Eggs', category: 'Dairy', sales: 1234, revenue: '$12,340', trend: '+15%' },
//     { name: 'Fresh Orange Juice 1L', category: 'Beverages', sales: 987, revenue: '$12,337', trend: '+8%' },
//     { name: 'Haagen Caramel Cone Ice Cream', category: 'Frozen', sales: 856, revenue: '$19,556', trend: '+22%' },
//     { name: 'Seeds of Change Organic Rice', category: 'Grains', sales: 743, revenue: '$21,235', trend: '+5%' },
//     { name: 'Blue Almonds Salted Vegetables', category: 'Snacks', sales: 654, revenue: '$15,456', trend: '-3%' },
//   ];

//   return (
//     <div className={`card ${fullPage ? 'full-page' : ''}`}>
//       <div className="card-header">
//         <h3 className="card-title">🔥 Top Selling Products</h3>
//         <button className="btn btn-outline">View All</button>
//       </div>
//       <div className="card-body" style={{ padding: 0 }}>
//         {products.map((product, index) => (
//           <div key={index} className="product-item">
//             <div className="product-img">
//               {index === 0 ? '🥚' : index === 1 ? '🍊' : index === 2 ? '🍦' : index === 3 ? '🌾' : '🥜'}
//             </div>
//             <div className="product-info" style={{ flex: 1 }}>
//               <h4>{product.name}</h4>
//               <p>{product.category} • {product.sales} sales</p>
//             </div>
//             <div style={{ textAlign: 'right' }}>
//               <div className="product-price">{product.revenue}</div>
//               <div style={{ 
//                 fontSize: '12px', 
//                 color: product.trend.startsWith('+') ? '#3BB77E' : '#F74B81',
//                 fontWeight: 600 
//               }}>
//                 {product.trend}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TopProducts;
// src/components/TopProducts.jsx (With better error handling)
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTopProducts } from '../../redux/Dashboard/dashboardSlice';

const TopProducts = ({ fullPage }) => {
  const dispatch = useDispatch();
  const { topProducts, loading, error } = useSelector((state) => state.dashboard);

  React.useEffect(() => {
    dispatch(getTopProducts());
  }, [dispatch]);

  console.log(topProducts);
  

  // Define products with proper fallback
  let products = [];
  
  if (topProducts && topProducts.length > 0) {
    products = topProducts.map((product, index) => ({
      name: product.name,
      category: 'Products',
      sales: product.quantity,
      revenue: `$${(product.quantity * 10).toLocaleString()}`,
      trend: index === 0 ? '+15%' : index === 1 ? '+8%' : index === 2 ? '+22%' : index === 3 ? '+5%' : '-3%'
    }));
  } else {
    // Fallback static data
    products = [
      { name: 'Organic Cage Grade A Large Eggs', category: 'Dairy', sales: 1234, revenue: '$12,340', trend: '+15%' },
      { name: 'Fresh Orange Juice 1L', category: 'Beverages', sales: 987, revenue: '$12,337', trend: '+8%' },
      { name: 'Haagen Caramel Cone Ice Cream', category: 'Frozen', sales: 856, revenue: '$19,556', trend: '+22%' },
      { name: 'Seeds of Change Organic Rice', category: 'Grains', sales: 743, revenue: '$21,235', trend: '+5%' },
      { name: 'Blue Almonds Salted Vegetables', category: 'Snacks', sales: 654, revenue: '$15,456', trend: '-3%' },
    ];
  }

  if (loading) {
    return (
      <div className={`card ${fullPage ? 'full-page' : ''}`}>
        <div className="card-header">
          <h3 className="card-title">🔥 Top Selling Products</h3>
        </div>
        <div className="card-body">
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div className="spinner"></div>
            Loading products...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`card ${fullPage ? 'full-page' : ''}`}>
        <div className="card-header">
          <h3 className="card-title">🔥 Top Selling Products</h3>
        </div>
        <div className="card-body">
          <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
            Error loading products: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`card ${fullPage ? 'full-page' : ''}`}>
      <div className="card-header">
        <h3 className="card-title">🔥 Top Selling Products</h3>
        <button className="btn btn-outline">View All</button>
      </div>
      <div className="card-body" style={{ padding: 0 }}>
        {products.map((product, index) => (
          <div key={index} className="product-item">
            <div className="product-img">
              {index === 0 ? '🥚' : index === 1 ? '🍊' : index === 2 ? '🍦' : index === 3 ? '🌾' : '🥜'}
            </div>
            <div className="product-info" style={{ flex: 1 }}>
              <h4>{product.name}</h4>
              <p>{product.category} • {product.sales} sales</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="product-price">{product.revenue}</div>
              <div style={{ 
                fontSize: '12px', 
                color: product.trend.startsWith('+') ? '#3BB77E' : '#F74B81',
                fontWeight: 600 
              }}>
                {product.trend}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;