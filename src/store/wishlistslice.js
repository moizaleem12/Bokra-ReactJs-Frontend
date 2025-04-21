// store/wishlistSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Add to wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (bookId, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/wishlist/${bookId}`);
      return res.data.wishlist.books;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Something went wrong");
    }
  }
);

// Remove from wishlist
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (bookId, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${API_BASE_URL}/wishlist/${bookId}`);
      return res.data.wishlist.books;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Something went wrong");
    }
  }
);

// Get wishlist
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/wishlist`);
      return res.data.wishlist.books;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Something went wrong");
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    books: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.books = action.payload;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.books = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
