// // // src/components/InventoryStatus.jsx
// // import React from 'react';

// // const InventoryStatus = () => {
// //   const products = [
// //     { name: 'Organic Cage Grade A Large Eggs', category: 'Dairy', stock: 234, sold: 90, total: 324, status: 'good' },
// //     { name: 'Fresh Orange Juice 1L', category: 'Beverages', stock: 45, sold: 75, total: 120, status: 'low' },
// //     { name: 'Haagen Caramel Cone Ice Cream', category: 'Frozen', stock: 12, sold: 52, total: 64, status: 'critical' },
// //     { name: 'Seeds of Change Organic Rice', category: 'Grains', stock: 156, sold: 85, total: 241, status: 'good' },
// //     { name: 'Blue Almonds Salted Vegetables', category: 'Snacks', stock: 89, sold: 70, total: 159, status: 'medium' },
// //   ];

// //   const getProgressColor = (stock, total) => {
// //     const percentage = (stock / total) * 100;
// //     if (percentage > 50) return 'green';
// //     if (percentage > 20) return 'orange';
// //     return 'red';
// //   };

// //   const getStatusBadge = (status) => {
// //     const styles = {
// //       good: { bg: '#DEF9EC', color: '#3BB77E', text: 'In Stock' },
// //       medium: { bg: '#FFF8E1', color: '#FFA000', text: 'Medium' },
// //       low: { bg: '#FFEBEE', color: '#F44336', text: 'Low Stock' },
// //       critical: { bg: '#FFEBEE', color: '#F44336', text: 'Critical' }
// //     };
// //     const style = styles[status];
// //     return (
// //       <span style={{ 
// //         padding: '6px 14px', 
// //         borderRadius: 20, 
// //         fontSize: 12, 
// //         fontWeight: 600,
// //         background: style.bg,
// //         color: style.color
// //       }}>
// //         {style.text}
// //       </span>
// //     );
// //   };

// //   return (
// //     <div>
// //       <h1 className="page-title">🛍️ Products & Inventory</h1>
// //       <div className="card">
// //         <div className="card-header">
// //           <h3 className="card-title">Inventory Status</h3>
// //           <div style={{ display: 'flex', gap: 12 }}>
// //             <button className="btn btn-outline">Categories</button>
// //             <button className="btn btn-primary">+ Add Product</button>
// //           </div>
// //         </div>
// //         <div className="card-body" style={{ padding: 0, overflowX: 'auto' }}>
// //           <table className="data-table">
// //             <thead>
// //               <tr>
// //                 <th>Product</th>
// //                 <th>Category</th>
// //                 <th>Stock Level</th>
// //                 <th>Status</th>
// //                 <th>Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {products.map((product, index) => (
// //                 <tr key={index}>
// //                   <td>
// //                     <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
// //                       <div style={{ 
// //                         width: 48, 
// //                         height: 48, 
// //                         borderRadius: 8, 
// //                         background: '#DEF9EC',
// //                         display: 'flex',
// //                         alignItems: 'center',
// //                         justifyContent: 'center',
// //                         fontSize: 24
// //                       }}>
// //                         {index === 0 ? '🥚' : index === 1 ? '🍊' : index === 2 ? '🍦' : index === 3 ? '🌾' : '🥜'}
// //                       </div>
// //                       <div style={{ fontWeight: 600 }}>{product.name}</div>
// //                     </div>
// //                   </td>
// //                   <td>{product.category}</td>
// //                   <td style={{ width: '200px' }}>
// //                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 13 }}>
// //                       <span>{product.stock} left</span>
// //                       <span style={{ color: '#7E7E7E' }}>{Math.round((product.stock / product.total) * 100)}%</span>
// //                     </div>
// //                     <div className="progress-bar">
// //                       <div 
// //                         className={`progress-fill ${getProgressColor(product.stock, product.total)}`} 
// //                         style={{ width: `${(product.stock / product.total) * 100}%` }}
// //                       />
// //                     </div>
// //                   </td>
// //                   <td>{getStatusBadge(product.status)}</td>
// //                   <td>
// //                     <button className="btn btn-outline" style={{ padding: '6px 14px', fontSize: 12 }}>Restock</button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default InventoryStatus;
// // src/components/InventoryStatus.jsx
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';

