import {type NavigateFunction, useNavigate} from "react-router-dom";

export function CodeSection() {
    const nav = useNavigate()
    return (<article className="codeSection">
        <label htmlFor="code">Code:</label>
        <input id="code" type="text" placeholder="roomkey" maxLength={4}/>
        <button id="submitCode" onClick={() => linkToRoom(nav)}>Submit</button>
    </article>);
}

function linkToRoom(nav: NavigateFunction) {
    console.log("hi");
    nav("/room/?roomID=" + (document.getElementById("code") as HTMLInputElement).value );
}