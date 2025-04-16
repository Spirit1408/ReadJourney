import clsx from "clsx";
import css from "./RecommendedBooks.module.css";
import sprite from "/sprite.svg";
import { useDispatch, useSelector } from "react-redux";
import {
	selectRecommendedBooks,
	selectIsLoading,
	selectTotalPages,
	selectCurrentPage,
} from "../../redux/recommended/selectors";
import { selectIsLoading as selectLibraryIsLoading } from "../../redux/library/selectors";
import { setPage } from "../../redux/recommended/slice";
import { fetchRecommendedBooks } from "../../redux/recommended/operations";
import { useEffect, useState } from "react";
import { Modal } from "../Modal/Modal";
import { AddBookModal } from "../AddBookModal/AddBookModal";
import { Loader } from "../Loader/Loader";
import { AddBookConfirm } from "../AddBookConfirm/AddBookConfirm";

export const RecommendedBooks = () => {
	const dispatch = useDispatch();
	const books = useSelector(selectRecommendedBooks);
	const isLoading = useSelector(selectIsLoading);
	const isLibraryLoading = useSelector(selectLibraryIsLoading);
	const totalPages = useSelector(selectTotalPages);
	const currentPage = useSelector(selectCurrentPage);
	const [selectedBook, setSelectedBook] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isBookAdded, setIsBookAdded] = useState(false);

	useEffect(() => {
		dispatch(fetchRecommendedBooks());
	}, [dispatch, currentPage]);

	const handlePrevPage = () => {
		if (currentPage > 1) {
			dispatch(setPage(currentPage - 1));
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			dispatch(setPage(currentPage + 1));
		}
	};

	const handleBookClick = (book) => {
		setSelectedBook(book);
		setIsModalOpen(true);
		setIsBookAdded(false);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedBook(null);
		setIsBookAdded(false);
	};

	const handleBookAdded = () => {
		setIsBookAdded(true);
	};

	return (
		<div className={css.wrapper}>
			<div className={css.bar}>
				<h3 className={css.title}>Recommended</h3>

				<div className={css.btnGroup}>
					<button
						type="button"
						className={clsx(css.button, css.prev)}
						disabled={currentPage <= 1 || isLoading}
						onClick={handlePrevPage}
					>
						<svg className={css.icon}>
							<use href={`${sprite}#icon-select`} />
						</svg>
					</button>
					<button
						type="button"
						className={clsx(css.button, css.next)}
						disabled={currentPage >= totalPages || isLoading}
						onClick={handleNextPage}
					>
						<svg className={css.icon}>
							<use href={`${sprite}#icon-select`} />
						</svg>
					</button>
				</div>
			</div>

			{isLoading ? (
				<Loader />
			) : (
				<ul className={css.books}>
					{books.length > 0 ? (
						books.map((book) => (
							<li
								key={book._id}
								className={css.book}
								onClick={() => handleBookClick(book)}
							>
								<img
									src={book.imageUrl}
									alt={`Cover of ${book.title}`}
									className={css.bookCover}
								/>

								<h4 className={css.bookTitle}>{book.title}</h4>

								<p className={css.bookAuthor}>{book.author}</p>
							</li>
						))
					) : (
						<p>No recommended books found.</p>
					)}
				</ul>
			)}

			{isModalOpen && (
				<Modal onClose={handleCloseModal}>
					{isLibraryLoading ? (
						<Loader />
					) : isBookAdded ? (
						<AddBookConfirm />
					) : (
						<AddBookModal book={selectedBook} onBookAdded={handleBookAdded} />
					)}
				</Modal>
			)}
		</div>
	);
};
