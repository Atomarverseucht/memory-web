import {Game} from "./game";
import {Player} from "../shared/Player";
import {memSets} from "../shared/exampleSets";
import type {AuthPayload, clientPayload, Payload} from "../shared/Payload";
import { Socket } from "socket.io"
import {upsertGameSession} from "./database";
import {v4 as uuidv4} from "uuid";

export class Room {
    private game: Game;
    private roomId = uuidv4();
    public users = new Map<string, Player>();
    private userCount = 1;
    private sockets = new Map<string, Socket>();

    constructor(public memSet: number) {
       this.game = new Game(memSets[memSet]);
    }

    initUser(socket: Socket, authPayload: AuthPayload | null, playerID: string) {
        console.log("conn.init")
        const p = Array.from(this.users.entries()).find(([ , pl]) => pl.id === playerID);
        let user: Player;
        if(p){
            const [oldK, pl] = p
            this.users.delete(oldK);
            pl.isOnline = true;
            user = pl
        } else {
            const name = authPayload?.name ?? `Player ${this.userCount}`
            this.userCount++;
            const type = authPayload ? "Account" : "Player";
            const accountId = authPayload?.userId;
            user = new Player(name, 0, type, accountId, playerID);
        }
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
            const u = this.users.get(user)
            if (u) {
                u.name = data.param
                console.log(this.users.get(user)!.name)
            }
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
            console.log("leave", player.accountId);
            player.isOnline = false;
            this.users.delete(userID);
            this.users.set(userID, player)
            if (player.type === "Account" && player.accountId) {
                upsertGameSession(player.accountId, this.roomId, this.memSet, player.score);
            }
        }
    }

    public getPlayers() {
        return Array.from(this.users.values()).filter(p => p.isOnline)
    }

    makePayload(type: "init" | "turn" | "names", ownUserId?: string): Payload {
        switch (type) {
            case "init":
                return {
                    board: this.game!.boardUI,
                    users: this.getPlayers(),
                    ownId: ownUserId
                };
            case "turn":
                return {
                    board: this.game!.boardUI,
                    users: this.getPlayers(),
                };
            case "names":
                return {
                    users: this.getPlayers(),
                }
        }
    }
}
