// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { fetchDashboardStatsApi } from "./dashboardApi";

// // THUNK
// export const fetchDashboardStats = createAsyncThunk(
//   "dashboard/fetchStats",
//   async (_, thunkAPI) => {
//     try {
//       return await fetchDashboardStatsApi();
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// const dashboardSlice = createSlice({
//   name: "dashboard",
//   initialState: {
//     stats: {},
//     loading: false,
//     error: null,
//   },

//   reducers: {},

//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchDashboardStats.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchDashboardStats.fulfilled, (state, action) => {
//         state.loading = false;
//         state.stats = action.payload;
//       })
//       .addCase(fetchDashboardStats.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default dashboardSlice.reducer;
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { fetchDashboardStatsApi } from "./dashboardApi";

// // THUNK
// export const fetchDashboardStats = createAsyncThunk(
//   "dashboard/fetchStats",
//   async (_, thunkAPI) => {
//     try {
//       return await fetchDashboardStatsApi();
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// const dashboardSlice = createSlice({
//   name: "dashboard",
//   initialState: {
//     stats: {},
//     loading: false,
//     error: null,
//   },

//   reducers: {},

//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchDashboardStats.pending, (state) => {
//         state.loading = true;
//       })

//       .addCase(fetchDashboardStats.fulfilled, (state, action) => {
//         state.loading = false;
//         state.stats = action.payload;
//       })

//       .addCase(fetchDashboardStats.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default dashboardSlice.reducer;
// redux/features/dashboard/dashboardSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// API Calls
const fetchDashboardStats = async () => {
  const response = await axios.get(`${API_BASE_URL}/dashboard`);
  return response.data;
};

const fetchTopProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/dashboard`);
  return response.data.topProducts;
};

const fetchLowStockProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/dashboard`);
  return response.data.lowStockProducts;
};

const fetchInventorySummary = async () => {
  const response = await axios.get(`${API_BASE_URL}/dashboard`);
  return response.data.inventorySummary;
};

// THUNKS - Each with unique name
export const getDashboardStats = createAsyncThunk(
  "dashboard/getStats",  // Unique action type
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchDashboardStats();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch dashboard data"
      );
    }
  }
);

export const getTopProducts = createAsyncThunk(
  "dashboard/getTopProducts",  // Unique action type
  async (_, { rejectWithValue }) => {
    try {
      const topProducts = await fetchTopProducts();
      return topProducts;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch top products"
      );
    }
  }
);

export const getLowStockProducts = createAsyncThunk(
  "dashboard/getLowStockProducts",  // Unique action type
  async (_, { rejectWithValue }) => {
    try {
      const lowStockProducts = await fetchLowStockProducts();
      return lowStockProducts;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch low stock products"
      );
    }
  }
);

export const getInventorySummary = createAsyncThunk(
  "dashboard/getInventorySummary",  // Unique action type
  async (_, { rejectWithValue }) => {
    try {
      const inventorySummary = await fetchInventorySummary();
      return inventorySummary;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch inventory summary"
      );
    }
  }
);

const initialState = {
  stats: {
    totalCustomers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  },
  topProducts: [],
  lowStockProducts: [],
  inventorySummary: {
    totalStock: 0,
    lowStock: 0,
  },
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    resetDashboard: (state) => {
      return initialState;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Dashboard Stats (Full Data)
      .addCase(getDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats || initialState.stats;
        state.topProducts = action.payload.topProducts || [];
        state.lowStockProducts = action.payload.lowStockProducts || [];
        state.inventorySummary = action.payload.inventorySummary || initialState.inventorySummary;
      })
      .addCase(getDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Top Products Only
      .addCase(getTopProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTopProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.topProducts = action.payload;
      })
      .addCase(getTopProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Low Stock Products Only
      .addCase(getLowStockProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLowStockProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.lowStockProducts = action.payload;
      })
      .addCase(getLowStockProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Inventory Summary Only
      .addCase(getInventorySummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInventorySummary.fulfilled, (state, action) => {
        state.loading = false;
        state.inventorySummary = action.payload;
      })
      .addCase(getInventorySummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { resetDashboard, clearError } = dashboardSlice.actions;

// Export selectors
export const selectDashboardStats = (state) => state.dashboard.stats;
export const selectTopProducts = (state) => state.dashboard.topProducts;
export const selectLowStockProducts = (state) => state.dashboard.lowStockProducts;
export const selectInventorySummary = (state) => state.dashboard.inventorySummary;
export const selectDashboardLoading = (state) => state.dashboard.loading;
export const selectDashboardError = (state) => state.dashboard.error;

export default dashboardSlice.reducer;