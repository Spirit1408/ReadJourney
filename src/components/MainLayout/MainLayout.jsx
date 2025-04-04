import { Header } from '../Header/Header';
import css from './MainLayout.module.css'

export const MainLayout = () => {
    return <div className={css.layout}>
        <Header />
    </div>;
}