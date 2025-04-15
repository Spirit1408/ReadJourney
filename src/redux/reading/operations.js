import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBookById = createAsyncThunk(
	"reading/fetchBookById",
	async (bookId, { rejectWithValue }) => {
		try {
			const response = await axios.get(`/books/${bookId}`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);

export const startReading = createAsyncThunk(
	"reading/startReading",
	async ({ bookId, page }, { rejectWithValue }) => {
		try {
			const response = await axios.post("/books/reading/start", {
				id: bookId,
				page: page,
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);

export const finishReading = createAsyncThunk(
	"reading/finishReading",
	async ({ bookId, page }, { rejectWithValue }) => {
		try {
			const response = await axios.post("/books/reading/finish", {
				id: bookId,
				page: page,
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);

export const deleteReading = createAsyncThunk(
	"reading/deleteReading",
	async ({ bookId, readingId }, { rejectWithValue }) => {
		try {
			const response = await axios.delete(
				`/books/reading?bookId=${bookId}&readingId=${readingId}`,
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);
