import css from "./Statistics.module.css";
import { useSelector } from "react-redux";
import {
	selectBook,
	selectReadingProgress,
} from "../../redux/reading/selectors";

export const Statistics = () => {
	const book = useSelector(selectBook);
	const readingProgress = useSelector(selectReadingProgress);

	const completedSessions = readingProgress.filter(
		(session) => session.status === "inactive",
	);

	const sortedSessions = [...completedSessions].sort(
		(a, b) => new Date(b.finishReading) - new Date(a.finishReading),
	);

	const lastSession = sortedSessions[0];

	let percentage = 0;
	let pagesRead = 0;

	if (book && book.totalPages && lastSession) {
		percentage = ((lastSession.finishPage / book.totalPages) * 100).toFixed(2);
		pagesRead = lastSession.finishPage;
	}

	const radius = 50;
	const circumference = 2 * Math.PI * radius;
	const strokeDasharray = circumference;
	const strokeDashoffset = circumference - (percentage / 100) * circumference;

	return (
		<div className={css.wrapper}>
			<div className={css.infoIndicator}>
				<svg width="116" height="116" viewBox="0 0 116 116">
					<circle
						cx="58"
						cy="58"
						r={radius}
						fill="transparent"
						stroke="var(--scale-dark)"
						strokeWidth="10"
					/>
					<circle
						cx="58"
						cy="58"
						r={radius}
						fill="transparent"
						stroke="var(--green)"
						strokeWidth="10"
						strokeDasharray={strokeDasharray}
						strokeDashoffset={strokeDashoffset}
						strokeLinecap="round"
						transform="rotate(-90, 58, 58)"
					/>
				</svg>
				<p className={css.label}>100%</p>
			</div>

			<div className={css.info}>
				<span className={css.legend} />

				<div className={css.infoData}>
					<p className={css.percentage}>{percentage}%</p>
					<p className={css.pages}>{pagesRead} pages read</p>
				</div>
			</div>
		</div>
	);
};
