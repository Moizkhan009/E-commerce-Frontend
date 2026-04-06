import { createSlice } from "@reduxjs/toolkit";
import { 
  fetchCategories, 
  addCategory, 
  updateCategory, 
  deleteCategory,
  getProductsByCategory 
} from "./category_action";

const initialState = {
  categories: [],

  selectedCategory: null,
  categoryProducts: [],
  status: "idle",
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearCategoryProducts: (state) => {
      state.categoryProducts = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // ============ FETCH CATEGORIES ============
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        
        // Handle different response formats
        if (Array.isArray(action.payload)) {
          state.categories = action.payload;
        } else if (action.payload?.categories) {
          state.categories = action.payload.categories;
        } else {
          state.categories = [];
        }
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      
      // ============ ADD CATEGORY ============
      .addCase(addCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      
      // ============ UPDATE CATEGORY ============
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          cat => cat._id === action.payload._id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      
      // ============ DELETE CATEGORY ============
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          cat => cat._id !== action.payload && cat.id !== action.payload
        );
      })
      
      // ============ GET PRODUCTS BY CATEGORY ============
      .addCase(getProductsByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        
        state.categoryProducts = action.payload.products;
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCategory, clearCategoryProducts } = categorySlice.actions;
export default categorySlice.reducer;