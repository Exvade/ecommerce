import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    { id: 1, name: "Product A", stock: 10 },
    { id: 2, name: "Product B", stock: 15 },
    { id: 3, name: "Product C", stock: 8 },
  ],
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    updateStock: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.products.find((product) => product.id === id);
      if (product && product.stock >= quantity) {
        product.stock -= quantity;
      } else {
        console.error("Stock tidak mencukupi!");
      }
    },
  },
});

export const { updateStock } = stockSlice.actions;

export default stockSlice.reducer;
