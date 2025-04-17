import css from "./EntryLayout.module.css";
import sprite from "/sprite.svg";
import heroDesktop from "../../images/hero-d.png";
import heroDesktop2x from "../../images/hero-d@2x.png";
import heroMobile from "../../images/hero-m.png";
import heroMobile2x from "../../images/hero-m@2x.png";

export const EntryLayout = ({ children }) => {
    return (
        <>
            <div className={css.wrapper}>
                <div className={css.logoWrapper}>
                    <svg className={css.logo}>
                        <use href={`${sprite}#icon-logo`} />
                    </svg>

                    <span className={css.logoTitle}>READ JOURNEY</span>
                </div>

                <h1 className={css.title}>
                    Expand your mind, reading <span>a book</span>
                </h1>

                <div>{children}</div>
            </div>

            <div className={css.imgWrapper}>
                <picture>
                    <source
                        media="(min-width: 1440px)"
                        srcSet={`${heroDesktop} 1x, ${heroDesktop2x} 2x`}
                    />
                    <source
                        media="(min-width: 320px)"
                        srcSet={`${heroMobile} 1x, ${heroMobile2x} 2x`}
                    />
                    <img
                        src={heroMobile}
                        alt="phone illustration"
                        loading="lazy"
                    />
                </picture>
            </div>
        </>
    );
};
