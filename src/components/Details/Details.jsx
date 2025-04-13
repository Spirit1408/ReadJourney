import clsx from "clsx";
import css from "./Details.module.css";
import sprite from "/sprite.svg";
import { Diary } from "./../Diary/Diary";
import { Statistics } from "./../Statistics/Statistics";

export const Details = () => {
    const isDiaryOpen = false;

    return (
        <>
            <div className={css.bar}>
                <h2 className={css.title}>
                    {isDiaryOpen ? "Diary" : "Statistics"}
                </h2>

                <ul className={css.btnGroup}>
                    <li>
                        <button
                            type="button"
                            className={clsx(css.button, {
                                [css.active]: isDiaryOpen,
                            })}>
                            <svg className={css.icon}>
                                <use href={`${sprite}#icon-clock`} />
                            </svg>
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            className={clsx(css.button, {
                                [css.active]: !isDiaryOpen,
                            })}>
                            <svg className={css.icon}>
                                <use href={`${sprite}#icon-graph`} />
                            </svg>
                        </button>
                    </li>
                </ul>
            </div>

            {isDiaryOpen ? <Diary /> : <Statistics />}
        </>
    );
};
