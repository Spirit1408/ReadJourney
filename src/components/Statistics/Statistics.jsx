import css from "./Statistics.module.css";

export const Statistics = () => {
	const testPerc = 17.92;
	const radius = 50;
	const circumference = 2 * Math.PI * radius;
	const strokeDasharray = circumference;
	const strokeDashoffset = circumference - (testPerc / 100) * circumference;

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
					<p className={css.percentage}>{testPerc}%</p>
					<p className={css.pages}>171 pages read</p>
				</div>
			</div>
		</div>
	);
};