// // const InventoryStatus = () => {
// //    const navigate = useNavigate();

// //   const [products, setProducts] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // Fetch Products From Backend
// //   const fetchProducts = async () => {
// //     try {
// //       const res = await axios.get('http://localhost:5000/api/product/get');

// //       // agar backend response products array mai hai
// //       const data = res.data.products || res.data;

// //       setProducts(data);
// //     } catch (error) {
// //       console.log('Error Fetching Products:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchProducts();

// //     // Real Time Auto Refresh Every 5 Seconds
// //     const interval = setInterval(() => {
// //       fetchProducts();
// //     }, 5000);

// //     return () => clearInterval(interval);
// //   }, []);

// //   const getProgressColor = (stock, total) => {
// //     const percentage = (stock / total) * 100;

// //     if (percentage > 50) return 'green';
// //     if (percentage > 20) return 'orange';

// //     return 'red';
// //   };

// //   const getStatusBadge = (status) => {
// //     const styles = {
// //       good: { bg: '#DEF9EC', color: '#3BB77E', text: 'In Stock' },
// //       medium: { bg: '#FFF8E1', color: '#FFA000', text: 'Medium' },
// //       low: { bg: '#FFEBEE', color: '#F44336', text: 'Low Stock' },
// //       critical: { bg: '#FFEBEE', color: '#F44336', text: 'Critical' },
// //     };

// //     const style = styles[status] || styles.good;

// //     return (
// //       <span
// //         style={{
// //           padding: '6px 14px',
// //           borderRadius: 20,
// //           fontSize: 12,
// //           fontWeight: 600,
// //           background: style.bg,
// //           color: style.color,
// //         }}
// //       >
// //         {style.text}
// //       </span>
// //     );
// //   };

// //   // Status Generate Automatically
// //   const generateStatus = (stock, total) => {
// //     const percentage = (stock / total) * 100;

// //     if (percentage > 50) return 'good';
// //     if (percentage > 30) return 'medium';
// //     if (percentage > 10) return 'low';

// //     return 'critical';
// //   };

// //   if (loading) {
// //     return <h2>Loading...</h2>;
// //   }

// //   return (
// //     <div>
// //       <h1 className="page-title">🛍️ Products & Inventory</h1>

// //       <div className="card">
// //         <div className="card-header">
// //           <h3 className="card-title">Inventory Status</h3>

// //           <div style={{ display: 'flex', gap: 12 }}>
// //             <button className="btn btn-outline">Categories</button>
// //             <button className="btn btn-primary"
// //             onClick={()=>navigate('/addproduct')}
// //             >+ Add Product</button>
// //           </div>
// //         </div>

// //         <div className="card-body" style={{ padding: 0, overflowX: 'auto' }}>
// //           <table className="data-table">
// //             <thead>
// //               <tr>
// //                 <th>Product</th>
// //                 <th>Category</th>
// //                 <th>Stock Level</th>
// //                 <th>Status</th>
// //                 <th>Actions</th>
// //               </tr>
// //             </thead>

// //             <tbody>
// //               {products.map((product, index) => {
// //                 const stock = product.stock || 0;
// //                 const sold = product.sold || 0;
// //                 const total = stock + sold;

// //                 const status = generateStatus(stock, total);

// //                 return (
// //                   <tr key={product._id || index}>
// //                     <td>
// //                       <div
// //                         style={{
// //                           display: 'flex',
// //                           alignItems: 'center',
// //                           gap: 12,
// //                         }}
// //                       >
// //                         <div
// //                           style={{
// //                             width: 48,
// //                             height: 48,
// //                             borderRadius: 8,
// //                             background: '#DEF9EC',
// //                             display: 'flex',
// //                             alignItems: 'center',
// //                             justifyContent: 'center',
// //                             fontSize: 24,
// //                           }}
// //                         >
// //                           📦
// //                         </div>

