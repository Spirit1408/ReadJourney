import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const setAuthHeader = (token) => {
	axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const addBook = createAsyncThunk(
	"library/addBook",
	async (bookData, thunkAPI) => {
		try {
			const state = thunkAPI.getState();
			const { token } = state.auth;

			if (!token) {
				return thunkAPI.rejectWithValue("No token found");
			}

			setAuthHeader(token);

			const response = await axios.post("/books/add", bookData);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

export const addBookById = createAsyncThunk(
	"library/addBookById",
	async (bookId, thunkAPI) => {
		try {
			const state = thunkAPI.getState();
			const { token } = state.auth;

			if (!token) {
				return thunkAPI.rejectWithValue("No token found");
			}

			setAuthHeader(token);

			const response = await axios.post(`/books/add/${bookId}`);
			const newBook = response.data;

			const bookExists = state.library.books.some(
				(book) =>
					book.title === newBook.title && book.author === newBook.author,
			);

			if (bookExists) {
				try {
					await axios.delete(`/books/remove/${newBook._id}`);
				} catch (error) {
					console.error("Failed to remove duplicate book:", error);
				}

				return thunkAPI.rejectWithValue("Book already exists in your library");
			}

			return newBook;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

export const removeBook = createAsyncThunk(
	"library/removeBook",
	async (bookId, thunkAPI) => {
		try {
			const state = thunkAPI.getState();
			const { token } = state.auth;

			if (!token) {
				return thunkAPI.rejectWithValue("No token found");
			}

			setAuthHeader(token);

			await axios.delete(`/books/remove/${bookId}`);
			return bookId;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

export const fetchOwnBooks = createAsyncThunk(
	"library/fetchOwnBooks",
	async (status, thunkAPI) => {
		try {
			const state = thunkAPI.getState();
			const { token } = state.auth;

			if (!token) {
				return thunkAPI.rejectWithValue("No token found");
			}

			setAuthHeader(token);

			const params = status && status !== "all" ? { status } : {};
			const response = await axios.get("/books/own", { params });
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);
