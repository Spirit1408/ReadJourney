import css from "./MyLibraryBooks.module.css";
import booksD from "../../images/books-d.png";
import booksD2x from "../../images/books-d@2x.png";
import booksM from "../../images/books-m.png";
import booksM2x from "../../images/books-m@2x.png";
import sprite from "/sprite.svg";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

import testbook from "/testbook.png";

export const MyLibraryBooks = () => {
	const [isSelectOpen, setIsSelectOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState("All books");
	const dropdownRef = useRef(null);

	const books = [1];

	const options = [
		{ value: "unread", label: "Unread" },
		{ value: "in-progress", label: "In progress" },
		{ value: "done", label: "Done" },
		{ value: "all", label: "All books" },
	];

	const toggleSelect = () => {
		setIsSelectOpen(!isSelectOpen);
	};

	const handleOptionClick = (option) => {
		setSelectedOption(option.label);
		setIsSelectOpen(false);
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

			{books.length === 0 ? (
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
					<li className={css.book}>
						<img src={testbook} alt="" className={css.bookCover} />

						<div className={css.bookInfoWrapper}>
							<div className={css.bookInfo}>
								<h4 className={css.bookTitle}>
									I See You Are Interested In The Dark
								</h4>
								<p className={css.bookAuthor}>Hilarion Pavlyuk</p>
							</div>

							<button type="button" className={css.deleteBtn}>
								<svg className={css.deleteBtnIcon}>
									<use href={`${sprite}#icon-trash`} />
								</svg>
							</button>
						</div>
					</li>

					<li className={css.book}>
						<img src={testbook} alt="" className={css.bookCover} />

						<div className={css.bookInfoWrapper}>
							<div className={css.bookInfo}>
								<h4 className={css.bookTitle}>
									I See You Are Interested In The Dark
								</h4>
								<p className={css.bookAuthor}>Hilarion Pavlyuk</p>
							</div>

							<button type="button" className={css.deleteBtn}>
								<svg className={css.deleteBtnIcon}>
									<use href={`${sprite}#icon-trash`} />
								</svg>
							</button>
						</div>
					</li>

					<li className={css.book}>
						<img src={testbook} alt="" className={css.bookCover} />

						<div className={css.bookInfoWrapper}>
							<div className={css.bookInfo}>
								<h4 className={css.bookTitle}>
									I See You Are Interested In The Dark
								</h4>
								<p className={css.bookAuthor}>Hilarion Pavlyuk</p>
							</div>

							<button type="button" className={css.deleteBtn}>
								<svg className={css.deleteBtnIcon}>
									<use href={`${sprite}#icon-trash`} />
								</svg>
							</button>
						</div>
					</li>
				</ul>
			)}
		</div>
	);
};
