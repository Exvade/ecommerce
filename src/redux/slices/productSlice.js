import { createSlice } from "@reduxjs/toolkit";

// Ambil data dari localStorage jika tersedia
const localStorageProducts = JSON.parse(localStorage.getItem("products")) || [];

const initialState = {
  products: localStorageProducts,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      const updatedProducts = action.payload.map((product) => ({
        ...product,
        stock:
          state.products.find((p) => p.id === product.id)?.stock ||
          product.stock ||
          20,
      }));
      state.products = updatedProducts;

      // Simpan ke localStorage
      localStorage.setItem("products", JSON.stringify(updatedProducts));
    },

    // Mengupdate stok produk
    updateStock: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.products.find((product) => product.id === id);

      if (product) {
        product.stock -= quantity; // Kurangi stok
        if (product.stock < 0) product.stock = 0; // Hindari stok negatif

        // Simpan perubahan ke localStorage
        localStorage.setItem("products", JSON.stringify(state.products));
      }
    },
  },
});

export const { setProducts, updateStock } = productSlice.actions;

export default productSlice.reducer;
