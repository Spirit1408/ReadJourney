import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://readjourney.b.goit.study/api";

const setAuthHeader = (token) => {
	axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const clearAuthHeader = () => {
	axios.defaults.headers.common["Authorization"] = "";
};

let refreshTokenFunction = null;

axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			refreshTokenFunction &&
			!originalRequest.url?.includes("/users/current/refresh")
		) {
			originalRequest._retry = true;

			try {
				await refreshTokenFunction();

				return axios(originalRequest);
			} catch (refreshError) {
				return Promise.reject(error);
			}
		}

		return Promise.reject(error);
	},
);

export const registerUser = createAsyncThunk(
	"auth/register",
	async (credentials, thunkAPI) => {
		try {
			const response = await axios.post("/users/signup", credentials);
			setAuthHeader(response.data.token);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

export const login = createAsyncThunk(
	"auth/login",
	async (credentials, thunkAPI) => {
		try {
			const response = await axios.post("/users/signin", credentials);
			setAuthHeader(response.data.token);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
	try {
		await axios.post("/users/signout");
		clearAuthHeader();
		return {};
	} catch (error) {
		clearAuthHeader();
		return thunkAPI.rejectWithValue(error.message);
	}
});

export const refreshUser = createAsyncThunk(
	"auth/refresh",
	async (_, thunkAPI) => {
		const state = thunkAPI.getState();
		const persistedToken = state.auth.token;

		if (!persistedToken) {
			return thunkAPI.rejectWithValue("Unable to fetch user");
		}

		try {
			setAuthHeader(persistedToken);
			const response = await axios.get("/users/current");
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

export const refreshToken = createAsyncThunk(
	"auth/refreshToken",
	async (_, thunkAPI) => {
		const state = thunkAPI.getState();
		const persistedRefreshToken = state.auth.refreshToken;

		if (!persistedRefreshToken) {
			return thunkAPI.rejectWithValue("No refresh token available");
		}

		try {
			const response = await axios.get("/users/current/refresh", {
				headers: {
					Authorization: `Bearer ${persistedRefreshToken}`,
				},
			});
			setAuthHeader(response.data.token);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

// Функция для инициализации обновления токена
export const initializeTokenRefresh = (dispatch) => {
	refreshTokenFunction = async () => {
		try {
			await dispatch(refreshToken()).unwrap();
			return true;
		} catch (error) {
			return false;
		}
	};
};
