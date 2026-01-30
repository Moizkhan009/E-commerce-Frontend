import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../redux/products/products_slice";

 const store = configureStore({
  reducer: {
    product: productSlice,
  },
});

export default store
