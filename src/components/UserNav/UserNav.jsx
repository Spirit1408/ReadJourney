import css from './UserNav.module.css'
import { NavLink } from 'react-router-dom'

export const UserNav = () => {
    return <nav className={css.nav}>
            <ul className={css.navList}>
                <li><NavLink to="/recommended">Home</NavLink></li>
                <li><NavLink to="/library">My library</NavLink></li>
            </ul>
        </nav>
}