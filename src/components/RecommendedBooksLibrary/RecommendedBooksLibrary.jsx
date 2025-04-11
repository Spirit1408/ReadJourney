import css from "./RecommendedBooksLibrary.module.css";
import sprite from "/sprite.svg";
import { Link } from "react-router-dom";

export const RecommendedBooksLibrary = () => {
    return (
					<div className={css.wrapper}>
						<h3 className={css.title}>Recommended books</h3>

						<ul className={css.books}>
							<li className={css.book}>
								<img className={css.bookCover} src="./testlib1.png" alt="cover" />

								<h4 className={css.bookTitle}>The Orphanage</h4>

								<p className={css.bookAuthor}>Serhiy Zhadan</p>
							</li>

							<li className={css.book}>
								<img className={css.bookCover} src="./testlib2.png" alt="cover" />

								<h4 className={css.bookTitle}>Melodia kavi u tolalnosti</h4>

								<p className={css.bookAuthor}>Natalia Gurnytska</p>
							</li>

							<li className={css.book}>
								<img className={css.bookCover} src="./testlib3.png" alt="cover" />

								<h4 className={css.bookTitle}>Six doors</h4>

								<p className={css.bookAuthor}>Irene Rozdobudko</p>
							</li>
						</ul>

						<div className={css.links}>
							<Link to="/" className={css.link}>
								Home
							</Link>

							<Link to="/" className={css.button}>
								<svg className={css.icon}>
									<use href={`${sprite}#icon-log-in`}></use>
								</svg>
							</Link>
						</div>
					</div>
				);
};
