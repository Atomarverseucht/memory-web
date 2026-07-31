import type {BoardUI} from "../shared/BoardUI";
import type {Card, MemorySet} from "../shared/MemorySet";
import {Room} from "./room";

export class Game {
    private readonly board: BoardUI;
    public boardUI: BoardUI = new Array(64).fill("closed")
    public state: 0 | 1 = 0
    private lastClient?: string = undefined
    private lastOpened: number = 0
    private timeOuted: boolean = false

    constructor(memSet: MemorySet) {
        let b;
        b = shuffle(memSet.cards);
        b = b.slice(0,32);
        b = [...b, ...b]
        b = shuffle(b)
        this.board = b;
    }

    public openField(clientID: string, x: number, room: Room) {
        if(this.timeOuted || (this.state === 1 && this.lastClient !== clientID)) return;

        this.boardUI[x] = this.board[x];
        switch(this.state){
            case 0:
                this.lastOpened = x;
                this.lastClient = clientID;
                this.state = 1; break;
            case 1:
                // case: Not the same Pictures -> negative-case
                if((this.boardUI[x] as Card).picture !== (this.boardUI[this.lastOpened] as Card).picture) {
                    this.timeOuted = true;
                    setTimeout(() => {
                        this.boardUI[this.lastOpened] = "closed";
                        this.boardUI[x] = "closed";
                        room.broadcast(room.makePayload("turn", clientID))
                        this.timeOuted = false;
                    }, 2000)

                // case: The same pictures -> positive-case (points++)
                } else {
                    room.users.get(clientID)?.addScore();
                }
                this.state = 0; break;
        }
        room.broadcast(room.makePayload("turn", clientID))
    }
}

function shuffle<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
    return arr;
}
