import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export type TUser = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
};

type TAuthState = {
  user: TUser | null;
  token: string | null;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // set full user and token
    setUser: (state, action: PayloadAction<{ user: TUser; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    // remove only user but keep token
    clearUser: (state) => {
      state.user = null;
    },

    // remove only token but keep user
    clearToken: (state) => {
      state.token = null;
    },

    // clear everything (logout)
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

// Actions
export const { setUser, clearUser, clearToken, logout } = authSlice.actions;

// Reducer
export default authSlice.reducer;

// Selectors (normal functions, not hooks)
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectIsLoggedIn = (state: RootState) => Boolean(state.auth.token);
