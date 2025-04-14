import css from "./NotFoundPage.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const NotFoundPage = () => {
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const redirectPath = isLoggedIn ? "/recommended" : "/login";
	const buttonText = isLoggedIn ? "Back to homepage" : "Back to login";

	return (
		<div className={css.container}>
			<div className={css.content}>
				<h1 className={css.title}>404</h1>
				<p className={css.description}>Oops! Page not found</p>
				<p className={css.message}>
					The page you are looking for might have been removed, had its name
					changed, or is temporarily unavailable.
				</p>
				<Link to={redirectPath} className={css.button}>
					{buttonText}
				</Link>
			</div>
		</div>
	);
};

export default NotFoundPage;