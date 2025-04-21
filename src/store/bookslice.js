import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch all books
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async ({ query = "", genre = "", page = 1, limit = 6 }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/books?page=${page}&limit=${limit}&title=${query}&genre=${genre}`
      );
      return {
        books: response.data.books,
        totalBooks: response.data.totalBooks,
        totalPages: response.data.totalPages,
      };
    } catch (error) {
      throw new Error("Failed to fetch books");
    }
  }
);

// Borrow a book
export const borrowBook = createAsyncThunk(
  "books/borrowBook",
  async (bookId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/books/borrow/${bookId}`,
        {}
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch borrowed books (paginated)
export const fetchBorrowedBooks = createAsyncThunk(
  "books/fetchBorrowedBooks",
  async ({ page = 1, limit = 6 }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/books/borrowed?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Return borrowed book
export const returnBook = createAsyncThunk(
  "books/returnBook",
  async (bookId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/books/return/${bookId}`,
        {}
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Rate book
export const rateBook = createAsyncThunk(
  "books/rateBook",
  async ({ bookId, userId, rating, review }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/books/ratebook/${bookId}`,
        { userId, rating, review }
      );
      return response.data.book;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    borrowedBooks: [],
    totalBooks: 0,
    totalPages: 0,
    totalBorrowed: 0,
    totalBorrowedPages: 0,
    currentBorrowedPage: 1,
    loading: false,
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    setBorrowedPage: (state, action) => {
      state.currentBorrowedPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload.books;
        state.totalBooks = action.payload.totalBooks;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(borrowBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(borrowBook.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBook = action.payload.book;
        const bookIndex = state.books.findIndex(
          (book) => book._id === updatedBook._id
        );
        if (bookIndex !== -1) {
          state.books[bookIndex] = updatedBook;
        }
      })
      .addCase(borrowBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.error.message;
      })

      .addCase(fetchBorrowedBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBorrowedBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.borrowedBooks = action.payload.books;
        state.totalBorrowed = action.payload.totalBooks;
        state.totalBorrowedPages = action.payload.totalPages;
      })
      .addCase(fetchBorrowedBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.error.message;
      })

      .addCase(returnBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(returnBook.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBook = action.payload.book;
        const bookIndex = state.books.findIndex(
          (book) => book._id === updatedBook._id
        );
        if (bookIndex !== -1) {
          state.books[bookIndex] = updatedBook;
        }
        state.borrowedBooks = state.borrowedBooks.filter(
          (book) => book._id !== updatedBook._id
        );
      })
      .addCase(returnBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.error.message;
      })

      .addCase(rateBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rateBook.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBook = action.payload;
        const index = state.books.findIndex(
          (book) => book._id === updatedBook._id
        );
        if (index !== -1) {
          state.books[index] = updatedBook;
        }
      })
      .addCase(rateBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.error.message;
      });
  },
});

export const { resetError, setBorrowedPage } = bookSlice.actions;
export default bookSlice.reducer;
