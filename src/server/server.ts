
import type * as Party from "partykit/server";
import type {clientPayload, Payload} from "../shared/Payload";
import {Game} from "./game";
import {memSets} from "../shared/exampleSets";
import {Player} from "../shared/Player";
import type {BoardUI} from "../shared/BoardUI";

export default class Server implements Party.Server {
  private game?: Game;
  public users = new Map<string, Player>([["addjhgkj", new Player("example", 132)], ["asjhkhk", new Player("ex", 1332)]]);
  private userCount = 1;
  constructor(readonly room: Party.Room) {}

  // Init
  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    console.log("server.init")
    if(!this.game){
      this.game = new Game(memSets[+(new URL(ctx.request.url).searchParams.get("memID") ?? "0")])
    }
    const user = new Player(`Player ${this.userCount++}`);
    this.users.set(conn.id, user);
    const pl = this.makePayload("init", user.id)
    conn.send(JSON.stringify(pl));
  }

  onMessage(message: string, conn: Party.Connection) {
    console.log("server.onMessage")
    const data: clientPayload = JSON.parse(message)
    if (data.cmd === "open" && typeof data.param === "number") {
      this.game!.openField(conn.id, data.param, this)
    } else if (data.cmd === "changeName" && typeof data.param === "string") {
      this.users.get(conn.id)!.name = data.param
      console.log(this.users.get(conn.id)!.name)
      this.breadcast(this.makePayload("names"))
    }
  }

  breadcast(payload: Payload) {
    this.room.broadcast(JSON.stringify(payload));
  }

  onRequest(req: Party.Request) {
    console.log("server.onRequest")
    return new Response("nothing");
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
          board: this.game!.boardUI
        };
      case "names":
        return {
          users: Array.from(this.users.values()),
        }
    }
  }
}

Server satisfies Party.Worker;
