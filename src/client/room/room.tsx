import {createRoot} from "react-dom/client";

export function App(){
    return <a> I am an example of a second page</a>;
}

createRoot(document.getElementById("app")!).render(<App/>);