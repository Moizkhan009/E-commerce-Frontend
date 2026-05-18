// import axios from 'axios';

// const BASE = 'http://localhost:5000/api/users ';

// const authHeaders = () => ({
//   Authorization: `Bearer ${localStorage.getItem('token')}`,
// });

// export const api = {
//   // Profile
//   getProfile:    ()         => axios.get(`${BASE}/profile`, { headers: authHeaders() }),
//   updateProfile: (data)     => axios.put(`${BASE}/profile`, data, { headers: authHeaders() }),

//   // Addresses
//   getAddresses:      ()           => axios.get(`${BASE}/addresses`, { headers: authHeaders() }),
//   addAddress:        (data)       => axios.post(`${BASE}/addresses`, data, { headers: authHeaders() }),
//   updateAddress:     (id, data)   => axios.put(`${BASE}/addresses/${id}`, data, { headers: authHeaders() }),
//   deleteAddress:     (id)         => axios.delete(`${BASE}/addresses/${id}`, { headers: authHeaders() }),
//   setDefaultAddress: (id)         => axios.put(`${BASE}/addresses/${id}/default`, {}, { headers: authHeaders() }),

//   // Payments
//   getPayments:       ()       => axios.get(`${BASE}/payments`, { headers: authHeaders() }),
//   addPayment:        (data)   => axios.post(`${BASE}/payments`, data, { headers: authHeaders() }),
//   deletePayment:     (id)     => axios.delete(`${BASE}/payments/${id}`, { headers: authHeaders() }),
//   setDefaultPayment: (id)     => axios.put(`${BASE}/payments/${id}/default`, {}, { headers: authHeaders() }),

//   // Security
//   changePassword: (data)    => axios.put(`${BASE}/security/change-password`, data, { headers: authHeaders() }),
//   logout:         ()        => axios.post(`${BASE}/security/logout`, {}, { headers: authHeaders() }),
//   deleteAccount:  (data)    => axios.delete(`${BASE}/security/delete-account`, { data, headers: authHeaders() }),
//   forgotPassword: (email)   => axios.post(`${BASE}/security/forgot-password`, { email }),
//   resetPassword:  (token, newPassword) => axios.put(`${BASE}/security/reset-password/${token}`, { newPassword }),
// };
import axios from 'axios';

// Your backend routes are at /api/... (without /users)
const BASE = 'http://localhost:5000/api';

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('userInfo')
     ? JSON.parse(localStorage.getItem('userInfo')).token : null}`,
});

export const api = {
  // Profile (matches: /api/profile)
  getProfile:    ()         => axios.get(`${BASE}/profile`, { headers: authHeaders() }),
  updateProfile: (data)     => axios.put(`${BASE}/profile`, data, { headers: authHeaders() }),

  // Addresses (matches: /api/addresses)
  getAddresses:      ()           => axios.get(`${BASE}/addresses`, { headers: authHeaders() }),
  addAddress:        (data)       => axios.post(`${BASE}/addresses`, data, { headers: authHeaders() }),
  updateAddress:     (id, data)   => axios.put(`${BASE}/addresses/${id}`, data, { headers: authHeaders() }),
  deleteAddress:     (id)         => axios.delete(`${BASE}/addresses/${id}`, { headers: authHeaders() }),
  setDefaultAddress: (id)         => axios.put(`${BASE}/addresses/${id}/default`, {}, { headers: authHeaders() }),

  // Payments (matches: /api/payments)
  getPayments:       ()       => axios.get(`${BASE}/payments`, { headers: authHeaders() }),
  addPayment:        (data)   => axios.post(`${BASE}/payments`, data, { headers: authHeaders() }),
  deletePayment:     (id)     => axios.delete(`${BASE}/payments/${id}`, { headers: authHeaders() }),
  setDefaultPayment: (id)     => axios.put(`${BASE}/payments/${id}/default`, {}, { headers: authHeaders() }),

  // Wishlist (when you uncomment in backend)
  getWishlist:       ()       => axios.get(`${BASE}/wishlist`, { headers: authHeaders() }),
  addToWishlist:     (productId) => axios.post(`${BASE}/wishlist/${productId}`, {}, { headers: authHeaders() }),
  removeFromWishlist: (productId) => axios.delete(`${BASE}/wishlist/${productId}`, { headers: authHeaders() }),
  checkWishlist:     (productId) => axios.get(`${BASE}/wishlist/check/${productId}`, { headers: authHeaders() }),
  clearWishlist:     ()       => axios.delete(`${BASE}/wishlist/clear/all`, { headers: authHeaders() }),

  // // Orders (when you uncomment in backend)
  // getOrders:         ()       => axios.get(`${BASE}/orders`, { headers: authHeaders() }),
  // getOrderById:      (id)     => axios.get(`${BASE}/orders/${id}`, { headers: authHeaders() }),
  // cancelOrder:       (id)     => axios.put(`${BASE}/orders/${id}/cancel`, {}, { headers: authHeaders() }),
  // trackOrder:        (id)     => axios.get(`${BASE}/orders/${id}/track`, { headers: authHeaders() }),
getOrders: () => axios.get(`${BASE}/orders`, { headers: authHeaders() }),
  getOrderById: (id) => axios.get(`${BASE}/orders/${id}`, { headers: authHeaders() }),
  cancelOrder: (id) => axios.put(`${BASE}/orders/${id}/cancel`, {}, { headers: authHeaders() }),
  trackOrder: (id) => axios.get(`${BASE}/orders/${id}/track`, { headers: authHeaders() }),

  // Create new order (✅ Added this)
  createOrder: (orderData) => axios.post(`${BASE}/orders`, orderData, { headers: authHeaders() }),

  // Security (matches: /api/security/*)
  changePassword: (data)    => axios.put(`${BASE}/security/change-password`, data, { headers: authHeaders() }),
  logout:         ()        => axios.post(`${BASE}/security/logout`, {}, { headers: authHeaders() }),
  deleteAccount:  (data)    => axios.delete(`${BASE}/security/delete-account`, { data, headers: authHeaders() }),
  forgotPassword: (email)   => axios.post(`${BASE}/security/forgot-password`, { email }),
  resetPassword:  (token, newPassword) => axios.put(`${BASE}/security/reset-password/${token}`, { newPassword }),
};

// Add request interceptor for debugging
axios.interceptors.request.use(
  (config) => {
    console.log(`🚀 ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for debugging
axios.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`❌ ${error.response?.status} ${error.config?.url}`);
    console.error('Error:', error.response?.data);
    return Promise.reject(error);
  }
);