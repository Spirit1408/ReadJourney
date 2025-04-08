import css from "./Modal.module.css";
import sprite from "/sprite.svg";
import { useEffect, useState, useCallback } from "react";

export const Modal = ({ children, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = useCallback(() => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [onClose]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === "Escape") {
            handleClose();
        }
    }, [handleClose]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div 
            className={`${css.modalOverlay} ${isClosing ? css.fadeOut : css.fadeIn}`} 
            onClick={handleOverlayClick}
        >
            <div className={`${css.modal} ${isClosing ? css.fadeOut : css.fadeIn}`}>
                <button 
                    type="button" 
                    className={css.closeBtn} 
                    onClick={handleClose}
                >
                    <svg className={css.closeIcon}>
                        <use href={`${sprite}#icon-close`}></use>
                    </svg>
                </button>
                {children}
            </div>
        </div>
    );
};
