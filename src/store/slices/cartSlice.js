import { createSlice } from "@reduxjs/toolkit";

const saved = (() => {
  try { return JSON.parse(localStorage.getItem("cart") || "[]"); }
  catch { return []; }
})();

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: saved },
  reducers: {
    addToCart(state, action) {
      const exists = state.items.find(i => i.id === action.payload.id);
      if (exists) {
        exists.qty += 1;
      } else {
        state.items.push({ ...action.payload, qty: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    updateQty(state, action) {
      const { id, qty } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) item.qty = qty;
      state.items = state.items.filter(i => i.qty > 0);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart(state) {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, updateQty, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.price * i.qty, 0);
export const selectCartCount = (state) =>
    state.cart.items.reduce((sum, i) => sum + i.qty, 0);

export default cartSlice.reducer;
