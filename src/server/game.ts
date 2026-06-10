import type {BoardUI} from "../shared/BoardUI";
import type {Card, MemorySet} from "../shared/MemorySet";

export class Game {
    private readonly board: BoardUI;
    public boardUI: BoardUI = new Array(64).fill("closed")
    public state: 0 | 1 = 0
    private lastClient?: string = undefined
    private lastOpened: number = 0

    constructor(memSet: MemorySet) {
        let numbers = new Array<number>();
        let b = new Array<Card>();
        for (let i = 0; i <= 32; i++){
            const idx = random(memSet.cards.length - 1);
            if(numbers.includes(idx)){
                i--;
            } else {
                numbers.push(idx);
                b.push(memSet.cards[idx]);
                b.push(memSet.cards[idx]);
            }
        }
        b = shuffle(b);
        this.board = b;
    }

    public openField(clientID: string, x: number) {
        let afterTurnBoard: BoardUI | undefined = undefined;
        switch(this.state){
            case 0:
                this.lastOpened = x;
                this.lastClient = clientID;
                this.state = 1; break;
            case 1:
                if (clientID !== this.lastClient || (this.boardUI[x] !== "closed")) {return;}
                afterTurnBoard = this.boardUI;
                afterTurnBoard[this.lastOpened] = "closed";
                this.state = 0; break;
        }
        this.boardUI[x] = this.board[x];
        return afterTurnBoard;
    }
}

function random(max: number) {
    return Math.floor(Math.random() * max);
}

function shuffle<T>(array: T[]): T[] {
    const arr = [...array]; // Kopie, um Original nicht zu verändern
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
    return arr;
}