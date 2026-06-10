import type {BoardUI} from "../shared/BoardUI";
import type {Card, MemorySet} from "../shared/MemorySet";

export class Game {
    private board: BoardUI;
    public boardUI: BoardUI = new Array(64).fill("closed")
    public state: 0 | 1 | 2 = 0
    private lastClient?: string = undefined

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

    openField(clientID: string, x: number, y: number) {

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