import css from "./AddBook.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { addBook } from "../../redux/library/operations";
import { selectError, selectIsLoading } from "../../redux/library/selectors";
import { useEffect, useState } from "react";
import { clearError } from "../../redux/library/slice";
import { Modal } from "../Modal/Modal";
import { AddBookConfirm } from "../AddBookConfirm/AddBookConfirm";

const schema = yup.object({
	title: yup.string().required("Title is required"),
	author: yup.string().required("Author is required"),
	totalPages: yup
		.number()
		.transform((value) => (Number.isNaN(value) ? undefined : value))
		.required("Number of pages is required")
		.positive("Number of pages must be positive")
		.integer("Number of pages must be an integer"),
});

export const AddBook = () => {
	const dispatch = useDispatch();
	const error = useSelector(selectError);
	const isLoading = useSelector(selectIsLoading);
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		mode: "onChange",
		defaultValues: {
			title: "",
			author: "",
			totalPages: "",
		},
	});

	useEffect(() => {
		return () => {
			dispatch(clearError());
		};
	}, [dispatch]);

	const onSubmit = (data) => {
		const bookData = {
			...data,
			totalPages: Number(data.totalPages),
		};

		dispatch(addBook(bookData))
			.unwrap()
			.then(() => {
				reset();
				setShowConfirmModal(true);
			})
			.catch((error) => {
				console.error("Failed to add book:", error);
			});
	};

	const handleCloseModal = () => {
		setShowConfirmModal(false);
	};

	return (
		<div>
			<span className={css.title}>Filters:</span>
			<form className={css.form} onSubmit={handleSubmit(onSubmit)}>
				<div className={css.inputs}>
					<div className={css.inputGroup}>
						<div
							className={clsx(css.inputWithPrefix, {
								[css.errorInput]: errors.title,
							})}
						>
							<span className={css.inputPrefix}>Book title:</span>
							<input
								type="text"
								{...register("title")}
								className={css.inputWithPrefixField}
							/>
						</div>
						{errors.title && (
							<p className={css.errorMessage}>{errors.title.message}</p>
						)}
					</div>

					<div className={css.inputGroup}>
						<div
							className={clsx(css.inputWithPrefix, {
								[css.errorInput]: errors.author,
							})}
						>
							<span className={css.inputPrefix}>The author:</span>
							<input
								type="text"
								{...register("author")}
								className={css.inputWithPrefixField}
							/>
						</div>
						{errors.author && (
							<p className={css.errorMessage}>{errors.author.message}</p>
						)}
					</div>

					<div className={css.inputGroup}>
						<div
							className={clsx(css.inputWithPrefix, {
								[css.errorInput]: errors.totalPages,
							})}
						>
							<span className={css.inputPrefix}>Number of pages:</span>
							<input
								type="text"
								{...register("totalPages")}
								className={css.inputWithPrefixField}
							/>
						</div>
						{errors.totalPages && (
							<p className={css.errorMessage}>{errors.totalPages.message}</p>
						)}
					</div>
				</div>

				{error && <p className={css.errorMessage}>{error}</p>}

				<button type="submit" className={css.submitBtn} disabled={isLoading}>
					Add book
				</button>
			</form>

			{showConfirmModal && (
				<Modal onClose={handleCloseModal}>
					<AddBookConfirm />
				</Modal>
			)}
		</div>
	);
};
