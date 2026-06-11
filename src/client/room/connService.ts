import PartySocket from "partysocket";
import type {UIContext, UIState} from "./state";
import type {clientPayload} from "../../shared/Payload";

export class connectService {
    private socket: PartySocket
    public changeState: (newState: Partial<UIState>) => void = () => {}

    constructor(readonly roomID?: string){
        const id = roomID ?? randomString();
        this.socket = new PartySocket({
            host: window.location.host,
            room: id,
            maxRetries: 0,
        });
        this.socket.onmessage = ev => this.onMessage(ev)
        connService = this;
    }

    public setChangeState(f: (newState: Partial<UIState>) => void ): void {
        this.changeState = f;
    }

    private onMessage(message: MessageEvent){
        console.log("message")
        const state = message.data as Partial<UIState>;
        this.changeState(state);
    }

    public sendMessage(data: clientPayload){
        console.log("sendMessage");
        this.socket.send(JSON.stringify(data));
    }
}
export let connService: connectService = new connectService("start");
function randomString(length = 4): string {
    return Math.random().toString(36).substring(2, 2 + length);
}