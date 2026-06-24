export function CodeSection() {
    return (<article className="codeSection">
        <label htmlFor="code">Code:</label>
        <input id="code" type="text" placeholder="roomkey" maxLength={6}/>
        <button id="submitCode" onClick={nothing}>Submit</button>
    </article>);
}

function nothing() {}