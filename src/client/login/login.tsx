import {type loginResponse} from "../../shared/Payload";
import {Link, useNavigate} from "react-router-dom";

export function Login() {
    const navigate = useNavigate();

    async function submitLogin() {
        const nameInput = (document.getElementById("name")! as HTMLInputElement).value;
        const passwordInput = (document.getElementById("password")! as HTMLInputElement).value;
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({name: nameInput, password: passwordInput}),
        });
        if (!res.ok) {
            alert("Login fehlgeschlagen");
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
        <article className="loginSection">
            <p>Login: </p>
            <section>
                <label htmlFor="name">name: </label>
                <input id="name" type="text" placeholder="username" maxLength={16}/>
            </section>
            <section>
                <label htmlFor="password">password: </label>
                <input id="password" type="password" placeholder="password"/>
            </section>
            <button id="submitLogin" onClick={submitLogin}>Submit</button>
        </article>
        </>
    )
}
