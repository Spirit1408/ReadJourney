import css from "./Diary.module.css";
import clsx from "clsx";
import sprite from "/sprite.svg";
import { useEffect, useRef, useState } from "react";
import SpeedGraph from "../SpeedGraph/SpeedGraph";
import { useSelector, useDispatch } from "react-redux";
import {
	selectBook,
	selectReadingProgress,
	selectHasActiveSession,
} from "../../redux/reading/selectors";
import { deleteReading } from "../../redux/reading/operations";
import toast from "react-hot-toast";

export const Diary = () => {
	const wrapperRef = useRef(null);
	const scrollbarRef = useRef(null);
	const [scrollPosition, setScrollPosition] = useState(0);
	const [scrollHeight, setScrollHeight] = useState(0);
	const [clientHeight, setClientHeight] = useState(0);

	const book = useSelector(selectBook);
	const readingProgress = useSelector(selectReadingProgress);
	const hasActiveSession = useSelector(selectHasActiveSession);
	const dispatch = useDispatch();

	useEffect(() => {
		const wrapper = wrapperRef.current;
		if (!wrapper) return;

		const handleScroll = () => {
			const { scrollTop, scrollHeight, clientHeight } = wrapper;
			setScrollPosition(scrollTop);
			setScrollHeight(scrollHeight);
			setClientHeight(clientHeight);
		};

		handleScroll();
		wrapper.addEventListener("scroll", handleScroll);

		const resizeObserver = new ResizeObserver(handleScroll);
		resizeObserver.observe(wrapper);

		return () => {
			wrapper.removeEventListener("scroll", handleScroll);
			resizeObserver.disconnect();
		};
	}, []);

	const isScrollable = scrollHeight > clientHeight;

	const visibleRatio = scrollHeight > 0 ? clientHeight / scrollHeight : 1;
	const trackHeight = clientHeight - 32;
	const scrollbarHeight = Math.max(
		Math.min(visibleRatio * trackHeight, trackHeight),
		0,
	);

	const maxScrollbarTravel = trackHeight - scrollbarHeight;

	const scrollbarPosition =
		scrollHeight - clientHeight > 0
			? (scrollPosition / (scrollHeight - clientHeight)) * maxScrollbarTravel
			: 0;

	const scrollbarTop = Math.max(
		0,
		Math.min(scrollbarPosition, maxScrollbarTravel),
	);

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
	};

	const calculateDuration = (startTime, endTime) => {
		const start = new Date(startTime);
		const end = new Date(endTime);
		const durationMs = end - start;
		return Math.round(durationMs / (1000 * 60));
	};

	const calculatePercentage = (startPage, finishPage) => {
		if (!book || !book.totalPages) return 0;
		const pagesRead = finishPage - startPage + 1;
		return ((pagesRead / book.totalPages) * 100).toFixed(1);
	};

	const handleDeleteSession = (readingId) => {
		if (book && book._id) {
			if (book && book.status === "done") {
				toast.error("This book has already been read completely");
				return;
			}

			if (hasActiveSession) {
				toast.error(
					"Please finish your active reading session before deleting",
				);
				return;
			}

			dispatch(deleteReading({ bookId: book._id, readingId }));
		}
	};

	return (
		<div className={css.wrapperContainer}>
			<div className={css.wrapper} ref={wrapperRef}>
				<ul className={css.list}>
					{readingProgress
						.filter((session) => session.status === "inactive")
						.slice()
						.reverse()
						.map((session, index) => {
							const isLatestSession = index === 0;
							const duration = calculateDuration(
								session.startReading,
								session.finishReading,
							);
							const percentage = calculatePercentage(
								session.startPage,
								session.finishPage,
							);
							const pagesRead = session.finishPage - session.startPage + 1;

							return (
								<li key={session._id} className={css.timeStamp}>
									<div className={css.leftBlock}>
										<span
											className={clsx(
												css.outerSquare,
												isLatestSession && css.squareActive,
											)}
										>
											<span className={css.innerSquare} />
										</span>

										<div className={css.info}>
											<p
												className={clsx(
													css.date,
													isLatestSession && css.dateActive,
												)}
											>
												{formatDate(session.finishReading)}
											</p>
											<p className={css.percentage}>{percentage}%</p>
											<p className={css.duration}>{duration} minutes</p>
										</div>
									</div>

									<div className={css.rightBlockWrapper}>
										<div className={css.rightBlock}>
											<p className={css.pages}>{pagesRead} pages</p>
											<div className={css.graph}>
												<SpeedGraph speed={session.speed} />
											</div>
											<p className={css.speed}>
												{session.speed} pages per hour
											</p>
										</div>

										<button
											type="button"
											className={css.deleteBtn}
											onClick={() => handleDeleteSession(session._id)}
										>
											<svg className={css.icon}>
												<use href={`${sprite}#icon-trash`} />
											</svg>
										</button>
									</div>
								</li>
							);
						})}
				</ul>
			</div>
			{isScrollable && (
				<div className={css.scrollbarTrack}>
					<div
						className={css.scrollbar}
						ref={scrollbarRef}
						style={{
							height: `${scrollbarHeight}px`,
							transform: `translateY(${scrollbarTop}px)`,
						}}
					/>
				</div>
			)}
		</div>
	);
};
