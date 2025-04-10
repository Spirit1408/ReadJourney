import css from "./RecommendedInfo.module.css";
import { Link } from "react-router-dom";
import sprite from "/sprite.svg";

export const RecommendedInfo = () => {
    return (
        <div className={css.wrapper}>
            <h3 className={css.title}>Start your workout</h3>

            <ul className={css.list}>
                <li className={css.item}>
                    <span className={css.itemNumber}>1</span>
                    <p className={css.itemText}>
                        <span>Create a personal library:</span> add the books you intend to
                        read to it.
                    </p>
                </li>
                <li className={css.item}>
                    <span className={css.itemNumber}>2</span>
                    <p className={css.itemText}>
                        <span>Create your first workout:</span> define a goal, choose a
                        period, start training.
                    </p>
                </li>
            </ul>

            <Link
                to="/library"
                className={css.link}>My library</Link>

            <Link
                to="/library"
                className={css.button}>
                <svg className={css.icon}>
                    <use href={`${sprite}#icon-log-in`} />
                </svg>
            </Link>
        </div>
    );
};
