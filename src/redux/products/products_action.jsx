import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getProduct");

      if (!response.ok) {
        console.log("API Error: Failed to fetch product");
        throw new Error("Failed to fetch product");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Fetch Product Error:", error.message);
      throw error; // Redux will handle rejected state
    }
  },
);
