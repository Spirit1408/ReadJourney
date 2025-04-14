import React from "react";
import css from "./SpeedGraph.module.css";

const SpeedGraph = ({ speed, width = 43, height = 17 }) => {
	const normalizedSpeed = Math.min(Math.max(speed / 60, 0), 1);

	const svgRatio = width / 43;

	const startX = 5 * svgRatio;
	const endX = 38 * svgRatio;
	const bottomY = 14 * svgRatio;

	const startY = 8 * svgRatio;
	const endY = startY - normalizedSpeed * 8 * svgRatio;

	const points = [
		`${startX},${bottomY}`,
		`${startX},${startY}`,
		`${endX},${endY}`,
		`${endX},${bottomY}`,
	].join(" ");

	return (
		<svg
			className={css.graph}
			width="100%"
			height="100%"
			viewBox={`0 0 ${width} ${height}`}
			preserveAspectRatio="xMidYMid meet"
		>
			<polygon points={points} fill="#30B94D" fillOpacity="0.2" />

			<line
				x1={startX}
				y1={startY}
				x2={endX}
				y2={endY}
				stroke="#30B94D"
				strokeWidth={2 * svgRatio}
				strokeLinecap="round"
			/>
		</svg>
	);
};

export default SpeedGraph;
