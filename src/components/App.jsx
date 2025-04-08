import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import RegisterPage from "./../pages/RegisterPage";
import LoginPage from "./../pages/LoginPage";
import { PrivateRoute } from "./PrivateRoute";
import { MainLayout } from "./../components/MainLayout/MainLayout";
import RecommendedPage from "./../pages/RecommendedPage";
import MyLibraryPage from "./../pages/MyLibraryPage";

function App() {
    return (
        <>
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
            <Toaster position="bottom-right" />
        </>
    );
}

export default App;
