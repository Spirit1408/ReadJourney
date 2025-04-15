import { configureStore } from "@reduxjs/toolkit";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/slice";
import { recommendedReducer } from "./recommended/slice";
import { libraryReducer } from "./library/slice";
import { readingReducer } from "./reading/slice";

const authPersistConfig = {
	key: "auth",
	storage,
	whitelist: ["token", "refreshToken", "isLoggedIn", "user"],
};

export const store = configureStore({
	reducer: {
		auth: persistReducer(authPersistConfig, authReducer),
		recommended: recommendedReducer,
		library: libraryReducer,
		reading: readingReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
			devTools: process.env.NODE_ENV === "development",
		}),
});

export const persistor = persistStore(store);
