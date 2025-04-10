import css from "./AddBookModal.module.css";

export const AddBookModal = ({ book }) => {
	return (
		<div className={css.wrapper}>
			<img
				src={book.imageUrl}
				alt={`Cover of ${book.title}`}
				className={css.cover}
			/>

			<h3 className={css.title}>{book.title}</h3>

			<p className={css.author}>{book.author}</p>

			<p className={css.pagesAmount}>{book.totalPages} pages</p>

			<button type="button" className={css.button}>
				Add to library
			</button>
		</div>
	);
};
