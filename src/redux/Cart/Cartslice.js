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
//  ,


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
  reducers: {
  clearCart: (state) => {
    state.cartItems = [];
    state.totalPrice = 0;
    state.status = "idle";
    state.error = null;
  },
  reset:(state)=>{
    state.cartItems = [];
    state.totalPrice = 0;
    state.status = "idle";
    state.error = null;
  }

  },

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
export const { clearCart , reset } = cartSlice.actions;