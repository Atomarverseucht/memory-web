import {v4 as uuidv4} from "uuid";

export class Player {
    isOnline: boolean = true;
    constructor(public name: string,
                public score: number = 0,
                public type: "Player" | "Account" = "Player",
                public accountId?: string,
                public readonly id = uuidv4(),
                public hasTurn: boolean = true
    ) {}

    public addScore(){
      this.score++
    }
}
