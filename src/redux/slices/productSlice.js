import { createSlice } from "@reduxjs/toolkit";

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

      localStorage.setItem("products", JSON.stringify(updatedProducts));
    },

    updateStock: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.products.find((product) => product.id === id);

      if (product) {
        product.stock -= quantity;
        if (product.stock < 0) product.stock = 0;

        localStorage.setItem("products", JSON.stringify(state.products));
      }
    },
  },
});

export const { setProducts, updateStock } = productSlice.actions;

export default productSlice.reducer;
