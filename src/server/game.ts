import type {BoardUI} from "../shared/BoardUI";
import type {Card, MemorySet} from "../shared/MemorySet";
import Server from "./server";

export class Game {
    private readonly board: BoardUI;
    public boardUI: BoardUI = new Array(64).fill("closed")
    public state: 0 | 1 = 0
    private lastClient?: string = undefined
    private lastOpened: number = 0
    private inUse: boolean = false

    constructor(memSet: MemorySet) {
        let numbers = new Array<number>();
        let b = new Array<Card>();
        b = shuffle(memSet.cards);
        b = b.slice(0,32);
        b = [...b, ...b]
        b = shuffle(b)
        this.board = b;
    }

    public openField(clientID: string, x: number, server: Server) {
        if(this.inUse) return;

        this.boardUI[x] = this.board[x];
        server.breadcast(server.makePayload("turn", clientID))
        switch(this.state){
            case 0:
                this.lastOpened = x;
                this.lastClient = clientID;
                this.state = 1; break;
            case 1:
                if(this.boardUI[x] !== this.boardUI[this.lastOpened]){
                    this.inUse = true;
                    setTimeout(() => {
                        this.boardUI[this.lastOpened] = "closed";
                        this.boardUI[x] = "closed";
                        server.breadcast(server.makePayload("turn", clientID))
                        this.inUse = false;
                    }, 3000)
                }
                this.state = 0; break;
        }
    }
}

function random(max: number) {
    return Math.floor(Math.random() * max);
}

function shuffle<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
    return arr;
}