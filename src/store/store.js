import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice.js";
import bookReducer from './bookslice.js'
import wishlistReducer from './wishlistslice.js'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
    wishlist: wishlistReducer,
  },
});