// //                         <div style={{ fontWeight: 600 }}>
// //                           {product.name}
// //                         </div>
// //                       </div>
// //                     </td>

// //                     <td>{product.category?.name}</td>

// //                     <td style={{ width: '200px' }}>
// //                       <div
// //                         style={{
// //                           display: 'flex',
// //                           justifyContent: 'space-between',
// //                           marginBottom: 4,
// //                           fontSize: 13,
// //                         }}
// //                       >
// //                         <span>{stock} left</span>

// //                         <span style={{ color: '#7E7E7E' }}>
// //                           {total > 0
// //                             ? Math.round((stock / total) * 100)
// //                             : 0}
// //                           %
// //                         </span>
// //                       </div>

// //                       <div className="progress-bar">
// //                         <div
// //                           className={`progress-fill ${getProgressColor(
// //                             stock,
// //                             total || 1
// //                           )}`}
// //                           style={{
// //                             width: `${
// //                               total > 0 ? (stock / total) * 100 : 0
// //                             }%`,
// //                           }}
// //                         />
// //                       </div>
// //                     </td>

// //                     <td>{getStatusBadge(status)}</td>

// //                     <td>
// //                       <button
// //                         className="btn btn-outline"
// //                         style={{ padding: '6px 14px', fontSize: 12 }}
// //                       >
// //                         Restock
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 );
// //               })}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default InventoryStatus;
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';


// // const InventoryStatus = ({ setShowProductForm, setEditingProduct }) => {
// //   const navigate = useNavigate();
// //   const [showProductForm, setShowProductForm] = useState(false);
// // const [editingProduct, setEditingProduct] = useState(null);

// //   const [products, setProducts] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // Fetch Products From Backend
// //   const fetchProducts = async () => {
// //     try {
// //       const res = await axios.get('http://localhost:5000/api/product/get');
// //       const data = res.data.products || res.data;
// //       setProducts(data);
// //     } catch (error) {
// //       console.log('Error Fetching Products:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchProducts();

// //     const interval = setInterval(() => {
// //       fetchProducts();
// //     }, 5000);

// //     return () => clearInterval(interval);
// //   }, []);

// //   // Progress Color
// //   const getProgressColor = (stock, total) => {
// //     const percentage = (stock / total) * 100;

// //     if (percentage > 50) return 'green';
// //     if (percentage > 20) return 'orange';
// //     return 'red';
// //   };

// //   // Status Badge
// //   const getStatusBadge = (status) => {
// //     const styles = {
// //       good: { bg: '#DEF9EC', color: '#3BB77E', text: 'In Stock' },
// //       medium: { bg: '#FFF8E1', color: '#FFA000', text: 'Medium' },
// //       low: { bg: '#FFEBEE', color: '#F44336', text: 'Low Stock' },
// //       critical: { bg: '#FFEBEE', color: '#F44336', text: 'Critical' },
// //     };

// //     const style = styles[status] || styles.good;

// //     return (
// //       <span
// //         style={{
// //           padding: '6px 14px',
// //           borderRadius: 20,
// //           fontSize: 12,
// //           fontWeight: 600,
// //           background: style.bg,
// //           color: style.color,
// //         }}
// //       >
// //         {style.text}
// //       </span>
// //     );
// //   };

// //   // Auto Status
// //   const generateStatus = (stock, total) => {
// //     const percentage = (stock / total) * 100;

// //     if (percentage > 50) return 'good';
// //     if (percentage > 30) return 'medium';
// //     if (percentage > 10) return 'low';
// //     return 'critical';
// //   };

// //   // ADD PRODUCT (ONLY LOGIC CHANGE)
// //   const handleAddProduct = () => {
// //     if (setEditingProduct) setEditingProduct(null);
// //     if (setShowProductForm) setShowProductForm(true);
// //   };

// //   // EDIT PRODUCT (OPTIONAL BUT READY)
// //   const handleEdit = (product) => {
// //     if (setEditingProduct) setEditingProduct(product);
// //     if (setShowProductForm) setShowProductForm(true);
// //   };

// //   if (loading) {
// //     return <h2>Loading...</h2>;
// //   }

