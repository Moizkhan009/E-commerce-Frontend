import React, { useState, useEffect } from 'react';
import { Package, ChevronDown, Truck, CheckCircle, Clock, XCircle, MapPin } from 'lucide-react';
import axios from 'axios';

const statusConfig = {
  pending:    { icon: <Clock className="w-3 h-3" />,        bg: 'bg-yellow-100',  text: 'text-yellow-700',  label: 'Pending' },
  processing: { icon: <Package className="w-3 h-3" />,      bg: 'bg-blue-100',    text: 'text-blue-700',    label: 'Processing' },
  shipped:    { icon: <Truck className="w-3 h-3" />,         bg: 'bg-purple-100',  text: 'text-purple-700',  label: 'Shipped' },
  delivered:  { icon: <CheckCircle className="w-3 h-3" />,   bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Delivered' },
  cancelled:  { icon: <XCircle className="w-3 h-3" />,       bg: 'bg-red-100',     text: 'text-red-700',     label: 'Cancelled' },
};

const OrdersSection = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
useEffect(() => {
  const fetchOrders = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const token = userInfo?.token;

      const res = await axios.get('http://localhost:5000/api/orders', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Orders:", res.data);

      setOrders(Array.isArray(res.data.data) ? res.data.data : []);

    } catch (err) {
      console.error(err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, []);
  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const token = localStorage.getItem('token');
  //       const res = await axios.get('http://localhost:5000/api/orders', {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       // setOrders(res.data.data || res.data.orders || []);
  //       // setOrders(res.data.data.orders);
  //       // setOrders(res.data.data.orders);
  //       setOrders(res.data.data); 
  //     } catch { setOrders([]); }
  //     finally { setLoading(false); }
  //   };
  //   fetchOrders();
  // },
//   const fetchOrders = async () => {
//   try {
//     const token = localStorage.getItem('token');

//     const res = await axios.get('http://localhost:5000/api/orders', {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//     console.log("Orders:", res.data);

//     setOrders(Array.isArray(res.data.data) ? res.data.data : []);

//   } catch (err) {
//     console.error(err);
//     setOrders([]);
//   } finally {
//     setLoading(false);
//   }
// }
// }, 
//   []);


  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-gray-800">My Orders</h2>
        <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-100">
          {orders?.length || 0} orders
        </span>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />)}
        </div>
      ) : (orders?.length || 0) === 0 ? (
        <div className="text-center py-10 text-gray-400">
          <Package className="w-10 h-10 mx-auto mb-2 opacity-30" />
          <p className="text-sm font-medium">No Orders Found</p>
          <p className="text-xs mt-1 text-gray-400"> Order Something</p>
        </div>
      ) : (
        <div className="space-y-2">
          {orders.map(order => {
            const s = statusConfig[order.orderStatus] || statusConfig.pending;
            const isOpen = expandedId === order._id;
            return (
              <div key={order._id} className="border border-gray-100 rounded-xl overflow-hidden hover:border-emerald-100 transition-colors">
                <button onClick={() => setExpandedId(isOpen ? null : order._id)}
                  className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 transition-colors">
                  <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Package className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800">#{order.orderId || order._id?.slice(-8).toUpperCase()}</p>
                    <p className="text-xs text-gray-400">{order.orderDate ? new Date(order.orderDate).toLocaleDateString('en-PK', { day:'numeric', month:'short', year:'numeric' }) : '—'}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${s.bg} ${s.text}`}>
                      {s.icon} {s.label}
                    </span>
                    <span className="text-sm font-bold text-gray-800">Rs. {order.totalAmount?.toLocaleString() || 0}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50 animate-fadeSlideDown">
                    <div className="pt-3 space-y-2">
                      {(order.items || order.orderItems || []).map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-sm py-1.5 border-b border-gray-100 last:border-0">
                          <span className="text-gray-700">{item.productId?.name || 'Product'} <span className="text-gray-400">× {item.quantity}</span></span>
                          <span className="font-semibold text-gray-800">Rs. {item.productId.price?.toLocaleString() || item.productId?.price || item.price
                            
                            
                            }</span>
                        </div>
                      ))}
                      {order.shippingAddress && (
                        <div className="flex items-start gap-1.5 pt-2 text-xs text-gray-500">
                          <MapPin className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{order.shippingAddress.addressLine1}, {order.shippingAddress.city}, {order.shippingAddress.state}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersSection;