import {createRoot} from "react-dom/client";

export function App(){
    return (<main>
        <article>
            <h2>Please select your THEME</h2>
            <p>The themes are the indicator with which set you will be playing.</p>
        </article>
    </main>);
}

createRoot(document.getElementById("app")!).render(<App/>);