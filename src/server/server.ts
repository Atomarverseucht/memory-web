import type * as Party from "partykit/server";
import type {Payload} from "../shared/Payload";
import {Game} from "./game";
import {memSets} from "../shared/exampleSets";
import {Player} from "../shared/Player";
import type {BoardUI} from "../shared/BoardUI";

export default class Server implements Party.Server {
  private game: Game = new Game(memSets[0]);
  public users = new Map<string, Player>([["addjhgkj", new Player("example", 132)], ["asjhkhk", new Player("ex", 1332)]]);
  private userCount = 0;
  constructor(readonly room: Party.Room) {}

  // Init
  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    console.log("server.init")
    const user = new Player(`Player ${this.userCount++}`);
    const pl = this.makePayload("init", user.id)
    conn.send(JSON.stringify(pl));
  }

  onMessage(message: string, conn: Party.Connection) {
    console.log("server.onMessage")
    const data = JSON.parse(message)
    if (data.cmd === "open") {
      this.game.openField(conn.id, data.x, this)
    }
  }

  breadcast(payload: Payload) {
    this.room.broadcast(JSON.stringify(payload));
  }

  onRequest(req: Party.Request) {
    console.log("server.onRequest")
    return new Response("nothing");
  }

  makePayload(type: "init" | "turn" | "names", ownId?: string, boardAfterTurn?: BoardUI): Payload {
    switch (type) {
      case "init":
        return {
          board: this.game.boardUI,
          users: Array.from(this.users.values()),
          ownId: ownId
        };
      case "turn":
        return {
          board: this.game.boardUI,
          boardAfterTurn: boardAfterTurn,
        };
      case "names":
        return {
          users: Array.from(this.users.values()),
        }
    }
  }
}

Server satisfies Party.Worker;