// //   return (
// //     <div>
// //       <h1 className="page-title">🛍️ Products & Inventory</h1>

// //       <div className="card">
// //         <div className="card-header">
// //           <h3 className="card-title">Inventory Status</h3>

// //           <div style={{ display: 'flex', gap: 12 }}>
// //             <button className="btn btn-outline">
// //               Categories
// //             </button>

// //             {/* ONLY CHANGE HERE */}
// //             <button
// //               className="btn btn-primary"
// //               onClick={handleAddProduct}
// //             >
// //               + Add Product
// //             </button>
// //           </div>
// //         </div>

// //         <div className="card-body" style={{ padding: 0, overflowX: 'auto' }}>
// //           <table className="data-table">
// //             <thead>
// //               <tr>
// //                 <th>Product</th>
// //                 <th>Category</th>
// //                 <th>Stock Level</th>
// //                 <th>Status</th>
// //                 <th>Actions</th>
// //               </tr>
// //             </thead>

// //             <tbody>
// //               {products.map((product, index) => {
// //                 const stock = product.stock || 0;
// //                 const sold = product.sold || 0;
// //                 const total = stock + sold;

// //                 const status = generateStatus(stock, total);

// //                 return (
// //                   <tr key={product._id || index}>
// //                     <td>
// //                       <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
// //                         <div
// //                           style={{
// //                             width: 48,
// //                             height: 48,
// //                             borderRadius: 8,
// //                             background: '#DEF9EC',
// //                             display: 'flex',
// //                             alignItems: 'center',
// //                             justifyContent: 'center',
// //                             fontSize: 24,
// //                           }}
// //                         >
// //                           📦
// //                         </div>

// //                         <div style={{ fontWeight: 600 }}>
// //                           {product.name}
// //                         </div>
// //                       </div>
// //                     </td>

// //                     <td>{product.category?.name}</td>

// //                     <td style={{ width: '200px' }}>
// //                       <div
// //                         style={{
// //                           display: 'flex',
// //                           justifyContent: 'space-between',
// //                           marginBottom: 4,
// //                           fontSize: 13,
// //                         }}
// //                       >
// //                         <span>{stock} left</span>

// //                         <span style={{ color: '#7E7E7E' }}>
// //                           {total > 0 ? Math.round((stock / total) * 100) : 0}%
// //                         </span>
// //                       </div>

// //                       <div className="progress-bar">
// //                         <div
// //                           className={`progress-fill ${getProgressColor(stock, total || 1)}`}
// //                           style={{
// //                             width: `${total > 0 ? (stock / total) * 100 : 0}%`,
// //                           }}
// //                         />
// //                       </div>
// //                     </td>

// //                     <td>{getStatusBadge(status)}</td>

// //                     <td>
// //                       {/* OPTIONAL EDIT BUTTON LOGIC (NO UI CHANGE) */}
// //                       <button
// //                         className="btn btn-outline"
// //                         style={{ padding: '6px 14px', fontSize: 12 }}
// //                         onClick={() => handleEdit(product)}
// //                       >
// //                         Restock
// //                       </button>
// //                     </td>

// //                   </tr>
// //                 );
// //               })}
// //             </tbody>

// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default InventoryStatus;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const InventoryStatus = () => {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch Products From Backend
//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/product/get');
//       const data = res.data.products || res.data;
//       setProducts(data);
//     } catch (error) {
//       console.log('Error Fetching Products:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();

//     const interval = setInterval(() => {
//       fetchProducts();
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   // Progress Color
//   const getProgressColor = (stock, total) => {
//     const percentage = (stock / total) * 100;
//     if (percentage > 50) return 'green';
//     if (percentage > 20) return 'orange';
//     return 'red';
//   };

//   // Status Badge
//   const getStatusBadge = (status) => {
//     const styles = {
//       good: { bg: '#DEF9EC', color: '#3BB77E', text: 'In Stock' },
//       medium: { bg: '#FFF8E1', color: '#FFA000', text: 'Medium' },
//       low: { bg: '#FFEBEE', color: '#F44336', text: 'Low Stock' },
//       critical: { bg: '#FFEBEE', color: '#F44336', text: 'Critical' },
//     };

