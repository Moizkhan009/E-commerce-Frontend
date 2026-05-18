// import { createSlice } from "@reduxjs/toolkit";
// import { fetchProduct, addProduct, deleteProduct,fetchProductsBySection } from "./products_action";

// const initialState = {
//   products: [],
//   sections:{},
//   status: "idle",
//   error: null,
// };

// const productSlice = createSlice({
//   name: "product",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder

//       .addCase(fetchProduct.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(fetchProduct.fulfilled, (state, action) => {
//         state.status = "succeeded";

//         const payload = action.payload;

//         if (Array.isArray(payload)) {
//           state.products = payload;
//         } else if (payload?.products && Array.isArray(payload.products)) {
//           state.products = payload.products;
//         } else if (payload?.data && Array.isArray(payload.data)) {
//           state.products = payload.data;
//         } else if (payload && typeof payload === "object") {
//           state.products = [payload];
//         } else {
//           state.products = [];
//         }
//       })
//       .addCase(fetchProduct.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error?.message || "Something went wrong";
//       })

//       // ============ ADD PRODUCT ============
//       .addCase(addProduct.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(addProduct.fulfilled, (state, action) => {
//         state.status = "succeeded";

//         // Ensure products array exists
//         if (!Array.isArray(state.products)) {
//           state.products = [];
//         }

//         state.products.push(action.payload);
//       })
//       .addCase(addProduct.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error?.message || "Add product failed";
//       })

//       // ============ DELETE PRODUCT ============
//       .addCase(deleteProduct.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(deleteProduct.fulfilled, (state, action) => {
//         state.status = "succeeded";

//         const id = action.payload;

//         state.products = state.products.filter(
//           (product) => product._id !== id && product.id !== id
//         );
//       })
//       .addCase(deleteProduct.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error?.message || "Delete failed";
//       })
// // .addCase(fetchProductsBySection.fulfilled, (state, action) => {
// //   const { section, products } = action.payload;
// //   state.sections[section] = products;tate.section[section] = products;
// //       });
// // products_slice.jsx
// .addCase(fetchProductsBySection.fulfilled, (state, action) => {
//   const { section, products, count, success } = action.payload;
  
//   // ✅ Ensure sections object exists
//   if (!state.sections) {
//     state.sections = {};
//   }
  
//   // ✅ Store products in sections object
//   state.sections[section] = Array.isArray(products) ? products : [];
//   state.status = "succeeded";
  
//   // console.log(`✅ Loaded ${products.length} products for section: ${section}`);
// })
// .addCase(fetchProductsBySection.pending, (state) => {
//   state.status = "loading";
//   state.error = null;
// })
// .addCase(fetchProductsBySection.rejected, (state, action) => {
//   state.status = "failed";
//   state.error = action.payload || action.error?.message;
//   console.error('Failed to fetch section:', action.error);
// });  
//   },
  
// });


// export default productSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { fetchProduct, addProduct, deleteProduct, fetchProductsBySection } from "./products_action";

const initialState = {
  products: [],
  sections: {},
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // Local stock decrease (when order placed)
    decreaseStock: (state, action) => {
      const { productId, quantity } = action.payload;
      
      // Update in main products array
      const productInMain = state.products.find(p => p._id === productId);
      if (productInMain) {
        productInMain.countInStock -= quantity;
      }
      
      // Update in all sections
      if (state.sections) {
        Object.keys(state.sections).forEach(section => {
          const productInSection = state.sections[section].find(p => p._id === productId);
          if (productInSection) {
            productInSection.countInStock -= quantity;
          }
        });
      }
    },
    
    // Local stock increase (when order cancelled)
    increaseStock: (state, action) => {
      const { productId, quantity } = action.payload;
      
      // Update in main products array
      const productInMain = state.products.find(p => p._id === productId);
      if (productInMain) {
        productInMain.countInStock += quantity;
      }
      
      // Update in all sections
      if (state.sections) {
        Object.keys(state.sections).forEach(section => {
          const productInSection = state.sections[section].find(p => p._id === productId);
          if (productInSection) {
            productInSection.countInStock += quantity;
          }
        });
      }
    },
    
    // Update single product stock
    updateProductStock: (state, action) => {
      const { productId, newStock } = action.payload;
      
      const product = state.products.find(p => p._id === productId);
      if (product) {
        product.countInStock = newStock;
      }
      
      if (state.sections) {
        Object.keys(state.sections).forEach(section => {
          const sectionProduct = state.sections[section].find(p => p._id === productId);
          if (sectionProduct) {
            sectionProduct.countInStock = newStock;
          }
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder

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
        
        // Also remove from sections
        if (state.sections) {
          Object.keys(state.sections).forEach(section => {
            state.sections[section] = state.sections[section].filter(
              (product) => product._id !== id && product.id !== id
            );
          });
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Delete failed";
      })
      
      // ============ FETCH BY SECTION ============
      .addCase(fetchProductsBySection.fulfilled, (state, action) => {
        const { section, products, count, success } = action.payload;
        
        if (!state.sections) {
          state.sections = {};
        }
        
        state.sections[section] = Array.isArray(products) ? products : [];
        state.status = "succeeded";
      })
      .addCase(fetchProductsBySection.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductsBySection.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error?.message;
        console.error('Failed to fetch section:', action.error);
      });  
  },
});

// Export actions
export const { decreaseStock, increaseStock, updateProductStock } = productSlice.actions;

export default productSlice.reducer;