import css from "./MyBook.module.css";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import {
	selectBook,
	selectTimeLeftToRead,
	selectHasActiveSession,
} from "../../redux/reading/selectors";
import { Loader } from "../Loader/Loader";
import { useEffect } from "react";
import { updateActiveSessionStatus } from "../../../src/redux/reading/slice";

export const MyBook = () => {
	const dispatch = useDispatch();
	const book = useSelector(selectBook);
	const hasActiveSession = useSelector(selectHasActiveSession);
	const timeLeftToRead = useSelector(selectTimeLeftToRead);

	useEffect(() => {
		if (book) {
			dispatch(updateActiveSessionStatus());
		}
	}, [book, dispatch]);

	if (!book) {
		return (
			<div className={css.wrapper}>
				<Loader />
			</div>
		);
	}

	return (
		<div className={css.wrapper}>
			<div className={css.bar}>
				<h2 className={css.title}>My reading</h2>

				<p className={css.timeStat}>
					{timeLeftToRead && `${timeLeftToRead.hours} hours and ${timeLeftToRead.minutes} minutes left`}
				</p>
			</div>

			<div className={css.book}>
				<img src={book.imageUrl} alt={book.title} className={css.bookCover} />

				<h3 className={css.bookTitle}>{book.title}</h3>

				<p className={css.bookAuthor}>{book.author}</p>
			</div>

			<div className={css.progress}>
				<div
					className={clsx(css.indicator, { [css.active]: hasActiveSession })}
				/>
			</div>
		</div>
	);
};
