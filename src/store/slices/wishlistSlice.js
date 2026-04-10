import { createSlice } from "@reduxjs/toolkit";

const saved = (() => {
  try { return JSON.parse(localStorage.getItem("wishlist") || "[]"); }
  catch { return []; }
})();

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { items: saved },
  reducers: {
    toggleWishlist(state, action) {
      const exists = state.items.find(i => i.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter(i => i.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export const selectWishlist = (state) => state.wishlist.items;
export default wishlistSlice.reducer;
