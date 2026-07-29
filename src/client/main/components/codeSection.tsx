import {type NavigateFunction, useNavigate} from "react-router-dom";

export function CodeSection() {
    const nav = useNavigate()
    return (<article className="codeSection">
        <label htmlFor="code">Code:</label>
        <input id="codeId" type="text" placeholder="roomkey" maxLength={4}/>
        <button id="submitCode" onClick={() => linkToRoom(nav)}>Submit</button>
    </article>);
}

function linkToRoom(nav: NavigateFunction) {
    nav("/room/?roomID=" + (document.getElementById("codeId") as HTMLInputElement).value );
}
