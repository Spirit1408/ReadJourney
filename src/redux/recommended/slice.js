import { createSlice } from "@reduxjs/toolkit";
import {
	fetchRecommendedBooks,
	fetchRandomRecommendedBooks,
} from "./operations";

const initialState = {
	items: [],
	randomItems: [],
	isLoading: false,
	isRandomLoading: false,
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
		setPerPage: (state, action) => {
			state.perPage = action.payload;
			state.currentPage = 1;
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
			})
			.addCase(fetchRecommendedBooks.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(fetchRandomRecommendedBooks.pending, (state) => {
				state.isRandomLoading = true;
				state.error = null;
			})
			.addCase(fetchRandomRecommendedBooks.fulfilled, (state, action) => {
				state.isRandomLoading = false;
				state.randomItems = action.payload.results;
			})
			.addCase(fetchRandomRecommendedBooks.rejected, (state, action) => {
				state.isRandomLoading = false;
				state.error = action.payload;
			});
	},
});

export const { setPage, setPerPage, setFilters, resetFilters } =
	recommendedSlice.actions;
export const recommendedReducer = recommendedSlice.reducer;