//     const style = styles[status] || styles.good;

//     return (
//       <span
//         style={{
//           padding: '6px 14px',
//           borderRadius: 20,
//           fontSize: 12,
//           fontWeight: 600,
//           background: style.bg,
//           color: style.color,
//         }}
//       >
//         {style.text}
//       </span>
//     );
//   };

//   // Auto Status
//   const generateStatus = (stock, total) => {
//     const percentage = (stock / total) * 100;
//     if (percentage > 50) return 'good';
//     if (percentage > 30) return 'medium';
//     if (percentage > 10) return 'low';
//     return 'critical';
//   };

//   // Navigate to Add Product Page
//   const handleAddProduct = () => {
//     navigate('/addproduct'); // Change this to your form route
//   };

//   // Navigate to Edit Product Page
//   const handleEdit = (product) => {
//     navigate(`/editproduct/${product._id}`); // Pass product ID
//   };

//   if (loading) {
//     return <h2>Loading...</h2>;
//   }

//   return (
//     <div>
//       <h1 className="page-title">🛍️ Products & Inventory</h1>

//       <div className="card">
//         <div className="card-header">
//           <h3 className="card-title">Inventory Status</h3>

//           <div style={{ display: 'flex', gap: 12 }}>
//             <button className="btn btn-outline">
//               Categories
//             </button>

//             <button
//               className="btn btn-primary"
//               onClick={handleAddProduct}
//             >
//               + Add Product
//             </button>
//           </div>
//         </div>

//         <div className="card-body" style={{ padding: 0, overflowX: 'auto' }}>
//           <table className="data-table">
//             <thead>
//               <tr>
//                 <th>Product</th>
//                 <th>Category</th>
//                 <th>Stock Level</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {products.map((product, index) => {
//                 const stock = product.stock || 0;
//                 const sold = product.sold || 0;
//                 const total = stock + sold;
//                 const status = generateStatus(stock, total);

//                 return (
//                   <tr key={product._id || index}>
//                     <tr>
//                       <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//                         <div
//                           style={{
//                             width: 48,
//                             height: 48,
//                             borderRadius: 8,
//                             background: '#DEF9EC',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             fontSize: 24,
//                           }}
//                         >
//                           📦
//                         </div>
//                         <div style={{ fontWeight: 600 }}>
//                           {product.name}
//                         </div>
//                       </div>
//                     </tr>
//                     <td>{product.category?.name}</td>
//                     <td style={{ width: '200px' }}>
//                       <div
//                         style={{
//                           display: 'flex',
//                           justifyContent: 'space-between',
//                           marginBottom: 4,
//                           fontSize: 13,
//                         }}
//                       >
//                         <span>{stock} left</span>
//                         <span style={{ color: '#7E7E7E' }}>
//                           {total > 0 ? Math.round((stock / total) * 100) : 0}%
//                         </span>
//                       </div>
//                       <div className="progress-bar">
//                         <div
//                           className={`progress-fill ${getProgressColor(stock, total || 1)}`}
//                           style={{
//                             width: `${total > 0 ? (stock / total) * 100 : 0}%`,
//                           }}
//                         />
//                       </div>
//                     </td>
//                     <td>{getStatusBadge(status)}</td>
//                     <td>
//                       <button
//                         className="btn btn-outline"
//                         style={{ padding: '6px 14px', fontSize: 12 }}
//                         onClick={() => handleEdit(product)}
//                       >
//                         Restock
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InventoryStatus;





