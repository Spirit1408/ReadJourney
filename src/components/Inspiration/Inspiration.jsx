import css from "./Inspiration.module.css";
import booksD from "../../images/books-d.png";
import booksD2x from "../../images/books-d@2x.png";

export const Inspiration = () => {
    return (
        <div className={css.wrapper}>
            <img
                src={booksD}
                className={css.image}
                srcSet={`${booksD} 1x, ${booksD2x} 2x`}
                loading="lazy"
                alt=""
            />

            <p className={css.quote}>
                "Books are <span>windows</span> to the world, and reading is a journey into
                the unknown."
            </p>
        </div>
    );
};
