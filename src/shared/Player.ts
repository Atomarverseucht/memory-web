import {v4 as uuidv4} from "uuid";

export class Player {
    readonly id: string = uuidv4();
    isOnline: boolean = true;
    constructor(public name: string,
                public score: number = 0,
                public type: "Player" | "Account" | "Bot" = "Player",
                public accountId?: string) {}

    public addScore(){
      this.score++
    }
}