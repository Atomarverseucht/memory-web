import {createRoot} from "react-dom/client";
import {memSets} from "../../shared/exampleSets";
import {Board} from "./components/board";
import {PlayerBar} from "./components/playerBar";
import {Player} from "../../shared/Player";

function nothing() {}
export function App(){
    return (
        <main>
            <article>
                <section className="nameSection">
                    <label htmlFor="name-input">Username:</label>
                    <input id="name-input" type="text" placeholder="Max Mustermann"/>
                    <button id="name-submit" onClick={nothing}>Submit</button>
                </section>
            </article>
            <section className="content">
                <Board board={memSets[1].cards.slice(0, 64)}/>
                <PlayerBar p={players}/>
            </section>
        </main>
    );
}
const players = [new Player("Player1"), new Player("LongExamplePlayerName", 10000000000)]

createRoot(document.getElementById("app")!).render(<App/>);