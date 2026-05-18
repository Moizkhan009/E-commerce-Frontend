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





// export const fetchProductsBySection = createAsyncThunk(
//   'products/fetchBySection',
//   async (section, { rejectWithValue }) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/product/section/${section}`);
//       const data = await res.json();
//       return { section, products: data.data };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
// products_action.jsx
export const fetchProductsBySection = createAsyncThunk(
  'products/fetchBySection',
  async (section, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:5000/api/product/section/${section}`);
      const data = await res.json();
     
      return { 
        section, 
        products: data.products || [],  // data.products hai array
        success: data.success,
        count: data.count
      };
    } catch (error) {
      console.error('Error fetching section:', error);
      return rejectWithValue(error.message);
    }
  }
);

//  FETCH PRODUCTS 
export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async () => {
    console.log("run");
    
    try {
      const response = await fetch("http://localhost:5000/api/Product/get");
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

//  ADD PRODUCT 
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (productData) => {
    try {
      const response = await fetch("http://localhost:5000/api/product", {
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

//  DELETE PRODUCT 
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/delete/${productId}`, {
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
// UPDATE PRODUCT 
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ productId, productData }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/product/update/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      console.log("Update Product Response:", response);

      if (!response.ok) {
        const errorData = await response.json();

        console.log("API Error:", errorData.message);

        throw new Error(
          errorData.message || "Failed to update product"
        );
      }

      const data = await response.json();

      console.log("Product Updated Successfully:", data);

      return data.product;
    } catch (error) {
      console.log("Update Product Error:", error.message);

      throw error;
    }
  }
);