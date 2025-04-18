import css from "./AddBookConfirm.module.css";
import thumbD from "../../images/thumb-d.png";
import thumbD2x from "../../images/thumb-d@2x.png";
import thumbM from "../../images/thumb-m.png";
import thumbM2x from "../../images/thumb-m@2x.png";

export const AddBookConfirm = () => {
	return (
		<div className={css.wrapper}>
			<picture>
				<source
					media="(min-width: 1280px)"
					srcSet={`${thumbD} 1x, ${thumbD2x} 2x`}
				/>
				<source
					media="(min-width: 375px)"
					srcSet={`${thumbM} 1x, ${thumbM2x} 2x`}
				/>
				<img
					src={thumbM}
					alt="thumb icon"
					loading="lazy"
					className={css.thumb}
				/>
			</picture>

			<h3 className={css.title}>Good job!</h3>

			<p className={css.text}>
				Your book is now in <span>the library</span>! The joy knows no bounds
				and now you can start your training
			</p>
		</div>
	);
};
