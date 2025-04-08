import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import RegisterPage from "./../pages/RegisterPage";
import LoginPage from "./../pages/LoginPage";
import { PrivateRoute } from "./PrivateRoute";
import { MainLayout } from "./../components/MainLayout/MainLayout";
import RecommendedPage from "./../pages/RecommendedPage";
import MyLibraryPage from "./../pages/MyLibraryPage";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing, selectToken } from "../redux/auth/selectors";
import { refreshToken, refreshUser } from "../redux/auth/operations";
import { useEffect } from "react";

function App() {
    const dispatch = useDispatch();
    const isRefreshing = useSelector(selectIsRefreshing);
    const token = useSelector(selectToken);

    useEffect(() => {
        if (token) {
            dispatch(refreshUser());
        }
    }, [dispatch, token]);

    const handleTokenRefresh = () => {
        dispatch(refreshToken());
    };

    useEffect(() => {
        if (token) {
            const refreshInterval = setInterval(
                handleTokenRefresh,
                55 * 60 * 1000
            );
            return () => clearInterval(refreshInterval);
        }
    }, [token]);

    return (
        <>
            {isRefreshing ? (
                <div>Loading...</div>
            ) : (
                <Routes>
                    <Route
                        path="/register"
                        element={<RegisterPage />}
                    />
                    <Route
                        path="/login"
                        element={<LoginPage />}
                    />
                    <Route element={<PrivateRoute component={MainLayout} />}>
                        <Route
                            path="/"
                            element={<Navigate to="/recommended" />}
                        />
                        <Route
                            path="/recommended"
                            element={<RecommendedPage />}
                        />
                        <Route
                            path="/library"
                            element={<MyLibraryPage />}
                        />
                    </Route>
                    <Route
                        path="*"
                        element={<h1>404</h1>}
                    />
                </Routes>
            )}
            <Toaster position="bottom-right" />
        </>
    );
}

export default App;
