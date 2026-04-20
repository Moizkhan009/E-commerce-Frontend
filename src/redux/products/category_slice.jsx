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
    },
    clearError: (state) => {
      state.error = null;
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
        state.error = action.payload || action.error.message;
      })
      
      // ============ ADD CATEGORY ============
      .addCase(addCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          state.categories.push(action.payload);
        }
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      
      // ============ UPDATE CATEGORY ============
      .addCase(updateCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.categories.findIndex(
          cat => cat._id === action.payload?._id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      
      // ============ DELETE CATEGORY ============
      .addCase(deleteCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = state.categories.filter(
          cat => cat._id !== action.payload
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      
      // ============ GET PRODUCTS BY CATEGORY ============
      .addCase(getProductsByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (Array.isArray(action.payload)) {
          state.categoryProducts = action.payload;
        } else if (action.payload?.products) {
          state.categoryProducts = action.payload.products;
        } else {
          state.categoryProducts = [];
        }
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
        state.categoryProducts = [];
      });
  },
});

export const { 
  setSelectedCategory, 
  clearCategoryProducts, 
  clearError 
} = categorySlice.actions;

export default categorySlice.reducer;