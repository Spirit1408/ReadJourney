import css from "./MyLibraryBooks.module.css";
import booksD from "../../images/books-d.png";
import booksD2x from "../../images/books-d@2x.png";
import booksM from "../../images/books-m.png";
import booksM2x from "../../images/books-m@2x.png";
import coverD from "../../images/cover-d.png";
import coverD2x from "../../images/cover-d@2x.png";
import coverM from "../../images/cover-m.png";
import coverM2x from "../../images/cover-m@2x.png";
import sprite from "/sprite.svg";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchOwnBooks, removeBook } from "../../redux/library/operations";
import {
	selectFilteredBooks,
	selectIsLoading,
} from "../../redux/library/selectors";
import { setCurrentStatus } from "../../redux/library/slice";
import toast from "react-hot-toast";
import { Loader } from "../Loader/Loader";
import { Modal } from "../Modal/Modal";
import { AddReadingModal } from "../AddReadingModal/AddReadingModal";

export const MyLibraryBooks = () => {
	const [isSelectOpen, setIsSelectOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState("All books");
	const [selectedBook, setSelectedBook] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const dropdownRef = useRef(null);
	const dispatch = useDispatch();

	const books = useSelector(selectFilteredBooks);
	const isLoading = useSelector(selectIsLoading);

	const options = [
		{ value: "unread", label: "Unread" },
		{ value: "in-progress", label: "In progress" },
		{ value: "done", label: "Done" },
		{ value: "all", label: "All books" },
	];

	useEffect(() => {
		dispatch(fetchOwnBooks());
	}, [dispatch]);

	const toggleSelect = () => {
		setIsSelectOpen(!isSelectOpen);
	};

	const handleOptionClick = (option) => {
		setSelectedOption(option.label);
		setIsSelectOpen(false);
		dispatch(setCurrentStatus(option.value));
		dispatch(fetchOwnBooks(option.value));
	};

	const handleRemoveBook = (bookId) => {
		dispatch(removeBook(bookId));
		toast.success("Book removed from your library");
	};

	const handleBookClick = (book) => {
		setSelectedBook(book);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedBook(null);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsSelectOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className={css.wrapper}>
			<div className={css.bar}>
				<h3 className={css.title}>My Library</h3>

				<div className={css.customSelect} ref={dropdownRef}>
					<div className={css.selectButton} onClick={toggleSelect}>
						<span>{selectedOption}</span>

						<svg className={clsx(css.arrow, isSelectOpen && css.arrowUp)}>
							<use href={`${sprite}#icon-select`}></use>
						</svg>
					</div>
					{isSelectOpen && (
						<div className={css.options}>
							{options.map((option) => (
								<div
									key={option.value}
									className={clsx(
										css.option,
										selectedOption === option.label && css.activeOption,
									)}
									onClick={() => handleOptionClick(option)}
								>
									{option.label}
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			{isLoading ? (
				<Loader />
			) : books.length === 0 ? (
				<div className={css.infoWrapper}>
					<div className={css.iconWrapper}>
						<picture>
							<source
								media="(min-width: 1440px)"
								srcSet={`${booksD} 1x, ${booksD2x} 2x`}
							/>
							<source
								media="(min-width: 375px)"
								srcSet={`${booksM} 1x, ${booksM2x} 2x`}
							/>
							<img src={booksM} alt="books icon" loading="lazy" />
						</picture>
					</div>

					<p className={css.info}>
						To start training, add <span>some of your books</span> or from the
						recommended ones
					</p>
				</div>
			) : (
				<ul className={css.books}>
					{books.map((book) => (
						<li
							key={book._id}
							className={css.book}
							onClick={() => handleBookClick(book)}
						>
							{book.imageUrl ? (
								<img
									src={book.imageUrl}
									alt={`Cover of ${book.title}`}
									className={css.bookCover}
								/>
							) : (
								<div className={css.bookCoverDefault}>
									<picture>
										<source
											media="(min-width: 1440px)"
											srcSet={`${coverD} 1x, ${coverD2x} 2x`}
										/>
										<source
											media="(min-width: 375px)"
											srcSet={`${coverM} 1x, ${coverM2x} 2x`}
										/>
										<img
											src={booksM}
											alt="books icon"
											loading="lazy"
											className={css.bookCoverDefaultIcon}
										/>
									</picture>
								</div>
							)}

							<div className={css.bookInfoWrapper}>
								<div className={css.bookInfo}>
									<h4 className={css.bookTitle}>{book.title}</h4>
									<p className={css.bookAuthor}>{book.author}</p>
								</div>

								<button
									type="button"
									className={css.deleteBtn}
									onClick={(e) => {
										e.stopPropagation();
										handleRemoveBook(book._id);
									}}
								>
									<svg className={css.deleteBtnIcon}>
										<use href={`${sprite}#icon-trash`} />
									</svg>
								</button>
							</div>
						</li>
					))}
				</ul>
			)}

			{isModalOpen && selectedBook && (
				<Modal onClose={handleCloseModal}>
					<AddReadingModal book={selectedBook} />
				</Modal>
			)}
		</div>
	);
};
