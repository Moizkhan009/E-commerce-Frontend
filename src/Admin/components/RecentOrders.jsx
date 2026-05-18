// import React, { useEffect, useState } from 'react';

// const API_URL = 'http://localhost:5000/api/orders/admin/orders';

// const RecentOrders = ({ fullPage }) => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // ✅ TOKEN EXTRACT KARO (userInfo se)
//   const getToken = () => {
//     try {
//       const userInfo = localStorage.getItem("userInfo");
//       if (!userInfo) return null;
      
//       const parsed = JSON.parse(userInfo);
      
//       // Check karo token kahan hai
//       if (parsed.token) return parsed.token;        // { token: "..." }
//       if (parsed.accessToken) return parsed.accessToken;
//       if (typeof parsed === 'string') return parsed; // direct string
      
//       return null;
//     } catch (e) {
//       console.error("Token parse error:", e);
//       return null;
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const token = getToken();
      
//       if (!token) {
//         throw new Error('Login First -  Token not found! Please login to access orders.');
//       }

//       console.log("Token:", token); // Debug ke liye

//       const res = await fetch(API_URL, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       console.log("Status:", res.status); // Debug

//       // Agar response HTML aya (404/500 error page)
//       const contentType = res.headers.get('content-type');
//       if (!contentType || !contentType.includes('application/json')) {
//         const text = await res.text();
//         console.error("Non-JSON response:", text.substring(0, 200));
//         throw new Error(`Server ne ${res.status} error diya. Route check karo!`);
//       }

//       const data = await res.json();
//       console.log("Response:", data);

//       if (!res.ok) {
//         throw new Error(data.message || `Error: ${res.status}`);
//       }

//       // Handle different response formats
//       const ordersData = data.orders || data.data || data;
//       setOrders(Array.isArray(ordersData) ? ordersData : []);

//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ DELETE ORDER
//   const handleDelete = async (orderId) => {
//     if (!window.confirm('Pakka delete karna hai?')) return;

//     try {
//       const token = getToken();
//       const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (res.ok) {
//         setOrders(orders.filter(o => o._id !== orderId));
//         alert('✅ Order delete ho gaya!');
//       } else {
//         throw new Error('Delete failed');
//       }
//     } catch (err) {
//       alert('❌ Delete failed: ' + err.message);
//     }
//   };

//   // ✅ UPDATE STATUS
//   // const handleStatusUpdate = async (orderId, newStatus) => {
//   //   try {
//   //     const token = getToken();
//   //     const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
//   //       method: 'PUT',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //         'Authorization': `Bearer ${token}`
//   //       },
//   //       body: JSON.stringify({ status: newStatus })
//   //     });

//   //     if (res.ok) {
//   //       setOrders(orders.map(o => 
//   //         o._id === orderId ? { ...o, status: newStatus } : o
//   //       ));
//   //     } else {
//   //       throw new Error('Update failed');
//   //     }
//   //   } catch (err) {
//   //     alert('❌ Update failed: ' + err.message);
//   //   }
//   // };
// const updateStatus = async (orderId, status) => {

//   try {

//       const userInfo = localStorage.getItem("userInfo");

//     const res = await fetch(
//       `http://localhost:5000/api/admin/orders/${orderId}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({ status })
//       }
//     );

//     const data = await res.json();

//     console.log(data);

//     // UI instant update
//     setOrders((prevOrders) =>
//       prevOrders.map((order) =>
//         order._id === orderId
//           ? { ...order, orderStatus: status }
//           : order
//       )
//     );

//   } catch (error) {

//     console.log(error);

//   }
// };
//   // Status styles
//   const statusConfig = {
//     completed: { bg: '#DEF9EC', color: '#3BB77E', icon: '✓' },
//     processing: { bg: '#E3F2FD', color: '#2196F3', icon: '⟳' },
//     pending: { bg: '#FFF8E1', color: '#FFA000', icon: '⏳' },
//     cancelled: { bg: '#FFEBEE', color: '#F44336', icon: '✕' },
//     delivered: { bg: '#DEF9EC', color: '#3BB77E', icon: '📦' },
//     shipped: { bg: '#E8F5E9', color: '#4CAF50', icon: '🚚' }
//   };

  
//   const getStatus = (status) => statusConfig[status] || statusConfig.pending;


