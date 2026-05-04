import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../redux/products/products_slice";
import Categoryslice from "../redux/products/category_slice"
// import cartReducer from "../redux/cart/cart_slice";
import cartReducer from "../redux/Cart/Cartslice";
import wishlistReducer from "../redux/Wishlist/wishlistSlice.js";

 const store = configureStore({
  reducer: {
    product: productSlice,
    category : Categoryslice,
    cart :cartReducer,
    //  cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export default store
