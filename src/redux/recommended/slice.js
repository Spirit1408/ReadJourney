import { createSlice } from "@reduxjs/toolkit";
import { fetchRecommendedBooks } from "./operations";

const initialState = {
	items: [],
	isLoading: false,
	error: null,
	totalPages: 0,
	currentPage: 1,
	perPage: 2,
	filters: {
		title: "",
		author: "",
	},
};

const recommendedSlice = createSlice({
	name: "recommended",
	initialState,
	reducers: {
		setPage: (state, action) => {
			state.currentPage = action.payload;
		},
		setFilters: (state, action) => {
			state.filters = action.payload;
			state.currentPage = 1;
		},
		resetFilters: (state) => {
			state.filters = initialState.filters;
			state.currentPage = 1;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRecommendedBooks.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchRecommendedBooks.fulfilled, (state, action) => {
				state.isLoading = false;
				state.items = action.payload.results;
				state.totalPages = action.payload.totalPages || 0;
				state.currentPage = action.payload.page || 1;
				state.perPage = action.payload.perPage || 2;
			})
			.addCase(fetchRecommendedBooks.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { setPage, setFilters, resetFilters } = recommendedSlice.actions;
export const recommendedReducer = recommendedSlice.reducer;