//   if (loading) {
//     return (
//       <div className="card" style={{ marginTop: fullPage ? 0 : 32 }}>
//         <div style={{ padding: 60, textAlign: 'center' }}>
//           <div style={{
//             width: 48, height: 48,
//             border: '4px solid #DEF9EC',
//             borderTop: '4px solid #3BB77E',
//             borderRadius: '50%',
//             animation: 'spin 1s linear infinite',
//             margin: '0 auto 20px'
//           }} />
//           <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//           <p style={{ color: '#7E7E7E' }}>Orders load ho rahe hain...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="card" style={{ marginTop: fullPage ? 0 : 32 }}>
//         <div style={{ padding: 40, textAlign: 'center' }}>
//           <p style={{ color: '#F74B81', fontSize: 18, marginBottom: 12 }}>⚠️ {error}</p>
          
//           {error.includes('Token') && (
//             <p style={{ color: '#7E7E7E', fontSize: 14, marginBottom: 20 }}>
//               <code style={{ background: '#f5f5f5', padding: '4px 8px', borderRadius: 4 }}>
//                 {/* localStorage.setItem("userInfo", JSON.stringify({token:"YOUR_TOKEN"})) */}
//               </code>
//             </p>
//           )}
          
//           <button onClick={fetchOrders} className="btn btn-primary" style={{ marginRight: 12 }}>
//             🔄 Retry
//           </button>
//           <button onClick={() => {
//             console.log("userInfo:", localStorage.getItem("userInfo"));
//             alert("Console check karo - token mila ya nahi");
//           }} className="btn btn-outline">
//             🔍 Debug
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (orders.length === 0) {
//     return (
//       <div className="card" style={{ marginTop: fullPage ? 0 : 32 }}>
//         <div style={{ padding: 60, textAlign: 'center' }}>
//           <p style={{ color: '#7E7E7E', fontSize: 16, marginBottom: 20 }}>
//             📭 Koi order nahi mila
//           </p>
//           <button onClick={fetchOrders} className="btn btn-primary">
//             🔄 Refresh
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="card" style={{ marginTop: fullPage ? 0 : 32 }}>
//       {/* Header */}
//       <div className="card-header">
//         <div>
//           <h3 className="card-title">📦 All Orders</h3>
//           <p style={{ color: '#7E7E7E', fontSize: 13, marginTop: 4 }}>
//             Total: {orders.length} orders
//           </p>
//         </div>
//         <div style={{ display: 'flex', gap: 12 }}>
//           <button onClick={fetchOrders} className="btn btn-outline">
//             🔄 Refresh
//           </button>
//           <button className="btn btn-primary">+ New Order</button>
//         </div>
//       </div>

//       {/* Table */}
//       <div style={{ overflowX: 'auto' }}>
//         <table className="data-table">
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>Customer</th>
//               <th>Products</th>
//               <th>Amount</th>
//               <th>Status</th>
//               <th>Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => {
//               const status = getStatus(order.status);
//               const orderId = order._id;
//               const displayId = order.orderId || order._id?.slice(-6).toUpperCase();
//               const customer = order.user || {};
//               const customerName = customer.name || order.userName || 'Unknown';
//               const customerEmail = customer.email || '';
//               const products = order.items || [];
//               const total = order.totalAmount || order.totalPrice || order.amount || 0;
//               const date = order.createdAt || order.date;

//               return (
//                 <tr key={orderId} style={{ transition: 'all 0.2s' }}>
//                   {/* Order ID */}
//                   <td style={{ fontWeight: 700, color: '#3BB77E' }}>
//                     #{displayId}
//                   </td>

//                   {/* Customer */}
//                   <td>
//                     <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//                       <div style={{
//                         width: 36, height: 36,
//                         borderRadius: '50%',
//                         background: '#DEF9EC',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         fontSize: 14,
//                         fontWeight: 700,
//                         color: '#3BB77E'
//                       }}>
//                         {customerName.charAt(0)}
//                       </div>
//                       <div>
//                         <div style={{ fontWeight: 600, fontSize: 14 }}>{customerName}</div>
//                         {customerEmail && (
//                           <div style={{ fontSize: 12, color: '#7E7E7E' }}>{customerEmail}</div>
//                         )}
//                       </div>
//                     </div>
//                   </td>

//                   {/* Products */}
//                   <td>
//                     <div style={{ fontSize: 13 }}>
//                       {products.length > 0 ? (
//                         products.map((p, i) => (
//                           <div key={i} style={{ marginBottom: 2 }}>
//                             {p.name} ×{p.quantity}
//                           </div>
//                         ))
//                       ) : (
//                         <span style={{ color: '#7E7E7E' }}>{order.items?.[0]?.name || 'N/A'}</span>
//                       )}
//                     </div>
//                   </td>

//                   {/* Amount */}
//                   <td style={{ fontWeight: 700, fontSize: 15 }}>
//                     ${typeof total === 'number' ? total.toFixed(2) : total}
//                   </td>

//                   {/* Status Dropdown */}
//                   <td>
//                     <select
//                       value={order.status || 'pending'}
//                       onChange={(e) => updateStatus(orderId, e.target.value)}
//                       style={{
//                         padding: '6px 14px',
//                         borderRadius: 20,
//                         border: 'none',
//                         fontSize: 12,
//                         fontWeight: 600,
//                         cursor: 'pointer',
//                         background: status.bg,
//                         color: status.color,
//                         outline: 'none'
//                       }}
//                     >
//                       <option value="pending">⏳ Pending</option>
//                       <option value="processing">⟳ Processing</option>
//                       <option value="shipped">🚚 Shipped</option>
//                       <option value="delivered">📦 Delivered</option>
//                       <option value="completed">✓ Completed</option>
//                       <option value="cancelled">✕ Cancelled</option>
//                     </select>
//                   </td>

//                   {/* Date */}
//                   <td style={{ color: '#7E7E7E', fontSize: 12 }}>
//                     {date ? new Date(date).toLocaleDateString('en-US', {
//                       month: 'short',
//                       day: 'numeric',
//                       year: 'numeric',
//                       hour: '2-digit',
//                       minute: '2-digit'
//                     }) : '-'}
//                   </td>

//                   {/* Actions */}
//                   <td>
//                     <div style={{ display: 'flex', gap: 6 }}>
//                       <button
//                         onClick={() => alert(`View: ${displayId}`)}
//                         style={{
//                           padding: '6px 10px',
//                           borderRadius: 8,
//                           border: 'none',
//                           background: '#E3F2FD',
//                           color: '#2196F3',
//                           cursor: 'pointer',
//                           fontSize: 14
//                         }}
//                         title="View"
//                       >
//                         👁
//                       </button>
//                       <button
//                         onClick={() => handleDelete(orderId)}
//                         style={{
//                           padding: '6px 10px',
//                           borderRadius: 8,
//                           border: 'none',
//                           background: '#FFEBEE',
//                           color: '#F44336',
//                           cursor: 'pointer',
//                           fontSize: 14
//                         }}
//                         title="Delete"
//                       >
//                         🗑
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default RecentOrders;


// src/components/RecentOrders.jsx

import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:5000/api/orders/admin/orders';

const RecentOrders = ({ fullPage }) => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ USERINFO SE TOKEN NIKALNA
  const getToken = () => {

    try {

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      return userInfo?.token;

    } catch (error) {

      console.log(error);
      return null;

    }
  };

  // ✅ FETCH ORDERS
  const fetchOrders = async () => {

    try {

      setLoading(true);

      const token = getToken();

      const res = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      console.log("ADMIN ORDERS:", data);

      // ✅ API RESPONSE HANDLE
      setOrders(data.orders || []);

      setLoading(false);

    } catch (err) {

      console.log(err);
      setError('Failed to load orders');
      setLoading(false);

    }
  };

  useEffect(() => {

    fetchOrders();

  }, []);

  // ✅ UPDATE STATUS
  const updateStatus = async (orderId, status) => {

    try {

      const token = getToken();

      const res = await fetch(
        `http://localhost:5000/api/orders/admin/orders/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ status })
        }
      );

      const data = await res.json();

      console.log(data);

      // ✅ UI UPDATE
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, orderStatus: status }
            : order
        )
      );

    } catch (error) {

      console.log(error);

    }
  };

  // ✅ DELETE ORDER
  const handleDelete = async (orderId) => {

    try {

      const token = getToken();

      const res = await fetch(
        `http://localhost:5000/api/admin/orders/${orderId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      console.log(data);

      // ✅ UI UPDATE
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );

    } catch (error) {

      console.log(error);

    }
  };

  // ✅ STATUS COLORS
  const statusConfig = {
    completed: {
      bg: '#DEF9EC',
      color: '#3BB77E'
    },
    processing: {
      bg: '#E3F2FD',
      color: '#2196F3'
    },
    pending: {
      bg: '#FFF8E1',
      color: '#FFA000'
    },
    cancelled: {
      bg: '#FFEBEE',
      color: '#F44336'
    },
    delivered: {
      bg: '#E8F5E9',
      color: '#4CAF50'
    }
  };

  const getStatus = (status) =>
    statusConfig[status] || statusConfig.pending;

  // ✅ LOADING
  if (loading) {

    return (
      <div className="card" style={{ marginTop: fullPage ? 0 : 32 }}>
        <div className="card-body">
          Loading orders...
        </div>
      </div>
    );
  }

  // ✅ ERROR
  if (error) {

    return (
      <div className="card" style={{ marginTop: fullPage ? 0 : 32 }}>
        <div
          className="card-body"
          style={{ color: 'red' }}
        >
          {error}
        </div>
      </div>
    );
  }

  return (

    <div
      className="card"
      style={{ marginTop: fullPage ? 0 : 32 }}
    >

      {/* HEADER */}
      <div className="card-header">

        <h3 className="card-title">
          📦 Recent Orders
        </h3>

        <div style={{ display: 'flex', gap: 12 }}>

          <button
            className="btn btn-outline"
            onClick={fetchOrders}
          >
            Refresh
          </button>

          <button className="btn btn-primary">
            + New Order
          </button>

        </div>
      </div>

      {/* TABLE */}
      <div
        className="card-body"
        style={{
          padding: 0,
          overflowX: 'auto'
        }}
      >

        <table className="data-table">

          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {orders.map((order, index) => {

              const status = getStatus(order.orderStatus);

              return (

                <tr key={index}>

                  {/* ORDER ID */}
                  <td
                    style={{
                      fontWeight: 600,
                      color: '#3BB77E'
                    }}
                  >
                    {order.orderId || order._id}
                  </td>

                  {/* CUSTOMER */}
                  <td>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10
                      }}
                    >

                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          background: '#DEF9EC',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 14,
                          fontWeight: 700
                        }}
                      >
                        {order.user?.name?.charAt(0) || 'U'}
                      </div>

                      <div>
                        <div>
                          {order.user?.name || 'Unknown'}
                        </div>

                        <small
                          style={{
                            color: '#7E7E7E'
                          }}
                        >
                          {order.user?.email}
                        </small>
                      </div>

                    </div>

                  </td>

                  {/* PRODUCTS */}
                  <td>

                    {order.items?.length > 0 ? (

                      order.items.map((item, i) => (

                        <div key={i}>
                          {item.name} × {item.quantity}
                        </div>

                      ))

                    ) : (

                      "No Products"

                    )}

                  </td>

                  {/* AMOUNT */}
                  <td
                    style={{
                      fontWeight: 700
                    }}
                  >
                    $
                    {order.totalAmount?.toFixed(2)}
                  </td>

                  {/* STATUS */}
                  <td>

                    <select
                      value={order.orderStatus || 'pending'}
                      onChange={(e) =>
                        updateStatus(order._id, e.target.value)
                      }
                      style={{
                        padding: '6px 10px',
                        borderRadius: 20,
                        border: 'none',
                        fontWeight: 600,
                        background: status.bg,
                        color: status.color,
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >

                      <option value="pending">
                        Pending
                      </option>

                      <option value="processing">
                        Processing
                      </option>

                      <option value="delivered">
                        Delivered
                      </option>

                      <option value="completed">
                        Completed
                      </option>

                      <option value="cancelled">
                        Cancelled
                      </option>

                    </select>

                  </td>

                  {/* DATE */}
                  <td
                    style={{
                      color: '#7E7E7E',
                      fontSize: 13
                    }}
                  >

                    {
                      new Date(
                        order.orderDate
                      ).toLocaleDateString()
                    }

                  </td>

                  {/* ACTION */}
                  <td>

                    <button
                      onClick={() =>
                        handleDelete(order._id)
                      }
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: 18,
                        color: 'red'
                      }}
                    >
                      🗑
                    </button>

                  </td>

                </tr>

              );
            })}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default RecentOrders;