import css from "./AddBookModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addBookById } from "../../redux/library/operations";
import { selectIsLoading } from "../../redux/library/selectors";
import toast from "react-hot-toast";

export const AddBookModal = ({ book, onBookAdded }) => {
	const dispatch = useDispatch();
	const isLoading = useSelector(selectIsLoading);

	const handleAddToLibrary = () => {
		dispatch(addBookById(book._id))
			.unwrap()
			.then(() => {
				if (onBookAdded) {
					onBookAdded();
				}
			})
			.catch((error) => {
				toast.error(error || "Failed to add book");
			});
	};

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

			<button
				type="button"
				className={css.button}
				onClick={handleAddToLibrary}
				disabled={isLoading}
			>
				Add to library
			</button>
		</div>
	);
};