import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InventoryStatus = ({ setShowProductForm, setEditingProduct }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/product/get');
      setProducts(res.data.products || res.data);
    } catch (error) {
      console.log('Error Fetching Products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(fetchProducts, 5000);
    return () => clearInterval(interval);
  }, []);

  // Helper Functions
  const getProgressColor = (stock, total) => {
    const percentage = (stock / total) * 100;
    if (percentage > 50) return 'green';
    if (percentage > 20) return 'orange';
    return 'red';
  };

  const getStatusBadge = (status) => {
    const styles = {
      good: { bg: '#DEF9EC', color: '#3BB77E', text: 'In Stock' },
      medium: { bg: '#FFF8E1', color: '#FFA000', text: 'Medium' },
      low: { bg: '#FFEBEE', color: '#F44336', text: 'Low Stock' },
      critical: { bg: '#FFEBEE', color: '#F44336', text: 'Critical' },
    };
    const style = styles[status] || styles.good;
    return (
      <span style={{ 
        padding: '6px 14px', 
        borderRadius: 20, 
        fontSize: 12, 
        fontWeight: 600,
        background: style.bg,
        color: style.color
      }}>
        {style.text}
      </span>
    );
  };

  const generateStatus = (stock, total) => {
    const percentage = (stock / total) * 100;
    if (percentage > 50) return 'good';
    if (percentage > 30) return 'medium';
    if (percentage > 10) return 'low';
    return 'critical';
  };

  // ⬅️ BUTTON HANDLERS
  const handleAddProduct = () => {
    // Safety check - agar props nahi mile toh error na aaye
    if (typeof setEditingProduct === 'function') {
      setEditingProduct(null);
    }
    if (typeof setShowProductForm === 'function') {
      setShowProductForm(true);
    }
  };

  const handleEdit = (product) => {
    if (typeof setEditingProduct === 'function') {
      setEditingProduct(product);
    }
    if (typeof setShowProductForm === 'function') {
      setShowProductForm(true);
    }
  };
const handleDelete = async (id) => {
   const confirmDelete = window.confirm("Are you sure you want to delete this product?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:5000/api/product/${id}`);

    // UI update (remove deleted product instantly)
    setProducts((prev) => prev.filter((p) => p._id !== id));

    alert('Product deleted successfully');
  } catch (error) {
    console.log('Delete error:', error);
    alert('Failed to delete product');
  }
};
  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <h1 className="page-title">🛍️ Products & Inventory</h1>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Inventory Status</h3>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-outline">Categories</button>
            
            {/* ⬅️ ADD PRODUCT BUTTON */}
            <button 
              className="btn btn-primary" 
              onClick={handleAddProduct}
            >
              + Add Product
            </button>
          </div>
        </div>

        <div className="card-body" style={{ padding: 0, overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Stock Level</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                const stock = product.countInStock || 0;
                const sold = product.sold || 0;
                const total = stock + sold;
                const status = generateStatus(stock, total);

                return (
                  <tr key={product._id || index}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{
                          width: 48, height: 48, borderRadius: 8,
                          background: '#DEF9EC', display: 'flex',
                          alignItems: 'center', justifyContent: 'center',
                          fontSize: 24
                        }}>
                          {/* {product.} */}
                          📦
                        </div>
                        <div style={{ fontWeight: 600 }}>{product.name}</div>
                      </div>
                    </td>
                    <td>{product.category?.name}</td>
                    <td style={{ width: '200px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 13 }}>
                        <span>{stock} left</span>
                        <span style={{ color: '#7E7E7E' }}>
                          {total > 0 ? Math.round((stock / total) * 100) : 0}%
                        </span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className={`progress-fill ${getProgressColor(stock, total || 1)}`}
                          style={{ width: `${total > 0 ? (stock / total) * 100 : 0}%` }}
                        />
                      </div>
                    </td>
                    <td>{getStatusBadge(status)}</td>
                    <td>
                      <button 
                        className="btn btn-outline" 
                        style={{ padding: '6px 14px', fontSize: 12, marginRight: 8 }}
                        onClick={() => handleEdit(product)}
                      >
                        ✏️ Edit
                      </button>
                      <button 
  className="btn btn-outline"
  style={{ 
    padding: '6px 14px', 
    fontSize: 12, 
    color: 'red',
    borderColor: 'red'
  }}
  onClick={() => handleDelete(product._id)}
>
  🗑 Delete
</button>
                      {/* <button className="btn btn-outline" style={{ padding: '6px 14px', fontSize: 12 }}>
                        Restock
                      </button> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryStatus;