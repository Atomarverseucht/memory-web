import type {BoardUI} from "../../../shared/BoardUI";
import {useUIState} from "../state";
import {connService} from "../connService";

function sendTurn(indx: number) {
    console.log("sendTurn")
    connService.sendMessage({cmd: "open", x: indx})
}
export function Board(){
    const ctx = useUIState()
    const board = ctx.state.board;
    console.log(board)
    return (
        <section className="board">
            { board.map((card, i) =>
                 (typeof card === "object") ?
                    ( <button>
                        <img
                            src={card.picture}
                            alt={card.altText}/>
                    </button> ) :
                    ( <button className="closed" onClick={() => sendTurn(i)}>
                        <p> </p>
                    </button> )
            )}
        </section>
    )
}