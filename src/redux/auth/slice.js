import { createSlice } from "@reduxjs/toolkit";
import {
    registerUser,
    login,
    logout,
    refreshUser,
    refreshToken,
} from "./operations";

const initialState = {
    user: { name: null, email: null },
    token: null,
    refreshToken: null,
    isLoggedIn: false,
    isLoading: false,
    isRefreshing: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = {
                    name: action.payload.name,
                    email: action.payload.email,
                };
                state.token = action.payload.token;
                state.refreshToken = action.payload.refreshToken;
                state.isLoggedIn = true;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })

            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = {
                    name: action.payload.name,
                    email: action.payload.email,
                };
                state.token = action.payload.token;
                state.refreshToken = action.payload.refreshToken;
                state.isLoggedIn = true;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(logout.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = { name: null, email: null };
                state.token = null;
                state.refreshToken = null;
                state.isLoggedIn = false;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.user = { name: null, email: null };
                state.token = null;
                state.refreshToken = null;
                state.isLoggedIn = false;
                state.error = action.payload;
            })

            .addCase(refreshUser.pending, (state) => {
                state.isRefreshing = true;
                state.error = null;
            })
            .addCase(refreshUser.fulfilled, (state, action) => {
                state.user = {
                    name: action.payload.name,
                    email: action.payload.email,
                };
                state.isLoggedIn = true;
                state.isRefreshing = false;
                state.error = null;
            })
            .addCase(refreshUser.rejected, (state, action) => {
                state.isRefreshing = false;
                state.error = action.payload;
            })

            .addCase(refreshToken.pending, (state) => {
                state.isRefreshing = true;
                state.error = null;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.refreshToken = action.payload.refreshToken;
                state.isRefreshing = false;
                state.error = null;
            })
            .addCase(refreshToken.rejected, (state, action) => {
                state.isRefreshing = false;
                state.error = action.payload;
            });
    },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
