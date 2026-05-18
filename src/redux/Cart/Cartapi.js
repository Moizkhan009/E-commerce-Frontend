const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

// Token localStorage se lo — jo bhi key use karo apne login mein
// const getHeaders = () => ({
//   "Content-Type": "application/json",
//   Authorization: `Bearer ${localStorage.getItem("userInfo") ?? ""}`,
// });
const getHeaders = () => {

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo") || "null"
  );

  return {
    "Content-Type": "application/json",

    Authorization: userInfo?.token
      ? `Bearer ${userInfo.token}`
      : "",
  };
};

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

export const apiUpdateCartItem = async ({ productId, qty }) => {
  const res = await fetch(`${BASE_URL}/api/cart`, {
    method:  "PUT",
    headers: getHeaders(),
    body:    JSON.stringify({ productId, qty }),
  });
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
};

export const apiRemoveFromCart = async ({ productId }) => {
  const res = await fetch(`${BASE_URL}/api/cart`, {
    method:  "DELETE",
    headers: getHeaders(),
    body:    JSON.stringify({ productId }),
  });
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
};