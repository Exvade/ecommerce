import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import cartSlice from "./slices/cartSlice";
import productSlice from "./slices/productSlice";
// Hapus stockSlice jika tidak diperlukan

const store = configureStore({
  reducer: {
    product: productSlice,
    cart: cartSlice,
    auth: authSlice,
  },
  devTools: process.env.NODE_ENV !== "production", // Aktifkan DevTools hanya di development
  // Tambahkan middleware tambahan jika diperlukan
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(/* middleware tambahan di sini */),
});

export default store;
