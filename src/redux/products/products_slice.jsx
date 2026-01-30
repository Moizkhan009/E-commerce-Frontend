import { createSlice } from "@reduxjs/toolkit";
import { fetchProduct } from "./products_action";

const initialState = {
  product: {
    name: "",
    category: "",
    brand: "",
    image: "",
    price: 0,
    originalPrice: 0,
    rating: 0,
    badge: "",
    badgeColor: "",
  },
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // 👈 from thrown error
      });
  },
});

export default productSlice.reducer;
