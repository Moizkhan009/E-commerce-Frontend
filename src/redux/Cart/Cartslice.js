// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { apiAddToCart, apiUpdateCartItem, apiRemoveFromCart } from "./cartApi.js";

// // ─── Dummy data (matches your Cart model exactly) ─────────────
// // cart.cartItems[] shape: { product, name, image, price, qty }
// // totalPrice is auto-calculated by backend pre-save hook
// const DUMMY_CART = {
//   _id: "cart_abc123",
//   user: "user_xyz456",
//   cartItems: [
//     // {
//     //   product: "prod_001",
//     //   name: "Organic Baby Spinach",
//     //   image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80",
//     //   price: 4.99,
//     //   qty: 2,
//     // },
//     // {
//     //   product: "prod_002",
//     //   name: "Premium Avocados (Pack of 4)",
//     //   image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&q=80",
//     //   price: 5.99,
//     //   qty: 1,
//     // },
//     // {
//     //   product: "prod_003",
//     //   name: "Heirloom Cherry Tomatoes",
//     //   image: "https://images.unsplash.com/photo-1546470427-e26264be0b11?w=400&q=80",
//     //   price: 3.49,
//     //   qty: 3,
//     // },
//   ],
// //   totalPrice: 26.44,
//   createdAt: "2026-04-20T10:00:00Z",
//   updatedAt: "2026-04-28T14:32:00Z",
// };

// // ─── Toggle this to false when your API is ready ──────────────
// const USE_DUMMY = false;

// // helper — recalculate totalPrice like your pre-save hook
// const recalc = (items) =>
//   parseFloat(items.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2));

// // ─────────────────────────────────────────────────────────────
// //  Async Thunks
// // ─────────────────────────────────────────────────────────────

// // POST /api/cart — { user, productId, qty }
// export const addToCart = createAsyncThunk(
//   "cart/addToCart",
//   async (payload, { getState, rejectWithValue }) => {
//     if (USE_DUMMY) {
//       const { cart } = getState();
//       const items = [...cart.cartItems];
//       const idx = items.findIndex((i) => i.product === payload.productId);
//       if (idx > -1) {
//         items[idx] = { ...items[idx], qty: items[idx].qty + (payload.qty ?? 1) };
//       } else {
//         items.push({
//           product: payload.productId,
//           name:    payload.name,
//           image:   payload.image,
//           price:   payload.price,
//           qty:     payload.qty ?? 1,
//         });
//       }
//       return { ...cart, cartItems: items, totalPrice: recalc(items) };
//     }
//     try {
//       return await apiAddToCart(payload);
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

// // PUT /api/cart — { user, productId, qty }
// export const updateCartItem = createAsyncThunk(
//   "cart/updateCartItem",
//   async (payload, { getState, rejectWithValue }) => {
//     if (USE_DUMMY) {
//       const { cart } = getState();
//       let items = cart.cartItems.map((i) =>
//         i.product === payload.productId ? { ...i, qty: payload.qty } : i
//       ).filter((i) => i.qty > 0); // qty<=0 = remove (matches your controller)
//       return { ...cart, cartItems: items, totalPrice: recalc(items) };
//     }
//     try {
//       return await apiUpdateCartItem(payload);
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

// // DELETE /api/cart — { user, productId }
// export const removeFromCart = createAsyncThunk(
//   "cart/removeFromCart",
//   async (payload, { getState, rejectWithValue }) => {
//     if (USE_DUMMY) {
//       const { cart } = getState();
//       const items = cart.cartItems.filter((i) => i.product !== payload.productId);
//       return { ...cart, cartItems: items, totalPrice: recalc(items) };
//     }
//     try {
//       return await apiRemoveFromCart(payload);
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

// // ─────────────────────────────────────────────────────────────
// //  Slice
// // ─────────────────────────────────────────────────────────────
// const cartSlice = createSlice({
//   name: "cart",

//   // Initial state = exact Cart model shape from your backend
//   initialState: {
//     // Cart fields
//     _id:        DUMMY_CART._id,
//     user:       DUMMY_CART.user,
//     cartItems:  DUMMY_CART.cartItems,  // CartItem[] — { product, name, image, price, qty }
//     totalPrice: DUMMY_CART.totalPrice, // from backend pre-save hook
//     createdAt:  DUMMY_CART.createdAt,
//     updatedAt:  DUMMY_CART.updatedAt,

