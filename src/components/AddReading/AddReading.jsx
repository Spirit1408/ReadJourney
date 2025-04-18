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
import { useDispatch, useSelector } from "react-redux";
import { startReading, finishReading } from "../../redux/reading/operations";
import {
    selectBook,
    selectBookId,
    selectHasActiveSession,
    selectActiveReading,
} from "../../redux/reading/selectors";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { updateActiveSessionStatus } from "../../redux/reading/slice";
import { Modal } from "../Modal/Modal";
import { ReadingCompleted } from "../ReadingCompleted/ReadingCompleted";

export const AddReading = () => {
    const dispatch = useDispatch();
    const book = useSelector(selectBook);
    const bookId = useSelector(selectBookId);
    const hasActiveSession = useSelector(selectHasActiveSession);
    const activeReading = useSelector(selectActiveReading);
    const [hasProgress, setHasProgress] = useState(false);
    const [currentPage, setCurrentPage] = useState(null);
    const [showCompletedModal, setShowCompletedModal] = useState(false);

    const schema = yup.object({
        page: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? undefined : value))
            .required("Number of pages is required")
            .positive("Number of pages must be positive")
            .integer("Number of pages must be an integer"),
    });

    useEffect(() => {
        if (book) {
            dispatch(updateActiveSessionStatus());
        }
    }, [book, dispatch]);

    useEffect(() => {
        if (book && book.progress && book.progress.length > 0) {
            const hasCompletedSessions = book.progress.some(
                (session) => session.status === "inactive"
            );
            setHasProgress(hasCompletedSessions);
        } else {
            setHasProgress(false);
        }

        if (activeReading) {
            setCurrentPage(activeReading.startPage);
        }
    }, [book, activeReading]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            page: null,
        },
    });

    useEffect(() => {
        if (currentPage) {
            setValue("page", currentPage);
        }
    }, [currentPage, setValue]);

    const onSubmit = (data) => {
        const pageNumber = Number.parseInt(data.page);

        if (book && book.totalPages && pageNumber > book.totalPages) {
            toast.error(
                `Page number cannot exceed total pages (${book.totalPages})`
            );
            return;
        }

        if (hasActiveSession) {
            if (activeReading && pageNumber < activeReading.startPage) {
                toast.error(
                    `Page number cannot be less than the starting page (${activeReading.startPage})`
                );
                return;
            }

            dispatch(finishReading({ bookId, page: pageNumber }))
                .unwrap()
                .then(() => {
                    toast.success("Reading finished successfully");

                    if (pageNumber === book.totalPages) {
                        setShowCompletedModal(true);
                    }
                })
                .catch((error) => {
                    toast.error("Error finishing reading");
                });
        } else {
            if (book && book.status === "done") {
                toast.error("This book has already been read completely");
                return;
            }

            dispatch(startReading({ bookId, page: pageNumber }))
                .unwrap()
                .then((responseData) => {
                    toast.success("Reading started successfully");
                    reset();
                })
                .catch((error) => {
                    toast.error("Error starting reading");
                });
        }
    };

    const closeCompletedModal = () => {
        setShowCompletedModal(false);
    };

    return (
        <>
            <div>
                <span className={css.title}>
                    {activeReading ? "Stop page:" : "Start page:"}
                </span>
                <form
                    className={css.form}
                    onSubmit={handleSubmit(onSubmit)}>
                    <div className={css.inputs}>
                        <div className={css.inputGroup}>
                            <div
                                className={clsx(css.inputWithPrefix, {
                                    [css.errorInput]: errors.page,
                                })}>
                                <span className={css.inputPrefix}>
                                    {hasActiveSession
                                        ? "Current page:"
                                        : "Page number:"}
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
                        {hasActiveSession ? "To stop" : "To start"}
                    </button>
                </form>
            </div>

            {!hasProgress ? (
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

            {showCompletedModal && (
                <Modal onClose={closeCompletedModal}>
                    <ReadingCompleted />
                </Modal>
            )}
        </>
    );
};
