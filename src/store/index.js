import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartslice";
import authReducer from "./slices/authslice";
import wishlistReducer from "./slices/wishlistslice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
  },
});