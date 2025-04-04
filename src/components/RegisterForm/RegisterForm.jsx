import css from "./RegisterForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import clsx from "clsx";
import sprite from "../../../public/sprite.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

const schema = yup.object({
	name: yup.string().required("Name is required"),
	email: yup
		.string()
		.required("Email is required")
		.matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email format"),
	password: yup
		.string()
		.required("Password is required")
		.min(7, "Enter a valid Password"),
});

export const RegisterForm = () => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema), mode: "onChange" });

	const nameValue = watch("name");
	const emailValue = watch("email");
	const passwordValue = watch("password");

	const onSubmit = (data) => {
		toast.success(
			`Registration with email ${data.email} was successful for ${data.name}!`,
		);
	};

	return (
		<form className={css.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={css.inputs}>
				<div className={css.inputGroup}>
					<div className={css.passwordWrapper}>
						<div className={clsx(css.inputWithPrefix, {
							[css.errorInput]: errors.name,
							[css.validInput]: nameValue && !errors.name,
						})}>
							<span className={css.inputPrefix}>Name: </span>
							<input
								type="text"
								{...register("name")}
								className={css.inputWithPrefixField}
							/>
						</div>
						<div className={css.icons}>
							{errors.name ? (
								<svg className={css.errorIcon}>
									<use href={`${sprite}#icon-valerr`}></use>
								</svg>
							) : (
								nameValue && (
									<svg className={css.validIcon}>
										<use href={`${sprite}#icon-valsuc`}></use>
									</svg>
								)
							)}
						</div>
					</div>
					{errors.name && (
						<p className={css.errorMessage}>{errors.name.message}</p>
					)}
				</div>

				<div className={css.inputGroup}>
					<div className={css.passwordWrapper}>
						<div className={clsx(css.inputWithPrefix, {
							[css.errorInput]: errors.email,
							[css.validInput]: emailValue && !errors.email,
						})}>
							<span className={css.inputPrefix}>Mail: </span>
							<input
								type="email"
								{...register("email")}
								className={css.inputWithPrefixField}
							/>
						</div>
						<div className={css.icons}>
							{errors.email ? (
								<svg className={css.errorIcon}>
									<use href={`${sprite}#icon-valerr`}></use>
								</svg>
							) : (
								emailValue && (
									<svg className={css.validIcon}>
										<use href={`${sprite}#icon-valsuc`}></use>
									</svg>
								)
							)}
						</div>
					</div>
					{errors.email && (
						<p className={css.errorMessage}>{errors.email.message}</p>
					)}
				</div>

				<div className={css.inputGroup}>
					<div className={css.passwordWrapper}>
						<div className={clsx(css.inputWithPrefix, {
							[css.errorInput]: errors.password,
							[css.validInput]: passwordValue && !errors.password,
						})}>
							<span className={css.inputPrefix}>Password:</span>
							<input
								type={showPassword ? "text" : "password"}
								{...register("password")}
								className={css.inputWithPrefixField}
							/>
						</div>

						<div className={css.icons}>
							<button
								type="button"
								className={css.showPwdBtn}
								onClick={togglePasswordVisibility}
							>
								<svg className={css.eyeIcon}>
									<use
										href={`${sprite}#${
											showPassword ? "icon-eye" : "icon-eye-off"
										}`}
									/>
								</svg>
							</button>

							{errors.password ? (
								<svg className={css.errorIcon}>
									<use href={`${sprite}#icon-valerr`}></use>
								</svg>
							) : (
								passwordValue && (
									<svg className={css.validIcon}>
										<use href={`${sprite}#icon-valsuc`}></use>
									</svg>
								)
							)}
						</div>
					</div>

					{errors.password && (
						<p className={css.errorMessage}>{errors.password.message}</p>
					)}
				</div>
			</div>

			<div className={css.btnGroup}>
				<button type="submit" className={css.submitBtn}>
					Registration
				</button>

				<Link to="/login" className={css.link}>
					Already have an account?
				</Link>
			</div>
		</form>
	);
};