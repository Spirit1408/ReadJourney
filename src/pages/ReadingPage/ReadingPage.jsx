import css from "./ReadingPage.module.css";
import { MyBook } from "../../components/MyBook/MyBook";
import { Dashboard } from "../../components/Dashboard/Dashboard";
import { AddReading } from "../../components/AddReading/AddReading";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookById } from "../../redux/reading/operations";
import { selectBookId } from "../../redux/reading/selectors";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ReadingPage() {
	const dispatch = useDispatch();
	const bookId = useSelector(selectBookId);

	if (!bookId) {
		return <Navigate to="/library" replace />;
	}

	useEffect(() => {
		if (bookId) {
			dispatch(fetchBookById(bookId))
				.unwrap()
				.then((data) => {
					toast.success("Book data loaded successfully");
				})
				.catch((error) => {
					toast.error("Error fetching book data:");
				});
		}
	}, [dispatch, bookId]);

	return (
		<div className={css.wrapper}>
			<Dashboard>
				<AddReading />
			</Dashboard>

			<MyBook />
		</div>
	);
}
