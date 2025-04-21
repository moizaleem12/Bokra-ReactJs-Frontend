import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch current logged-in user
export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const res = await fetch(`${API_BASE_URL}/user/me`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("No user found");
  return await res.json();
});

// Logout user
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  const res = await fetch(`${API_BASE_URL}/user/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Logout failed");
  return true;
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
