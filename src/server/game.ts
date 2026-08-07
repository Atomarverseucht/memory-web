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
        if (!room.users.get(clientID)?.hasTurn) {
            return;
        }
        if (this.timeOuted){
            room.sendError(clientID, {code: 425, type: "Too Early", message: "Please wait until the cards are closed"})
            return;
        }
        if (this.state === 1 && this.lastClient !== clientID) {
            room.sendError(clientID, {code: 425, type: "Too Early", message: "Please wait until the active player ends his turn"})
            return;
        }
        this.boardUI[x] = this.board[x];
        switch(this.state){
            case 0:
                console.log("THIS.STATE: 0")
                this.lastOpened = x;
                this.lastClient = clientID;
                this.state = 1; break;
            case 1:
                console.log("THIS.STATE: 1")
                // case: Not the same Pictures -> negative-case
                if((this.boardUI[x] as Card).picture !== (this.boardUI[this.lastOpened] as Card).picture) {
                    this.timeOuted = true;
                    setTimeout(() => {
                        this.boardUI[this.lastOpened] = "closed";
                        this.boardUI[x] = "closed";
                        this.timeOuted = false;
                        const currentPlayer = room.users.get(clientID);
                        if (currentPlayer) {
                            currentPlayer.hasTurn = false; // FIX: turn-holder must be cleared, not just the "next" one
                        }

                        room.removeID(clientID)
                        if (room.ids_next.length === 0) {
                          room.insertIDs()
                        }
                        this.lastClient = room.ids_next[0]
                        this.state = 0;

                        const nextPlayer = room.users.get(this.lastClient!);
                        if (nextPlayer) {
                            nextPlayer.hasTurn = true; // FIX: actually grant the turn to the next player
                        }

                        room.broadcast(room.makePayload("turn", clientID))
                    }, 2000)

                // case: The same pictures -> positive-case (points++)
                } else {
                    room.users.get(clientID)?.addScore();
                    this.state = 0;
                }
                break;
        }

        if (this.boardUI.every(field => field !== "closed")) {
          shuffle(this.board);
          this.boardUI = Array(64).fill("closed");
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
