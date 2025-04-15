import { createSlice } from "@reduxjs/toolkit";
import {
	fetchBookById,
	startReading,
	finishReading,
	deleteReading,
} from "./operations";

const initialState = {
	book: null,
	isLoading: false,
	error: null,
	activeReading: null,
	bookId: null,
	hasActiveSession: false,
};

const readingSlice = createSlice({
	name: "reading",
	initialState,
	reducers: {
		clearReadingState: (state) => {
			state.book = null;
			state.error = null;
			state.activeReading = null;
			state.bookId = null;
			state.hasActiveSession = false;
		},
		setBookId: (state, action) => {
			state.bookId = action.payload;
		},
		updateActiveSessionStatus: (state) => {
			if (state.book.progress.length > 0) {
				const activeSession = state.book.progress.find(
					(item) => item.status === "active",
				);
				state.hasActiveSession = !!activeSession;
				state.activeReading = activeSession || null;
			} else {
				state.hasActiveSession = false;
				state.activeReading = null;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBookById.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchBookById.fulfilled, (state, action) => {
				state.isLoading = false;
				state.book = action.payload;
				if (action.payload.progress && action.payload.progress.length > 0) {
					const activeSession = action.payload.progress.find(
						(item) => item.status === "active",
					);
					state.hasActiveSession = !!activeSession;
					state.activeReading = activeSession || null;
				} else {
					state.hasActiveSession = false;
					state.activeReading = null;
				}
			})
			.addCase(fetchBookById.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			.addCase(startReading.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(startReading.fulfilled, (state, action) => {
				state.isLoading = false;
				state.book = action.payload;
				if (action.payload.progress && action.payload.progress.length > 0) {
					const activeSession = action.payload.progress.find(
						(item) => item.status === "active",
					);
					state.hasActiveSession = !!activeSession;
					state.activeReading = activeSession || null;
				} else {
					state.hasActiveSession = false;
					state.activeReading = null;
				}
			})
			.addCase(startReading.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			.addCase(finishReading.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(finishReading.fulfilled, (state, action) => {
				state.isLoading = false;
				state.book = action.payload;
				state.activeReading = null;
				state.hasActiveSession = false;
			})
			.addCase(finishReading.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			.addCase(deleteReading.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(deleteReading.fulfilled, (state, action) => {
				state.isLoading = false;
				state.book = action.payload;
				if (action.payload.progress && action.payload.progress.length > 0) {
					const activeSession = action.payload.progress.find(
						(item) => item.status === "active",
					);
					state.hasActiveSession = !!activeSession;
					state.activeReading = activeSession || null;
				} else {
					state.hasActiveSession = false;
					state.activeReading = null;
				}
			})
			.addCase(deleteReading.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { clearReadingState, setBookId, updateActiveSessionStatus } =
	readingSlice.actions;
export const readingReducer = readingSlice.reducer;
