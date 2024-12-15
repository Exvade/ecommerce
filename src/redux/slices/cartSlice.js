import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        if (action.payload.quantity > 0) {
          state.items.push({ ...action.payload });
        }
      }
    },
    updateCartQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem && quantity > 0) {
        existingItem.quantity = quantity;
      }
    },
    removeSelectedItems: (state, action) => {
      const selectedIds = action.payload;
      state.items = state.items.filter(
        (item) => !selectedIds.includes(item.id)
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, updateCartQuantity, removeSelectedItems, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