//     // UI state
//     status:  "idle",   // "idle" | "loading" | "succeeded" | "failed"
//     error:   null,
//   },

//   reducers: {
//     // Sync action — clear cart locally (no API endpoint in your controller yet)
//     clearCart(state) {
//       state.cartItems  = [];
//       state.totalPrice = 0;
//     },

//     // Sync action — set error manually if needed
//     resetError(state) {
//       state.error  = null;
//       state.status = "idle";
//     },
//   },

//   extraReducers: (builder) => {
//     // ── Helper to set loading state ──────────────────────────
//     const setPending = (state) => {
//       state.status = "loading";
//       state.error  = null;
//     };

//     // ── Helper to replace cart with backend response ─────────
//     // Backend always returns the full updated Cart object
//     const setCart = (state, action) => {
//       const cart = action.payload;
//       state._id        = cart._id;
//       state.user       = cart.user;
//       state.cartItems  = cart.cartItems;
//       state.totalPrice = cart.totalPrice; // ← pre-save hook value
//       state.updatedAt  = cart.updatedAt ?? new Date().toISOString();
//       state.status     = "succeeded";
//       state.error      = null;
//     };

//     const setError = (state, action) => {
//       state.status = "failed";
//       state.error  = action.payload ?? action.error.message;
//     };

//     builder
//       // addToCart
//       .addCase(addToCart.pending,   setPending)
//       .addCase(addToCart.fulfilled, setCart)
//       .addCase(addToCart.rejected,  setError)

//       // updateCartItem
//       .addCase(updateCartItem.pending,   setPending)
//       .addCase(updateCartItem.fulfilled, setCart)
//       .addCase(updateCartItem.rejected,  setError)

//       // removeFromCart
//       .addCase(removeFromCart.pending,   setPending)
//       .addCase(removeFromCart.fulfilled, setCart)
//       .addCase(removeFromCart.rejected,  setError);
//   },
// });

// export const { clearCart, resetError } = cartSlice.actions;

// // ─── Selectors ────────────────────────────────────────────────
// export const selectCartItems    = (state) => state.cart.cartItems;
// export const selectTotalPrice   = (state) => state.cart.totalPrice;
// export const selectCartStatus   = (state) => state.cart.status;
// export const selectCartError    = (state) => state.cart.error;
// export const selectItemCount    = (state) =>
//   state.cart.cartItems.reduce((s, i) => s + i.qty, 0);

// export default cartSlice.reducer;
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   apiAddToCart,
//   apiUpdateCartItem,
//   apiRemoveFromCart,
//   apiGetCart,
// } from "./cartApi.js";

// // ─────────────────────────────
// // INITIAL STATE (REAL API BASED)
// // ─────────────────────────────
// const initialState = {
//   _id: null,
//   user: null,
//   cartItems: [],
//   totalPrice: 0,

//   status: "idle", // idle | loading | succeeded | failed
//   error: null,
// };

// // ─────────────────────────────
// // GET CART
// // GET /api/cart
// // ─────────────────────────────
// export const getCart = createAsyncThunk(
//   "cart/getCart",
//   async (_, { rejectWithValue }) => {
//     try {
//       return await apiGetCart();
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

// // ─────────────────────────────
// // ADD TO CART
// // POST /api/cart
// // ─────────────────────────────
// export const addToCart = createAsyncThunk(
//   "cart/addToCart",
//   async (payload, { rejectWithValue }) => {
//     try {
//       return await apiAddToCart(payload);
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

// // ─────────────────────────────
// // UPDATE CART ITEM
// // PUT /api/cart
// // ─────────────────────────────
// export const updateCartItem = createAsyncThunk(
//   "cart/updateCartItem",
//   async (payload, { rejectWithValue }) => {
//     try {
//       return await apiUpdateCartItem(payload);
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

