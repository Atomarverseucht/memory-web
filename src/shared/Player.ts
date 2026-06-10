import {v4 as uuidv4} from "uuid";

export class Player {
    readonly PlayerID: string = uuidv4();
    constructor(public name: string, public score: number = 0) {}
}