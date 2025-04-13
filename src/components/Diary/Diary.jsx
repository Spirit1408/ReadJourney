import clsx from "clsx";
import css from "./Diary.module.css";
import sprite from "/sprite.svg";
import { useEffect, useRef, useState } from "react";

export const Diary = () => {
	const wrapperRef = useRef(null);
	const scrollbarRef = useRef(null);
	const [scrollPosition, setScrollPosition] = useState(0);
	const [scrollHeight, setScrollHeight] = useState(0);
	const [clientHeight, setClientHeight] = useState(0);

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

	return (
		<div className={css.wrapperContainer}>
			<div className={css.wrapper} ref={wrapperRef}>
				<ul className={css.list}>
					<li className={css.timeStamp}>
						<div className={css.leftBlock}>
							<span className={clsx(css.outerSquare, css.squareActive)}>
								<span className={css.innerSquare} />
							</span>

							<div className={css.info}>
								<p className={clsx(css.date, css.dateActive)}>21.10.2023</p>
								<p className={css.percentage}>7.6%</p>
								<p className={css.duration}>29 minutes</p>
							</div>
						</div>

						<div className={css.rightBlockWrapper}>
							<div className={css.rightBlock}>
								<p className={css.pages}>42 pages</p>
								<img src="./testgraph.png" alt="" className={css.graph} />
								<p className={css.speed}>45 pages per hour</p>
							</div>

							<button type="button" className={css.deleteBtn}>
								<svg className={css.icon}>
									<use href={`${sprite}#icon-trash`} />
								</svg>
							</button>
						</div>
					</li>

					<li className={css.timeStamp}>
						<div className={css.leftBlock}>
							<span className={css.outerSquare}>
								<span className={css.innerSquare} />
							</span>

							<div className={css.info}>
								<p className={css.date}>19.10.2023</p>
								<p className={css.percentage}>5.4%</p>
								<p className={css.duration}>21 minutes</p>
							</div>
						</div>

						<div className={css.rightBlockWrapper}>
							<div className={css.rightBlock}>
								<p className={css.pages}>38 pages</p>
								<img src="./testgraph.png" alt="" className={css.graph} />
								<p className={css.speed}>31 pages per hour</p>
							</div>

							<button type="button" className={css.deleteBtn}>
								<svg className={css.icon}>
									<use href={`${sprite}#icon-trash`} />
								</svg>
							</button>
						</div>
					</li>

					<li className={css.timeStamp}>
						<div className={css.leftBlock}>
							<span className={css.outerSquare}>
								<span className={css.innerSquare} />
							</span>

							<div className={css.info}>
								<p className={css.date}>21.10.2023</p>
								<p className={css.percentage}>7.6%</p>
								<p className={css.duration}>29 minutes</p>
							</div>
						</div>

						<div className={css.rightBlockWrapper}>
							<div className={css.rightBlock}>
								<p className={css.pages}>42 pages</p>
								<img src="./testgraph.png" alt="" className={css.graph} />
								<p className={css.speed}>45 pages per hour</p>
							</div>

							<button type="button" className={css.deleteBtn}>
								<svg className={css.icon}>
									<use href={`${sprite}#icon-trash`} />
								</svg>
							</button>
						</div>
					</li>
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
