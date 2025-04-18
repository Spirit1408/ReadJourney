import css from "./AddReadingModal.module.css";
import coverD from "../../images/cover-d.png";
import coverD2x from "../../images/cover-d@2x.png";
import coverM from "../../images/cover-m.png";
import coverM2x from "../../images/cover-m@2x.png";
import booksM from "../../images/books-m.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBookId } from "../../redux/reading/slice";

export const AddReadingModal = ({ book }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleStartReading = () => {
		dispatch(setBookId(book._id));

		navigate("/reading");
	};

	return (
		<div className={css.wrapper}>
			{book.imageUrl ? (
				<img
					src={book.imageUrl}
					alt={`Cover of ${book.title}`}
					className={css.cover}
				/>
			) : (
				<div className={css.coverDefault}>
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
							src={booksM}
							alt="Default book cover"
							loading="lazy"
							className={css.coverDefaultIcon}
						/>
					</picture>
				</div>
			)}

			<h3 className={css.title}>{book.title}</h3>

			<p className={css.author}>{book.author}</p>

			<p className={css.pagesAmount}>{book.totalPages} pages</p>

			<button type="button" className={css.button} onClick={handleStartReading}>
				Start reading
			</button>
		</div>
	);
};
