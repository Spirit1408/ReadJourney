import css from "./ReadingPage.module.css";
import { MyBook } from "../../components/MyBook/MyBook";
import { Dashboard } from "../../components/Dashboard/Dashboard";
import { AddReading } from "../../components/AddReading/AddReading";

export default function ReadingPage () {
    return <div className={css.wrapper}>
        <Dashboard>
            <AddReading />
        </Dashboard>

        <MyBook />
    </div>;
}