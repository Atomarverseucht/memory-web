import { io as socketIO } from "socket.io-client";
import type {UIState} from "./state";
import type {clientPayload, Payload} from "../../shared/Payload";

export class connectService {
    private socket;
    public changeState: (newState: Partial<UIState>) => void = () => {}

    constructor(memID?: number, readonly roomID?: string){
        const id = roomID ?? randomString();
        this.socket = socketIO(`http://localhost:3000?room=${id}&memID=${memID ?? 0}`);
        this.socket.on("message", (data) => this.onMessage(data));
        connService = this;
    }

    public setChangeState(f: (newState: Partial<UIState>) => void ): void {
        this.changeState = f;
    }

    private onMessage(data: any){
        console.log("message: client", data);
        this.changeState(data as Partial<UIState>);
        console.log("hi")
    }

    public sendMessage(data: clientPayload){
        console.log("sendMessage");
        this.socket.send(data);
    }
}
export let connService: connectService = new connectService(0, "start");

function randomString(length = 4): string {
    return Math.random().toString(36).substring(2, 2 + length);
}