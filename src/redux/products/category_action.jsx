import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/api/category";

// ============ FETCH CATEGORIES ============
export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching categories from:", `${API_URL}/categories`);
      const response = await fetch(`${API_URL}/categories`);
      
      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch categories`);
      }

      const data = await response.json();
      console.log("Fetched data:", data);
      
      // ✅ Handle different response structures
      if (data.categories && Array.isArray(data.categories)) {
        return data.categories;
      } else if (Array.isArray(data)) {
        return data;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Fetch Categories Error:", error);
      return rejectWithValue(error.message);
    }
  }
);

// ============ ADD CATEGORY ============
export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/addCategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add category");
      }

      const data = await response.json();
      return data.category || data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ============ UPDATE CATEGORY ============
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update category");
      }

      const result = await response.json();
      return result.category || result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ============ DELETE CATEGORY ============
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/categories/${categoryId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete category");
      }

      return categoryId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ============ GET PRODUCTS BY CATEGORY ============
export const getProductsByCategory = createAsyncThunk(
  "category/getProductsByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      console.log("Fetching products for category:", categoryId);
      const response = await fetch(`http://localhost:5000/api/products/category/${categoryId}`);
      
      console.log("Products response status:", response.status);

      if (!response.ok) {
        throw new Error("Failed to fetch category products");
      }

      const data = await response.json();
      console.log("Products data:", data);
      
      return data.products || data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);