import { createAsyncThunk } from "@reduxjs/toolkit";

// ============ FETCH CATEGORIES ============
export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    try {
      const response = await fetch("http://localhost:5000/api/category/Get");
      console.log("Fetch Categories Response:", response);
       
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await response.json();
      console.log("Fetched Categories:", data);
      return data;
    } catch (error) {
      console.log("Fetch Categories Error:", error.message);
      throw error;
    }
  }
);

// ============ ADD CATEGORY ============
export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (categoryData) => {
    try {
      const response = await fetch("http://localhost:5000/api/category/addCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      console.log("Add Category Response:", response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add category");
      }

      const data = await response.json();
      console.log("Category Added Successfully:", data);
      return data.category;
    } catch (error) {
      console.log("Add Category Error:", error.message);
      throw error;
    }
  }
);

// ============ UPDATE CATEGORY ============
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, data }) => {
    try {
      const response = await fetch(`http://localhost:5000/api/categories/${id}`, {
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
      console.log("Category Updated Successfully:", result);
      return result.category;
    } catch (error) {
      console.log("Update Category Error:", error.message);
      throw error;
    }
  }
);

// ============ DELETE CATEGORY ============
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete category");
      }

      console.log("Category Deleted Successfully");
      return categoryId;
    } catch (error) {
      console.log("Delete Category Error:", error.message);
      throw error;
    }
  }
);

// ============ GET PRODUCTS BY CATEGORY ============
export const getProductsByCategory = createAsyncThunk(
  "category/getProductsByCategory",
  async (categoryName) => {
    try {
      // Products ko filter karo by category
      const response = await fetch("http://localhost:5000/api/getProduct");
      
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      
      // Filter products by category
      const products = data.products || data;
      const filteredProducts = products.filter(
        product => product.category === categoryName
      );
      
      console.log(`Products in ${categoryName}:`, filteredProducts);
      return { categoryName, products: filteredProducts };
    } catch (error) {
      console.log("Get Products By Category Error:", error.message);
      throw error;
    }
  }
);