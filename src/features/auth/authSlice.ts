import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import users from "../../data/users.json";
import type { AuthState, LoginPayload } from "./types";
import { generateToken, saveTokenToLocalStorage } from "./services"; // Импорт на services.ts

const initialState: AuthState = {
  isAuthenticated: false,
  email: "",
  error: false,
};

// Create an async thunk for checking credentials and adding a token
export const checkCredAndAddToken = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    const user = users.find(
      user =>
        user.email === payload.email && user.password === payload.password,
    );

    if (user) {
      try {
        const token = await generateToken(user.email);
        saveTokenToLocalStorage(token);
        return { email: payload.email, token };
      } catch (error) {
        return rejectWithValue("Error generating token");
      }
    } else {
      return rejectWithValue("Invalid credentials");
    }
  },
);

// Create a slice for authentication
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginInitial: (state, action: PayloadAction<LoginPayload>) => {
      const user = users.find(
        user =>
          user.email === action.payload.email &&
          user.password === action.payload.password,
      );
      if (user) {
        state.isAuthenticated = true;
        state.email = action.payload.email;
        state.error = false;
      } else {
        state.error = true;
      }
    },
    logout: state => {
      state.isAuthenticated = false;
      state.email = "";
      state.error = false;
      localStorage.removeItem("authToken");
    },
    // Reducer logic for email validation
    validateEmail: (state, action: PayloadAction<string>) => {
      const user = users.find(user => user.email === action.payload);
      state.error = user ? false : true;
    },
  },
  extraReducers: builder => {
    // Handle additional action types here
    builder
      .addCase(checkCredAndAddToken.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.email = action.payload.email;
        state.error = false;
      })
      .addCase(checkCredAndAddToken.rejected, (state, action) => {
        state.error = true;
      });
  },
});

export const { loginInitial, logout, validateEmail } = authSlice.actions;
export default authSlice.reducer;
