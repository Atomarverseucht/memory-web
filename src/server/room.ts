import {Game} from "./game";
import {Player} from "../shared/Player";
import {memSets} from "../shared/exampleSets";
import type {clientPayload, Payload} from "../shared/Payload";
import { Socket } from "socket.io"
import type {AuthPayload} from "./auth";
import {addGameSession} from "./database";

export class Room {
    private game: Game;
    public users = new Map<string, Player>();
    private userCount = 1;
    private sockets = new Map<string, Socket>();

    constructor(public memSet: number) {
       this.game = new Game(memSets[memSet]);
    }

    initUser(socket: Socket, authPayload: AuthPayload | null) {
        console.log("conn.init")
        const name = authPayload?.name ?? `Player ${this.userCount}`
        this.userCount++;
        const type = authPayload ? "Account" : "Player";
        const accountId = authPayload?.userId;
        const user = new Player(name, 0, type, accountId);
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
            if (player.type === "Account" && player.accountId && player.score > 0) {
                addGameSession(player.accountId, this.memSet, player.score);
            }
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
