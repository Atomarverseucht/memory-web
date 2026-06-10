import type * as Party from "partykit/server";
import type {Payload} from "../shared/Payload";

export default class Server implements Party.Server {

  constructor(readonly room: Party.Room) {}

  // Init
  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {

  }

  onMessage(message: string, sender: Party.Connection) {
    // let's log the message
    console.log(`connection ${sender.id} sent message: ${message}`);
    // we could use a more sophisticated protocol here, such as JSON
    // in the message data, but for simplicity we just use a string
  }

  onRequest(req: Party.Request) {
    // response to any HTTP request (any method, any path) with the current
    // count. This allows us to use SSR to give components an initial value
    return new Response("nothing");
  }

  makePayload(type: string): Payload {
    return {

    }
  }
}

Server satisfies Party.Worker;
