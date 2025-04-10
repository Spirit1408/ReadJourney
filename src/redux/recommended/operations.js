import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRecommendedBooks = createAsyncThunk(
    "recommended/fetchRecommendedBooks",
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const { currentPage, perPage, filters } = state.recommended;
			const { token } = state.auth;

			if (!token) {
				return thunkAPI.rejectWithValue("No token found");
			}

			axios.defaults.headers.common.Authorization = `Bearer ${token}`;

            const params = {
                page: currentPage,
                limit: perPage,
                ...filters,
            };
			
            const response = await axios.get("/books/recommend", { params });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
