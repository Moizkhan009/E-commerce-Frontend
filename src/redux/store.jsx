// import { configureStore } from "@reduxjs/toolkit";
// import productSlice from "../redux/products/products_slice";
// import Categoryslice from "../redux/products/category_slice"
// // import cartReducer from "../redux/cart/cart_slice";
// import cartReducer from "../redux/Cart/Cartslice";
//  const store = configureStore({
//   reducer: {
//     product: productSlice,
//     category : Categoryslice,
//     cart :cartReducer,
//     //  cart: cartReducer,
//     wishlist: wishlistReducer,
//   },
  
// });


// export default store
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import productSlice from "../redux/products/products_slice";
import Categoryslice from "../redux/products/category_slice";
import cartReducer from "../redux/Cart/Cartslice";
import wishlistReducer from "../redux/Wishlist/wishlistSlice";
import customerReducer from"../redux/Coustomers/customerSlice";
import dashboardReducer from "../redux/Dashboard/dashboardSlice";


import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// combine reducers
const rootReducer = combineReducers({
  product: productSlice,
  category: Categoryslice,
  cart: cartReducer,
  wishlist: wishlistReducer,
  customers: customerReducer,
  dashboard: dashboardReducer,
});

// persist config
const persistConfig = {
  key: "root",
  storage,
blacklist:["cart","wishlist"] 
};

// persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

//  store
const store = configureStore({
  reducer: persistedReducer,


  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// persistor export
export const persistor = persistStore(store);

export default store;