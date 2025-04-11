import css from "./RecommendedPage.module.css";
import { Dashboard } from "../../components/Dashboard/Dashboard";
import { RecommendedBooks } from "../../components/RecommendedBooks/RecommendedBooks";
import { Filters } from "./../../components/Filters/Filters";
import { RecommendedInfo } from "./../../components/RecommendedInfo/RecommendedInfo";
import { useDispatch } from "react-redux";
import { fetchRecommendedBooks } from "../../redux/recommended/operations";
import { setFilters } from "../../redux/recommended/slice";

export default function RecommendedPage() {
	const dispatch = useDispatch();

	const handleFilterSubmit = (filterData) => {
		dispatch(setFilters(filterData));
		dispatch(fetchRecommendedBooks());
	};

	return (
		<div className={css.wrapper}>
			<Dashboard>
				<Filters onFilterSubmit={handleFilterSubmit} />
				<RecommendedInfo />
			</Dashboard>

			<RecommendedBooks />
		</div>
	);
}
