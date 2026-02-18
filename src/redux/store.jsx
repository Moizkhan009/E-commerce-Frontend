import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../redux/products/products_slice";
import Categoryslice from "../redux/products/category_slice"

 const store = configureStore({
  reducer: {
    product: productSlice,
    category : Categoryslice
  },
});

export default store
