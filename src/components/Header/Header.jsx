import { UserBar } from '../UserBar/UserBar';
import { UserNav } from '../UserNav/UserNav';
import css from './Header.module.css'
import sprite from '/sprite.svg'

export const Header = () => {
    return <header className={css.header}>
        <svg className={css.logo}>
            <use href={`${sprite}#logo-icon`}></use>
        </svg>

        <UserNav />

        <UserBar />

        <button type="button" className={css.logOutBtn}>Log out</button>
    </header>;
}