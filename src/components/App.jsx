import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import RegisterPage from "./../pages/RegisterPage";
import LoginPage from "./../pages/LoginPage";
import { PrivateRoute } from "./PrivateRoute";
import { MainLayout } from "./../components/MainLayout/MainLayout";
import RecommendedPage from "./../pages/RecommendedPage/RecommendedPage";
import MyLibraryPage from "./../pages/MyLibraryPage/MyLibraryPage";
import ReadingPage from "../pages/ReadingPage/ReadingPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import { useDispatch, useSelector } from "react-redux";
import {
	selectIsRefreshing,
	selectToken,
	selectIsLoggedIn,
} from "../redux/auth/selectors";
import { refreshUser, initializeTokenRefresh } from "../redux/auth/operations";
import { useEffect } from "react";
import { Loader } from "./Loader/Loader";

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
			)}
			<Toaster position="bottom-right" />
		</>
	);
}

export default App;
