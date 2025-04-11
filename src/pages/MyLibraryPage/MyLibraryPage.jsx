import css from "./MyLibraryPage.module.css";
import { Dashboard } from './../../components/Dashboard/Dashboard';
import { MyLibraryBooks } from './../../components/MyLibraryBooks/MyLibraryBooks';
import { AddBook } from "../../components/AddBook/AddBook";
import { RecommendedBooksLibrary } from "../../components/RecommendedBooksLibrary/RecommendedBooksLibrary";


export default function MyLibraryPage () {
    return <div className={css.wrapper}>
        <Dashboard>
            <AddBook />

            <RecommendedBooksLibrary />
        </Dashboard>

        <MyLibraryBooks />
    </div>;
}