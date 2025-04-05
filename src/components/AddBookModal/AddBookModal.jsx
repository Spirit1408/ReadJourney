import css from './AddBookModal.module.css'
import testImg from '../../../public/test.png'

export const AddBookModal = () => {
    return <div className={css.wrapper}>
        <img src={testImg} alt="add book sample" className={css.cover}/>

        <h3 className={css.title}>Trosha</h3>

        <p className={css.author}>Vasyl Shkliar</p>

        <p className={css.pagesAmount}>416 pages</p>

        <button type="button" className={css.button}>Add to library</button>
    </div>
};