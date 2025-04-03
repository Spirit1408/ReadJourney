import { RegisterForm } from "../components/RegisterForm/RegisterForm";
import { EntryLayout } from "./../components/EntryLayout/EntryLayout";

export default function RegisterPage () {
    return <div className="container">
        <EntryLayout>
            <RegisterForm />
        </EntryLayout>
    </div>;
}