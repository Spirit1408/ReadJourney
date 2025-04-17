import css from "./RecommendedBooksLibrary.module.css";
import sprite from "/sprite.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    selectRandomRecommendedBooks,
    selectIsRandomLoading,
} from "../../redux/recommended/selectors";
import { fetchRandomRecommendedBooks } from "../../redux/recommended/operations";
import { useEffect } from "react";
import { Loader } from "../Loader/Loader";

export const RecommendedBooksLibrary = () => {
    const dispatch = useDispatch();
    const randomBooks = useSelector(selectRandomRecommendedBooks);
    const isLoading = useSelector(selectIsRandomLoading);

    useEffect(() => {
        dispatch(fetchRandomRecommendedBooks());
    }, [dispatch]);

    return (
        <div className={css.wrapper}>
            <h3 className={css.title}>Recommended books</h3>

            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <ul className={css.books}>
                        {!isLoading &&
                            randomBooks.map((book) => (
                                <li
                                    key={book._id}
                                    className={css.book}>
                                    <img
                                        className={css.bookCover}
                                        src={book.imageUrl}
                                        alt={`Cover of ${book.title}`}
                                    />

                                    <h4 className={css.bookTitle}>
                                        {book.title}
                                    </h4>

                                    <p className={css.bookAuthor}>
                                        {book.author}
                                    </p>
                                </li>
                            ))}
                    </ul>

                    <div className={css.links}>
                        <Link
                            to="/"
                            className={css.link}>
                            Home
                        </Link>

                        <Link
                            to="/"
                            className={css.button}>
                            <svg className={css.icon}>
                                <use href={`${sprite}#icon-log-in`}></use>
                            </svg>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};
