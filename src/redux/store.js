import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice"; // Tambahkan authSlice
import cartSlice from "./slices/cartSlice";
import productSlice from "./slices/productSlice";

const store = configureStore({
  reducer: {
    product: productSlice,
    cart: cartSlice,
    auth: authSlice, // Tambahkan ke reducer
  },
});

export default store;
