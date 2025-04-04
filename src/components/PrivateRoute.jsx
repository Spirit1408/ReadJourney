import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ component: Component }) => {
    const isAuthorised = true;

    return isAuthorised ? <Component /> : <Navigate to="/register" />;
};
