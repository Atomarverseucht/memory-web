import {createRoot} from "react-dom/client";

export function Login() {
    return (
        <a>Hello World</a>
    )
}

createRoot(document.getElementById("app")!).render(<Login/>);