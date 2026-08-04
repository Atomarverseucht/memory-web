import {Game} from "./game";
import {Player} from "../shared/Player";
import {memSets} from "../shared/exampleSets";
import type {AuthPayload, clientPayload, Payload} from "../shared/Payload";
import { Socket } from "socket.io"
import {upsertGameSession} from "./database";
import {v4 as uuidv4} from "uuid";
import type {Error_} from "../shared/Error";

export class Room {
    private game: Game;
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
            if (authPayload) {
                pl.type = "Account";
                pl.accountId = authPayload.userId;
                pl.name = authPayload.name;
            }
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
                if(Array.of(this.users.values()).find(u_ => u.name === u.name)) {
                    this.sendError(user, {code: 406, type: "Not acceptable", message: "requested name is already used!"})
                }
                u.name = data.param
                this.broadcast(this.makePayload("names"))
            } else {
                const error: Error_ = {code: 403, type: "Forbidden", message: "You are not a known-player"}
                this.sockets.get(user)?.send(error)
            }
        }
    }

    broadcast(payload: Payload) {
        this.sockets.forEach((socket: Socket) => {socket.send(payload)});
    }

    send(user: string, data: Payload) {
        this.sockets.get(user)?.send(data);
    }
    sendError(user: string, error: Error_) {
        this.send(user, {error: error});
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
