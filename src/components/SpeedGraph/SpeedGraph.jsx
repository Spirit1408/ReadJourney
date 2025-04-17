import React from "react";
import css from "./SpeedGraph.module.css";

const SpeedGraph = ({ speed }) => {
	const baseWidth = 43;
	const baseHeight = 17;

	const normalizedSpeed = Math.min(Math.max(speed / 60, 0), 1);

	const startX = 5;
	const endX = 38;
	const bottomY = 14;
	const startY = 8;
	const endY = startY - normalizedSpeed * 8;

	const points = [
		`${startX},${bottomY}`,
		`${startX},${startY}`,
		`${endX},${endY}`,
		`${endX},${bottomY}`,
	].join(" ");

	return (
		<div className={css.graphContainer}>
			<svg
				className={css.graph}
				viewBox={`0 0 ${baseWidth} ${baseHeight}`}
				preserveAspectRatio="xMidYMid meet"
			>
				<polygon points={points} fill="#30B94D" fillOpacity="0.2" />

				<line
					x1={startX}
					y1={startY}
					x2={endX}
					y2={endY}
					stroke="#30B94D"
					strokeWidth={2}
					strokeLinecap="round"
				/>
			</svg>
		</div>
	);
};

export default SpeedGraph;
