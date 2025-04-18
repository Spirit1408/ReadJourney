import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { PrivateRoute } from "./PrivateRoute";
import { MainLayout } from "./MainLayout";
import { useDispatch, useSelector } from "react-redux";
import {
	selectIsRefreshing,
	selectToken,
	selectIsLoggedIn,
} from "../redux/auth/selectors";
import { refreshUser, initializeTokenRefresh } from "../redux/auth/operations";
import { Loader } from "./Loader/Loader";

const RegisterPage = lazy(() => import("./../pages/RegisterPage"));
const LoginPage = lazy(() => import("./../pages/LoginPage"));
const RecommendedPage = lazy(
	() => import("./../pages/RecommendedPage/RecommendedPage"),
);
const MyLibraryPage = lazy(
	() => import("./../pages/MyLibraryPage/MyLibraryPage"),
);
const ReadingPage = lazy(() => import("../pages/ReadingPage/ReadingPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

function App() {
	const dispatch = useDispatch();
	const isRefreshing = useSelector(selectIsRefreshing);
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const token = useSelector(selectToken);

	useEffect(() => {
		if (isLoggedIn) {
			initializeTokenRefresh(dispatch);
		}
	}, [dispatch, isLoggedIn]);

	useEffect(() => {
		if (isLoggedIn && token) {
			dispatch(refreshUser());
		}
	}, [dispatch, token, isLoggedIn]);

	return (
		<>
			{isRefreshing ? (
				<Loader />
			) : (
				<Suspense fallback={<Loader />}>
					<Routes>
						<Route path="/register" element={<RegisterPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route element={<PrivateRoute component={MainLayout} />}>
							<Route path="/" element={<Navigate to="/recommended" />} />
							<Route path="/recommended" element={<RecommendedPage />} />
							<Route path="/library" element={<MyLibraryPage />} />
							<Route path="/reading" element={<ReadingPage />} />
						</Route>
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</Suspense>
			)}
			<Toaster position="bottom-right" />
		</>
	);
}

export default App;
