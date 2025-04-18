import css from "./MyBook.module.css";
import clsx from "clsx";
import coverD from "../../images/cover-d.png";
import coverD2x from "../../images/cover-d@2x.png";
import coverM from "../../images/cover-m.png";
import coverM2x from "../../images/cover-m@2x.png";
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
					{timeLeftToRead &&
						`${timeLeftToRead.hours} hours and ${timeLeftToRead.minutes} minutes left`}
				</p>
			</div>

			<div className={css.book}>
				{book.imageUrl ? (
					<img src={book.imageUrl} alt={book.title} className={css.bookCover} />
				) : (
					<div className={css.bookCoverDefault}>
						<picture>
							<source
								media="(min-width: 1280px)"
								srcSet={`${coverD} 1x, ${coverD2x} 2x`}
							/>
							<source
								media="(min-width: 375px)"
								srcSet={`${coverM} 1x, ${coverM2x} 2x`}
							/>
							<img
								loading="lazy"
								className={css.bookCoverDefaultIcon}
								alt="Default book cover"
								src={coverM}
							/>
						</picture>
					</div>
				)}

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
