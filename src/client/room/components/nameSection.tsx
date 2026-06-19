import {connService} from "../connService";

function submitName() {
    const nameInput = (document.getElementById("name-input")! as HTMLInputElement).value;
    connService.sendMessage({cmd: "changeName", param: nameInput})
}

export function NameSection() {
    return (
        <article>
            <section className="nameSection">
                <label htmlFor="name-input">Username:</label>
                <input id="name-input" type="text" placeholder="Max Mustermann"
                  onKeyDown={(key) => (key.key === "Enter") ? submitName() : null}/>
                <button id="name-submit" onClick={submitName}
                    >Submit</button>
            </section>
        </article>
    );
}