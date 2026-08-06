import { type loginResponse } from "../../shared/Payload";
import { useNavigate, Link } from "react-router-dom";
import {useState} from "react";
import {Loader} from "./components/Loader";

export function Register() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState<boolean>(false);

    async function submitRegister() {
        const name = (document.getElementById("nameId")! as HTMLInputElement).value;
        const password = (document.getElementById("passwordId")! as HTMLInputElement).value;
        setLoading(true);
        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, password }),
        });
        if (!res.ok) {
            setLoading(false);
            const err = await res.json();
            alert(err.error || "Registrierung fehlgeschlagen");
            return;
        }
        const data: loginResponse = await res.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
    }

    return (
        <>
        { isLoading ? (<Loader />) : (
            <>
                <p><Link to="/login">Account yet? Click here for login</Link></p>
                <article className="loginSection">
                    <p>Register:</p>
                    <section>
                        <label htmlFor="name">name:</label>
                        <input id="nameId" type="text" placeholder="username" maxLength={16} />
                    </section>
                    <section>
                        <label htmlFor="password">password:</label>
                        <input id="passwordId" type="password" placeholder="password" />
                    </section>
                    <button onClick={submitRegister}>Registrieren</button>

                </article>
            </>
        )}
    </>);
}
