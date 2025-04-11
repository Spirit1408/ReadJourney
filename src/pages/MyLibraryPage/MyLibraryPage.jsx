import css from "./MyLibraryPage.module.css";
import { Dashboard } from "./../../components/Dashboard/Dashboard";
import { MyLibraryBooks } from "./../../components/MyLibraryBooks/MyLibraryBooks";
import { AddBook } from "../../components/AddBook/AddBook";
import { RecommendedBooksLibrary } from "../../components/RecommendedBooksLibrary/RecommendedBooksLibrary";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchOwnBooks } from "../../redux/library/operations";

export default function MyLibraryPage() {
	const dispatch = useDispatch();
	
	useEffect(() => {
		dispatch(fetchOwnBooks());
	}, [dispatch]);

	return (
		<div className={css.wrapper}>
			<Dashboard>
				<AddBook />
				<RecommendedBooksLibrary />
			</Dashboard>

			<MyLibraryBooks />
		</div>
	);
}
