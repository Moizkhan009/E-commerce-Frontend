import { createSlice } from "@reduxjs/toolkit";
import { fetchProduct, addProduct, deleteProduct } from "./products_action";

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ============ FETCH PRODUCTS ============
      .addCase(fetchProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = "succeeded";

        const payload = action.payload;

        if (Array.isArray(payload)) {
          state.products = payload;
        } else if (payload?.products && Array.isArray(payload.products)) {
          state.products = payload.products;
        } else if (payload?.data && Array.isArray(payload.data)) {
          state.products = payload.data;
        } else if (payload && typeof payload === "object") {
          state.products = [payload];
        } else {
          state.products = [];
        }
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Something went wrong";
      })

      // ============ ADD PRODUCT ============
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = "succeeded";

        // Ensure products array exists
        if (!Array.isArray(state.products)) {
          state.products = [];
        }

        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Add product failed";
      })

      // ============ DELETE PRODUCT ============
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";

        const id = action.payload;

        state.products = state.products.filter(
          (product) => product._id !== id && product.id !== id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Delete failed";
      });
  },
});

export default productSlice.reducer;