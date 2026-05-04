// // ─────────────────────────────────────────────────────────────
// //  cartApi.js — All API calls matching your controller exactly
// //  Set VITE_API_URL in .env when ready
// // ─────────────────────────────────────────────────────────────

// const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

// const getHeaders = () => ({
//   "Content-Type": "application/json",
//   // Authorization: `Bearer ${localStorage.getItem("token")}`,
// });

// // POST /api/cart — body: { user, productId, qty }
// export const apiAddToCart = async ({ user, productId, qty = 1 }) => {
//   const res = await fetch(`${BASE_URL}/api/cart`, {
//     method: "POST",
//     headers: getHeaders(),
//     body: JSON.stringify({ user, productId, qty }),
//   });
//   if (!res.ok) throw new Error((await res.json()).message);
//   return res.json(); // full Cart object
// };

// // PUT /api/cart — body: { user, productId, qty }
// export const apiUpdateCartItem = async ({ user, productId, qty }) => {
//   const res = await fetch(`${BASE_URL}/api/cart`, {
//     method: "PUT",
//     headers: getHeaders(),
//     body: JSON.stringify({ user, productId, qty }),
//   });
//   if (!res.ok) throw new Error((await res.json()).message);
//   return res.json();
// };

// // DELETE /api/cart — body: { user, productId }
// export const apiRemoveFromCart = async ({ user, productId }) => {
//   const res = await fetch(`${BASE_URL}/api/cart`, {
//     method: "DELETE",
//     headers: getHeaders(),
//     body: JSON.stringify({ user, productId }),
//   });
//   if (!res.ok) throw new Error((await res.json()).message);
//   return res.json();
// // };
// const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

// const getHeaders = () => ({
//   "Content-Type": "application/json",
//   Authorization: `Bearer ${localStorage.getItem("token")}`, // 🔥 IMPORTANT
// });

// // ─────────────────────────────
// // POST /api/cart
// // body: { productId, qty }
// // ─────────────────────────────
// export const apiAddToCart = async ({ productId, qty = 1 }) => {
//   const res = await fetch(`${BASE_URL}/api/cart`, {
//     method: "POST",
//     headers: getHeaders(),
//     body: JSON.stringify({ productId, qty }),
//   });

//   if (!res.ok) throw new Error((await res.json()).message);
//   return res.json();
// };

// // ─────────────────────────────
// // PUT /api/cart
// // ─────────────────────────────
// export const apiUpdateCartItem = async ({ productId, qty }) => {
//   const res = await fetch(`${BASE_URL}/api/cart`, {
//     method: "PUT",
//     headers: getHeaders(),
//     body: JSON.stringify({ productId, qty }),
//   });

//   if (!res.ok) throw new Error((await res.json()).message);
//   return res.json();
// };

// // ─────────────────────────────
// // DELETE /api/cart
// // ─────────────────────────────
// export const apiRemoveFromCart = async ({ productId }) => {
//   const res = await fetch(`${BASE_URL}/api/cart`, {
//     method: "DELETE",
//     headers: getHeaders(),
//     body: JSON.stringify({ productId }),
//   });

//   if (!res.ok) throw new Error((await res.json()).message);
//   return res.json();
// };

// // ─────────────────────────────
// // GET CART (IMPORTANT MISSING IN YOUR FILE)
// // ─────────────────────────────
// export const apiGetCart = async () => {
//   const res = await fetch(`${BASE_URL}/api/cart`, {
//     method: "GET",
//     headers: getHeaders(),
//   });

//   if (!res.ok) throw new Error((await res.json()).message);
//   return res.json();
// };
// ─────────────────────────────────────────────







// const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

// const getHeaders = () => {
//   const token = localStorage.getItem("token");

//   return {
//     "Content-Type": "application/json",
//     ...(token && { Authorization: `Bearer ${token}` }),
//   };
// };

// const handleResponse = async (res) => {
//   if (!res.ok) {
//     let msg = "Error";
//     try {
//       const data = await res.json();
//       msg = data.message || msg;
//     } catch {}
//     throw new Error(msg);
//   }
//   return res.json();
// };

// // GET CART
// export const apiGetCart = async () => {
//   const res = await fetch(`${BASE_URL}/api/cart`, {
//     headers: getHeaders(),
//   });
//   return handleResponse(res);
// };

// // ADD
// export const apiAddToCart = async ({ productId, qty }) => {
//   const res = await fetch(`${BASE_URL}/api/cart`, {
//     method: "POST",
//     headers: getHeaders(),
//     body: JSON.stringify({ productId, qty }),
//   });
//   return handleResponse(res);
// };

// // UPDATE
// export const apiUpdateCartItem = async ({ productId, qty }) => {
//   const res = await fetch(`${BASE_URL}/api/cart`, {
//     method: "PUT",
//     headers: getHeaders(),
//     body: JSON.stringify({ productId, qty }),
//   });
//   return handleResponse(res);
// };

// // REMOVE
// export const apiRemoveFromCart = async ({ productId }) => {
//   const res = await fetch(`${BASE_URL}/api/cart`, {
//     method: "DELETE",
//     headers: getHeaders(),
//     body: JSON.stringify({ productId }),
//   });
//   return handleResponse(res);
// };




// ─────────────────────────────────────────────────────────────
//  cartApi.js — token auth ke saath sab calls
//  .env: VITE_API_URL=http://localhost:5000
// ─────────────────────────────────────────────────────────────

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

// Token localStorage se lo — jo bhi key use karo apne login mein
const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
});

// ── GET /api/cart ──────────────────────────────────────────
// user auth middleware se aata hai (req.user.id)
// body kuch nahi bhejni — sirf token
export const apiGetCart = async () => {
  const res = await fetch(`${BASE_URL}/api/cart`, {
    method:  "GET",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json(); // { _id, user, cartItems[], totalPrice }
};

// ── POST /api/cart ─────────────────────────────────────────
// body: { productId, qty }  — user token se aata hai
export const apiAddToCart = async ({ productId, qty = 1 }) => {
  const res = await fetch(`${BASE_URL}/api/cart`, {
    method:  "POST",
    headers: getHeaders(),
    body:    JSON.stringify({ productId, qty }),
  });
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
};

// ── PUT /api/cart ──────────────────────────────────────────
// body: { productId, qty }  — user token se aata hai
export const apiUpdateCartItem = async ({ productId, qty }) => {
  const res = await fetch(`${BASE_URL}/api/cart`, {
    method:  "PUT",
    headers: getHeaders(),
    body:    JSON.stringify({ productId, qty }),
  });
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
};

// ── DELETE /api/cart ───────────────────────────────────────
// body: { productId }  — user token se aata hai
export const apiRemoveFromCart = async ({ productId }) => {
  const res = await fetch(`${BASE_URL}/api/cart`, {
    method:  "DELETE",
    headers: getHeaders(),
    body:    JSON.stringify({ productId }),
  });
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
};