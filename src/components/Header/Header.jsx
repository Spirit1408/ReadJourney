import css from "./Header.module.css";
import { UserBar } from "../UserBar/UserBar";
import { UserNav } from "../UserNav/UserNav";
import sprite from "/sprite.svg";
import { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { logout } from "./../../redux/auth/operations";
import toast from "react-hot-toast";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();

    const handleLogout = () => {
        try {
            dispatch(logout());
            toast.success("Logout successful!");
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    const handleOpenMenu = () => {
        setIsMenuOpen(true);
    };

    const handleCloseMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && isMenuOpen) {
                handleCloseMenu();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isMenuOpen, handleCloseMenu]);

    return (
        <header className="container">
            <div className={css.wrapper}>
                <svg className={css.logo}>
                    <use href={`${sprite}#icon-logo`}></use>
                </svg>

                <div className={css.info}>
                    <UserBar />

                    <button
                        type="button"
                        className={css.menuBtn}
                        onClick={handleOpenMenu}>
                        <svg className={css.menuBtnIcon}>
                            <use href={`${sprite}#icon-menu`}></use>
                        </svg>
                    </button>
                </div>

                <div
                    className={clsx(css.sideMenu, {
                        [css.closed]: !isMenuOpen,
                    })}>
                    <button
                        type="button"
                        className={css.closeMenuBtn}
                        onClick={handleCloseMenu}>
                        <svg className={css.closeMenuBtnIcon}>
                            <use href={`${sprite}#icon-close`}></use>
                        </svg>
                    </button>

                    <UserNav />

                    <button
                        type="button"
						className={css.logOutBtn}
						onClick={handleLogout}>
                        Log out
                    </button>
                </div>
            </div>

            <div
                className={clsx(css.menuOverlay, { [css.close]: !isMenuOpen })}
                onClick={handleCloseMenu}
            />
        </header>
    );
};
