import type {BoardUI} from "../../../shared/BoardUI";


export function Board({board}: BoardUI){
    return (
        <section className="board">
            { board.map((card, i) =>
                 (typeof card === "object") ?
                    ( <button>
                        <img
                            src={card.picture}
                            alt={card.altText}/>
                    </button> ) :
                    ( <button className="closed">
                        <p> </p>
                    </button> )
            )}
        </section>
    )
}