import {createRoot} from "react-dom/client";

function nothing() {}
export function App(){
    return (
        <article>
            <section className="nameSection">
                <label htmlFor="name-input">Username:</label>
                <input id="name-input" type="text" placeholder="Max Mustermann"/>
                <button id="name-submit" onClick={nothing}>Submit</button>
            </section>
        </article> );
}

createRoot(document.getElementById("app")!).render(<App/>);