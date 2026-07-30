import {type loginResponse} from "../../shared/Payload";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {Loader} from "./components/Loader";

export function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    async function submitLogin() {
        const nameInput = (document.getElementById("nameId")! as HTMLInputElement).value;
        const passwordInput = (document.getElementById("passwordId")! as HTMLInputElement).value;
        setLoading(true);
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({name: nameInput, password: passwordInput}),
        });
        if (!res.ok) {
            setLoading(false);
            alert("Login failed");
            return;
        }
        const data: loginResponse = await res.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
    }

    return (
        <>
            <p><Link to="/register">Noch kein Konto? Hier registrieren</Link></p>
            {loading ? (<Loader />) : (
        <article className="loginSection">
            <p>Login: </p>
            <section>
                <label htmlFor="name">name: </label>
                <input id="nameId" type="text" placeholder="username" maxLength={16}/>
            </section>
            <section>
                <label htmlFor="password">password: </label>
                <input id="passwordId" type="password" placeholder="password"/>
            </section>
            <button id="submitLogin" onClick={submitLogin}>Submit</button>

        </article>
        )}
        </>
    )
}
