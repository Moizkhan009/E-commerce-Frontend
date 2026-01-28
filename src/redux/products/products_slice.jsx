import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    
      
      name: '',
      category: '',
      brand: '',
      image: '',
      price: 0,
      originalPrice: 0,
      rating: 0,
      badge: '',
      badgeColor: ''
    
};

const productSlice = createSlice({
    name : "product",
    initialState,
    reducers:{
        addProduct : (state) => {
         

        }
    }
})