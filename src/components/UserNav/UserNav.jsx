import css from './UserNav.module.css'
import { NavLink } from 'react-router-dom'

export const UserNav = () => {
    return <nav className={css.nav}>
            <ul className={css.navList}>
                <li><NavLink to="/recommended">Recommended</NavLink></li>
                <li><NavLink to="/library">Library</NavLink></li>
            </ul>
        </nav>
}