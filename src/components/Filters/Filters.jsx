import toast from "react-hot-toast";
import css from "./Filters.module.css";
import { useForm } from "react-hook-form";

export const Filters = ({ onFilterSubmit }) => {
	const { register, handleSubmit, reset } = useForm({
		defaultValues: {
			title: "",
			author: "",
		},
	});

	const onSubmit = (data) => {
		if (data.author || data.title) {
			toast.success("Filters applied");
			onFilterSubmit(data);
		} else {
			toast.success("Showing all books");
			onFilterSubmit({title:"", author:""});
		}
		reset();
	};

	return (
		<>
			<span className={css.title}>Filters:</span>
			<form className={css.form} onSubmit={handleSubmit(onSubmit)}>
				<div className={css.inputs}>
					<div className={css.inputWithPrefix}>
						<span className={css.inputPrefix}>Book title:</span>
						<input
							type="text"
							{...register("title")}
							className={css.inputWithPrefixField}
						/>
					</div>

					<div className={css.inputWithPrefix}>
						<span className={css.inputPrefix}>The author:</span>
						<input
							type="text"
							{...register("author")}
							className={css.inputWithPrefixField}
						/>
					</div>
				</div>

				<button type="submit" className={css.submitBtn}>
					To apply
				</button>
			</form>
		</>
	);
};
