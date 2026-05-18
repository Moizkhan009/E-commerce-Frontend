import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchCustomersApi } from "./customerApi";

// FETCH CUSTOMERS
export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",

  async (_, thunkAPI) => {

    try {

      return await fetchCustomersApi();

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        error.message
      );
    }
  }
);

const customerSlice = createSlice({

  name: "customers",

  initialState: {
    customers: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {

    builder

      // PENDING
      .addCase(fetchCustomers.pending, (state) => {

        state.loading = true;
        state.error = null;

      })

      // SUCCESS
      .addCase(fetchCustomers.fulfilled, (state, action) => {

        state.loading = false;

        state.customers = action.payload;

      })

      // ERROR
      .addCase(fetchCustomers.rejected, (state, action) => {

        state.loading = false;

        state.error = action.payload;

      });
  },
});

export default customerSlice.reducer;