import css from './Dashboard.module.css'

export const Dashboard = ({ children }) => {
    return <div className={css.dash}>{children}</div>;
}