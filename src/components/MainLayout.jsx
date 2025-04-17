import { Outlet } from 'react-router-dom';
import { Header } from './Header/Header';

export const MainLayout = () => {
    return (
        <div className="container">
            <Header />
            <Outlet />
        </div>
    );
};