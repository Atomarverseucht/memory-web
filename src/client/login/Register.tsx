import { type loginResponse } from "../../shared/Payload";
import { useNavigate, Link } from "react-router-dom";

export function Register() {
    const navigate = useNavigate();

    async function submitRegister() {
        const name = (document.getElementById("name")! as HTMLInputElement).value;
        const password = (document.getElementById("password")! as HTMLInputElement).value;
        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, password }),
        });
        if (!res.ok) {
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
        <article className="loginSection">
            <p>Registrieren:</p>
            <section>
                <label htmlFor="name">name:</label>
                <input id="name" type="text" placeholder="username" maxLength={16} />
            </section>
            <section>
                <label htmlFor="password">password:</label>
                <input id="password" type="password" placeholder="password" />
            </section>
            <button onClick={submitRegister}>Registrieren</button>
            <p><Link to="/login">Bereits ein Konto? Hier anmelden</Link></p>
        </article>
    );
}