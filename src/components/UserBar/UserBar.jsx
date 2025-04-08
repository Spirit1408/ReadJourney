import css from './UserBar.module.css'
import { useSelector } from 'react-redux';
import { selectUser } from "./../../redux/auth/selectors";

export const UserBar = () => {
    const user = useSelector(selectUser);

    return <div className={css.userBar}>{user.name[0]}</div>;
}