import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.map((product) => ({
        ...product,
        quantity: 20,
      }));
    },
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
