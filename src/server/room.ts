import {Game} from "./game";
import {Player} from "../shared/Player";
import {memSets} from "../shared/exampleSets";
import type {clientPayload, Payload} from "../shared/Payload";
import { Socket } from "socket.io"

export class Room {
    private game: Game;
    public users = new Map<string, Player>();
    private userCount = 1;
    private sockets = new Map<string, Socket>();

    constructor(memSet: number) {
       this.game = new Game(memSets[memSet]);
    }

    initUser(socket: Socket) {
        const name = `Player ${this.userCount}`;
        console.log("conn.init")
        const user = new Player(name);
        this.users.set(socket.id, user);
        const pl = this.makePayload("init", user.id)
        this.sockets.set(socket.id, socket);
        socket.send(pl);
    }

    onMessage(data: clientPayload, user: string) {
        console.log("server.onMessage")
        if (data.cmd === "open" && typeof data.param === "number") {
            this.game!.openField(user, data.param, this)
        } else if (data.cmd === "changeName" && typeof data.param === "string") {
            this.users.get(user)!.name = data.param
            console.log(this.users.get(user)!.name)
            this.breadcast(this.makePayload("names"))
        }
    }

    breadcast(payload: Payload) {
        this.sockets.forEach((socket: Socket) => {socket.send(payload)});
    }

    onRequest() {
        console.log("server.onRequest")
        return new Response("nothing");
    }

    exitUser(userID: string){
        const player = this.users.get(userID);
        if (player) {
            player.isOnline = false;
            this.users.set(userID, player)
        }
    }

    makePayload(type: "init" | "turn" | "names", ownUserId?: string): Payload {
        switch (type) {
            case "init":
                return {
                    board: this.game!.boardUI,
                    users: Array.from(this.users.values()),
                    ownId: ownUserId
                };
            case "turn":
                return {
                    board: this.game!.boardUI,
                    users: Array.from(this.users.values()),
                };
            case "names":
                return {
                    users: Array.from(this.users.values()),
                }
        }
    }
}
