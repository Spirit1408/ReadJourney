import { LoginForm } from "../components/LoginForm/LoginForm";
import { EntryLayout } from "./../components/EntryLayout/EntryLayout";

export default function LoginPage () {
    return <div className="container">
        <EntryLayout>
            <LoginForm />
        </EntryLayout>
    </div>;
}