// // ─────────────────────────────
// // REMOVE FROM CART
// // DELETE /api/cart
// // ─────────────────────────────
// export const removeFromCart = createAsyncThunk(
//   "cart/removeFromCart",
//   async (payload, { rejectWithValue }) => {
//     try {
//       return await apiRemoveFromCart(payload);
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

// // ─────────────────────────────
// // SLICE
// // ─────────────────────────────
// const cartSlice = createSlice({
//   name: "cart",
//   initialState,

//   reducers: {
//     clearCart: (state) => {
//       state._id = null;
//       state.cartItems = [];
//       state.totalPrice = 0;
//       state.user = null;
//     },

//     resetError: (state) => {
//       state.error = null;
//       state.status = "idle";
//     },
//   },

//   extraReducers: (builder) => {
//     const pending = (state) => {
//       state.status = "loading";
//       state.error = null;
//     };

//     const fulfilled = (state, action) => {
//       const cart = action.payload;

//       state._id = cart._id;
//       state.user = cart.user;
//       state.cartItems = cart.cartItems;
//       state.totalPrice = cart.totalPrice;
//       state.status = "succeeded";
//     };

//     const rejected = (state, action) => {
//       state.status = "failed";
//       state.error = action.payload || action.error.message;
//     };

//     builder
//       // GET CART
//       .addCase(getCart.pending, pending)
//       .addCase(getCart.fulfilled, fulfilled)
//       .addCase(getCart.rejected, rejected)

//       // ADD
//       .addCase(addToCart.pending, pending)
//       .addCase(addToCart.fulfilled, fulfilled)
//       .addCase(addToCart.rejected, rejected)

//       // UPDATE
//       .addCase(updateCartItem.pending, pending)
//       .addCase(updateCartItem.fulfilled, fulfilled)
//       .addCase(updateCartItem.rejected, rejected)

//       // REMOVE
//       .addCase(removeFromCart.pending, pending)
//       .addCase(removeFromCart.fulfilled, fulfilled)
//       .addCase(removeFromCart.rejected, rejected);
//   },
// });

// // ─────────────────────────────
// // EXPORTS
// // ─────────────────────────────
// export const { clearCart, resetError } = cartSlice.actions;

// export const selectCartItems = (state) => state.cart.cartItems;
// export const selectTotalPrice = (state) => state.cart.totalPrice;
// export const selectCartStatus = (state) => state.cart.status;
// export const selectCartError = (state) => state.cart.error;

// export const selectItemCount = (state) =>
//   state.cart.cartItems.reduce((sum, item) => sum + item.qty, 0);

// export default cartSlice.reducer;import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetCart,
  apiAddToCart,
  apiUpdateCartItem,
  apiRemoveFromCart,
} from "./cartApi.js";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalPrice: 0,
  status: "idle",
  error: null,
};

// GET
export const getCart = createAsyncThunk("cart/get", async (_, { rejectWithValue }) => {
  try {
    return await apiGetCart();
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// ADD
export const addToCart = createAsyncThunk("cart/add", async (data, { rejectWithValue }) => {
  try {
    return await apiAddToCart(data);
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// UPDATE
export const updateCartItem = createAsyncThunk("cart/update", async (data, { rejectWithValue }) => {
  try {
    return await apiUpdateCartItem(data);
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// REMOVE
export const removeFromCart = createAsyncThunk("cart/remove", async (data, { rejectWithValue }) => {
  try {
    return await apiRemoveFromCart(data);
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    const pending = (state) => {
      state.status = "loading";
    };

    const fulfilled = (state, action) => {
      state.cartItems = action.payload.cartItems || [];
      state.totalPrice = action.payload.totalPrice || 0;
      state.status = "succeeded";
    };

    const rejected = (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    };

    builder
      .addCase(getCart.pending, pending)
      .addCase(getCart.fulfilled, fulfilled)
      .addCase(getCart.rejected, rejected)

      .addCase(addToCart.fulfilled, fulfilled)
      .addCase(updateCartItem.fulfilled, fulfilled)
      .addCase(removeFromCart.fulfilled, fulfilled);
  },
});

export const selectCartItems = (state) => state.cart.cartItems;
export const selectTotalPrice = (state) => state.cart.totalPrice;

export default cartSlice.reducer;