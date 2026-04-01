// import { createSlice } from "@reduxjs/toolkit";
// import { fetchProduct } from "./products_action";

// const initialState = {
//   product: {
//     name: "",
//     category: "",
//     brand: "",
//     image: "",
//     price: 0,
//     originalPrice: 0,
//     rating: 0,
//     badge: "",
//     badgeColor: "",
//   },
//   status: "idle",
//   error: null,
// };

// const productSlice = createSlice({
//   name: "product",
//   initialState,
//   reducers: {
//     },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProduct.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(fetchProduct.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.product = action.payload;
//       })
//       .addCase(fetchProduct.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message; // 👈 from thrown error
//       });
//   },
// });

// export default productSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { fetchProduct, addProduct, deleteProduct } from "./products_action";

const initialState = {
  
products: [], // Products array - yahan sab products store honge
  
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
        state.products.push(action.payload);
        // Different API response structures ko handle karo
        if (Array.isArray(action.payload)) {
          // Agar direct array aaya
          state.products = action.payload;
        } else if (action.payload?.products && Array.isArray(action.payload.products)) {
          // Agar { products: [...] } format mein aaya
          state.products = action.payload.products;
        } else if (action.payload?.data && Array.isArray(action.payload.data)) {
          // Agar { data: [...] } format mein aaya
          state.products = action.payload.data;
        } else if (action.payload && typeof action.payload === 'object') {
          // Agar single product object aaya, usko array mein convert karo
          state.products = [action.payload];
        } else {
          state.products = [];
        }
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      
      // ============ ADD PRODUCT ============
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Naya product array mein add karo
        state.product.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      
      // ============ DELETE PRODUCT (BONUS) ============
      .addCase(deleteProduct.fulfilled, (state, action) => {
        // Product ko ID se filter karke remove karo
        state.product.products = state.product.products.filter(
          (product) => product._id !== action.payload && product.id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;