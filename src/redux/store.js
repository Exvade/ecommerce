import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import cartSlice from "./slices/cartSlice";
import productSlice from "./slices/productSlice";
import stockSlice from "./slices/stockSlice"; // Tambahkan stockSlice

const store = configureStore({
  reducer: {
    product: productSlice,
    cart: cartSlice,
    auth: authSlice,
    stock: stockSlice, // Tambahkan ke reducer
  },
});

export default store;
