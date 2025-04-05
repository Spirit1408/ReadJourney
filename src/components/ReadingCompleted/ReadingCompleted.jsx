import css from "./ReadingCompleted.module.css";
import booksD from "../../images/books-d.png";
import booksD2x from "../../images/books-d@2x.png";
import booksM from "../../images/books-m.png";
import booksM2x from "../../images/books-m@2x.png";

export const ReadingCompleted = () => {
    return (
        <div className={css.wrapper}>
            <picture>
                <source
                    media="(min-width: 1440px)"
                    srcSet={`${booksD} 1x, ${booksD2x} 2x`}
                />
                <source
                    media="(min-width: 375px)"
                    srcSet={`${booksM} 1x, ${booksM2x} 2x`}
                />
                <img
                    src={booksM}
                    alt="books icon"
                    loading="lazy"
                    className={css.booksIcon}
                />
            </picture>

            <h3 className={css.title}>The book is read</h3>

            <p className={css.text}>
                It was an <span>exciting journey</span>, where each page
                revealed new horizons, and the characters became inseparable
                friends.
            </p>
        </div>
    );
};
