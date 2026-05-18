// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_URL = "http://localhost:5000/api/wishlist"; // backend URL 

// const getConfig = (getState) => {
//   const userInfo = JSON.parse(localStorage.getItem("userInfo"));

//   const token =
//     getState().auth?.user?.token || userInfo?.token;

//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
// };

// // OGGLE WISHLIST (Add/Remove)
// export const toggleWishlist = createAsyncThunk(
//   "wishlist/toggle",
//   async (productId, { getState, rejectWithValue }) => {
//     try {
//       const res = await axios.post(
//         `${API_URL}/`,
//         { productId },
//         getConfig(getState)
//       );
//       return { ...res.data, productId };
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// //  GET WISHLIST
// export const fetchWishlist = createAsyncThunk(
//   "wishlist/fetch",
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const res = await axios.get(`${API_URL}/get`, getConfig(getState));
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // CHECK SINGLE PRODUCT
// export const checkWishlist = createAsyncThunk(
//   "wishlist/check",
//   async (productId, { getState, rejectWithValue }) => {
//     try {
//       const res = await axios.get(
//         `${API_URL}/${productId}`,
//         getConfig(getState)
//       );
//       return { productId, inWishlist: res.data.inWishlist };
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// const wishlistSlice = createSlice({
//   name: "wishlist",
//   initialState: {
//     items: [],
//     checkMap: {}, // { productId: true/false }
//     loading: false,
//     error: null,
//     message: null,
//   },
//   reducers: {
//     clearWishlistMessage: (state) => {
// // state.whishlistMessage = null;
//       state.message = null;
//       state.error = null;
//     },
//     clearWishlist :(state)=>{
//       state.items = [];
//       state.checkMap = {};
//       // state.loading = false;
//       state.error = null;
//       state.message = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // TOGGLE
//       .addCase(toggleWishlist.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(toggleWishlist.fulfilled, (state, action) => {
//         state.loading = false;
//         state.message = action.payload.message;
//         const { productId, inWishlist } = action.payload;
//         state.checkMap[productId] = inWishlist;

//         // agar remove hua to list se nikal do
//         if (!inWishlist) {
//           state.items = state.items.filter(
//             (i) => i.product?._id !== productId && i._id !== productId
//           );
//         }
//       })
//       .addCase(toggleWishlist.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // FETCH
//       .addCase(fetchWishlist.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchWishlist.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchWishlist.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // CHECK
//       .addCase(checkWishlist.fulfilled, (state, action) => {
//         const { productId, inWishlist } = action.payload;
//         state.checkMap[productId] = inWishlist;
//       });
//   },
// });

// export const { clearWishlistMessage ,clearWishlist} = wishlistSlice.actions;
// export default wishlistSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/wishlist";

// 🔐 token helper
const getConfig = (getState) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const token =
    getState().auth?.user?.token || userInfo?.token;

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

//
// =======================
// TOGGLE WISHLIST
// =======================
export const toggleWishlist = createAsyncThunk(
  "wishlist/toggle",
  async (productId, { getState, rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_URL}/`,
        { productId },
        getConfig(getState)
      );

      return res.data; // clean return
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

//
// =======================
// FETCH WISHLIST
// =======================
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetch",
  async (_, { getState, rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${API_URL}/get`,
        getConfig(getState)
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

//
// =======================
// CHECK SINGLE PRODUCT
// =======================
export const checkWishlist = createAsyncThunk(
  "wishlist/check",
  async (productId, { getState, rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${API_URL}/${productId}`,
        getConfig(getState)
      );

      return {
        productId,
        inWishlist: res.data.inWishlist,
      };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

//
// =======================
// SLICE
// =======================
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    checkMap: {},
    loading: false,
    error: null,
    message: null,
  },

  reducers: {
    clearWishlistMessage: (state) => {
      state.message = null;
      state.error = null;
    },

    clearWishlist: (state) => {
      state.items = [];
      state.checkMap = {};
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =================
      // FETCH
      // =================
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;

        // 🔥 SAFE FIX (MOST IMPORTANT)
        state.items =
          action.payload?.wishlist ||
          action.payload?.data ||
          action.payload ||
          [];

        state.error = null;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =================
      // TOGGLE
      // =================
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        const { productId, inWishlist, item } = action.payload;

        state.message = action.payload.message;
        state.checkMap[productId] = inWishlist;

        // 🔥 REMOVE ITEM
        if (!inWishlist) {
          state.items = state.items.filter(
            (i) =>
              String(i._id || i.product?._id) !==
              String(productId)
          );
        }

        // 🔥 ADD ITEM (if backend sends item)
        if (inWishlist && item) {
          state.items.push(item);
        }
      })

      .addCase(toggleWishlist.rejected, (state, action) => {
        state.error = action.payload;
      })

      // =================
      // CHECK
      // =================
      .addCase(checkWishlist.fulfilled, (state, action) => {
        const { productId, inWishlist } = action.payload;
        state.checkMap[productId] = inWishlist;
      });
  },
});

export const {
  clearWishlist,
  clearWishlistMessage,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;