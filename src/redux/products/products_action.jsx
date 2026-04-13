// import { createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchProduct = createAsyncThunk(
//   "product/fetchProduct",
//   async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/getProduct");
//        console.log( "response from action"  ,response);
       
//       if (!response.ok) {
//         console.log("API Error: Failed to fetch product");
//         throw new Error("Failed to fetch product");
//       }

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.log("Fetch Product Error:", error.message);
//       throw error; // Redux will handle rejected state
//     }
//   },
// );


import { createAsyncThunk } from "@reduxjs/toolkit";

// ============ FETCH PRODUCTS ============
export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async () => {
    console.log("run");
    
    try {
      const response = await fetch("http://localhost:5000/api/getProduct");
      console.log("response from action", response);
       
      if (!response.ok) {
        console.log("API Error: Failed to fetch product");
        throw new Error("Failed to fetch product");
      }

      const data = await response.json();
      console.log("Fetched Products:", data);
      return data; // { success: true, count: X, products: [...] }
    } catch (error) {
      console.log("Fetch Product Error:", error.message);
      throw error;
    }
  }
);

// ============ ADD PRODUCT ============
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (productData) => {
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      console.log("Add Product Response:", response);

      if (!response.ok) {
        const errorData = await response.json();
        console.log("API Error:", errorData.message);
        throw new Error(errorData.message || "Failed to add product");
      }

      const data = await response.json();
      console.log("Product Added Successfully:", data);
      return data.product; // Return only the product object
    } catch (error) {
      console.log("Add Product Error:", error.message);
      throw error;
    }
  }
);

// ============ DELETE PRODUCT (Optional - add backend route if needed) ============
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/deleteProduct/${productId}`, {
        method: "DELETE",
      });

      console.log("Delete Product Response:", response);

      if (!response.ok) {
        const errorData = await response.json();
        console.log("API Error:", errorData.message);
        throw new Error(errorData.message || "Failed to delete product");
      }

      const data = await response.json();
      console.log("Product Deleted Successfully:", data);
      return productId; // Return ID to remove from state
    } catch (error) {
      console.log("Delete Product Error:", error.message);
      throw error;
    }
  }
);