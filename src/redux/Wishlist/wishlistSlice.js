import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/wishlist"; // backend URL 
// 🔑 Helper: token header
const getConfig = (getState) => {
  const token = getState().auth?.user?.token || localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// OGGLE WISHLIST (Add/Remove)
export const toggleWishlist = createAsyncThunk(
  "wishlist/toggle",
  async (productId, { getState, rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_URL}/`,
        { productId },
        getConfig(getState)
      );
      return { ...res.data, productId };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

//  GET WISHLIST
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetch",
  async (_, { getState, rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/get`, getConfig(getState));
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// CHECK SINGLE PRODUCT
export const checkWishlist = createAsyncThunk(
  "wishlist/check",
  async (productId, { getState, rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${API_URL}/${productId}`,
        getConfig(getState)
      );
      return { productId, inWishlist: res.data.inWishlist };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    checkMap: {}, // { productId: true/false }
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearWishlistMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // TOGGLE
      .addCase(toggleWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        const { productId, inWishlist } = action.payload;
        state.checkMap[productId] = inWishlist;

        // agar remove hua to list se nikal do
        if (!inWishlist) {
          state.items = state.items.filter(
            (i) => i.product?._id !== productId && i._id !== productId
          );
        }
      })
      .addCase(toggleWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CHECK
      .addCase(checkWishlist.fulfilled, (state, action) => {
        const { productId, inWishlist } = action.payload;
        state.checkMap[productId] = inWishlist;
      });
  },
});

export const { clearWishlistMessage } = wishlistSlice.actions;
export default wishlistSlice.reducer;