import PartySocket from "partysocket";
import {UIContext} from "./state";

export class connectService {
    private socket: PartySocket

    constructor(readonly roomID?: string){
        const id = roomID ?? randomString();
        this.socket = new PartySocket({
            host: window.location.host,
            room: id,
            maxRetries: 0,
        });
        this.socket.onmessage = ev => this.onMessage(ev)
    }

    private onMessage(message: MessageEvent){
    }
}
export let connService: connectService = new connectService("start");
function randomString(length = 4): string {
    return Math.random().toString(36).substring(2, 2 + length);
}