import { createSlice } from "@reduxjs/toolkit";
import { addBook, addBookById, removeBook, fetchOwnBooks } from "./operations";

const initialState = {
	books: [],
	isLoading: false,
	error: null,
	currentStatus: "all",
};

const librarySlice = createSlice({
	name: "library",
	initialState,
	reducers: {
		setCurrentStatus: (state, action) => {
			state.currentStatus = action.payload;
		},
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addBook.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(addBook.fulfilled, (state, action) => {
				state.isLoading = false;
				state.books.push(action.payload);
			})
			.addCase(addBook.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			.addCase(addBookById.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(addBookById.fulfilled, (state, action) => {
				state.isLoading = false;
				state.books.push(action.payload);
			})
			.addCase(addBookById.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			.addCase(removeBook.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(removeBook.fulfilled, (state, action) => {
				state.isLoading = false;
				state.books = state.books.filter((book) => book._id !== action.payload);
			})
			.addCase(removeBook.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			.addCase(fetchOwnBooks.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchOwnBooks.fulfilled, (state, action) => {
				state.isLoading = false;
				state.books = action.payload;
			})
			.addCase(fetchOwnBooks.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { setCurrentStatus, clearError } = librarySlice.actions;
export const libraryReducer = librarySlice.reducer;
