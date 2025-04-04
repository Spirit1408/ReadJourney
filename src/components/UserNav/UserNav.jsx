import css from "./UserNav.module.css";
import { NavLink } from "react-router-dom";

export const UserNav = () => {
    return (
        <nav className={css.nav}>
            <ul className={css.navList}>
                <li className={css.navItem}>
                    <NavLink
                        to="/recommended"
                        className={({ isActive }) =>
                            isActive ? css.active : ""
                        }>
                        Home
                    </NavLink>
                </li>
                <li className={css.navItem}>
                    <NavLink
                        to="/library"
                        className={({ isActive }) =>
                            isActive ? css.active : ""
                        }>
                        My library
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};
