import css from "./AddReading.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import clsx from "clsx";
import starM from "../../images/star-m.png";
import starM2x from "../../images/star-m@2x.png";
import starD from "../../images/star-d.png";
import starD2x from "../../images/star-d@2x.png";
import { Details } from "./../Details/Details";

const schema = yup.object({
    page: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? undefined : value))
        .required("Number of pages is required")
        .positive("Number of pages must be positive")
        .integer("Number of pages must be an integer"),
});

export const AddReading = () => {
    const IsReadingInfo = true;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            page: null,
        },
    });

    return (
        <>
            <span className={css.title}>Start page:</span>
            <form className={css.form}>
                <div className={css.inputs}>
                    <div className={css.inputGroup}>
                        <div
                            className={clsx(css.inputWithPrefix, {
                                [css.errorInput]: errors.page,
                            })}>
                            <span className={css.inputPrefix}>
                                Page number:
                            </span>
                            <input
                                type="number"
                                {...register("page")}
                                className={css.inputWithPrefixField}
                            />
                        </div>
                        {errors.page && (
                            <p className={css.errorMessage}>
                                {errors.page.message}
                            </p>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    className={css.submitBtn}>
                    To start
                </button>
            </form>

            {!IsReadingInfo ? (
                <div className={css.intro}>
                    <h2 className={css.introTitle}>Progress</h2>

                    <p className={css.introText}>
                        Here you will see when and how much you read. To record,
                        click on the red button above.
                    </p>

                    <div className={css.introImgWrapper}>
                        <picture>
                            <source
                                media="(min-width: 1440px)"
                                srcSet={`${starD} 1x, ${starD2x} 2x`}
                            />
                            <source
                                media="(min-width: 375px)"
                                srcSet={`${starM} 1x, ${starM2x} 2x`}
                            />
                            <img
                                src={starM}
                                alt="intro img"
                                loading="lazy"
                                className={css.introImg}
                            />
                        </picture>
                    </div>
                </div>
            ) : (
                <Details />
            )}
        </>
    );
};
