import type {Title} from "./MemorySet";
import type {Player} from "./Player";
import type {BoardUI as Board} from "./BoardUI";
import type {Error_} from "./Error";

export type Payload = {
    readonly board?: Board;
    readonly users?: Player[];
    readonly ownId?: string;
    readonly error?: Error_;
}

export type startPayload = {
    readonly sets: Title[];
}

export type clientPayload = {
    readonly cmd: "open" | "changeName";
    readonly param: number | string;
}

export type loginPayload = {
    readonly name: string;
    readonly password: string;
}

export type loginResponse = {
    token: string;
    user: { id: string; name: string };
}

export type AuthPayload = {
    userId: string;
    name: string;
}
