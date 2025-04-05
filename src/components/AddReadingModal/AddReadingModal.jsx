import css from './AddReadingModal.module.css'
import testImg from '../../../public/test.png'

export const AddReadingModal = () => {
    return <div className={css.wrapper}>
            <img src={testImg} alt="add book sample" className={css.cover}/>
    
            <h3 className={css.title}>Trosha</h3>
    
            <p className={css.author}>Vasyl Shkliar</p>
    
            <p className={css.pagesAmount}>416 pages</p>
    
            <button type="button" className={css.button}>Start reading</button>
        </div>
}