import clsx from "clsx";
import css from "./MyBook.module.css";

export const MyBook = () => {
    const isReading = false;

    return (
        <div className={css.wrapper}>
            <div className={css.bar}>
                <h2 className={css.title}>My reading</h2>

                <p className={css.timeStat}>
                    {isReading && "6 hours and 23 minutes left"}
                </p>
            </div>

            <div className={css.book}>
                <img
                    src="./testreading.png"
                    alt="book"
                    className={css.bookCover}
                />

                <h3 className={css.bookTitle}>
                    I See You Are Interested In The Dark
                </h3>

                <p className={css.bookAuthor}>Hilarion Pavlyuk</p>
            </div>

            <div className={css.progress}>
                <div
                    className={clsx(css.indicator, { [css.active]: isReading })}
                />
            </div>
        </div>
    );
};
