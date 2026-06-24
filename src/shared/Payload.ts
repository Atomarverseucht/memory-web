import type {Title} from "./MemorySet";
import type {Player} from "./Player";
import type {BoardUI as Board} from "./BoardUI";

export type Payload = {
    readonly board?: Board;
    readonly users?: Player[];
    readonly ownId?: string;
}

export type startPayload = {
    readonly sets: Title[];
}

export type clientPayload = {
    readonly cmd: "open" | "changeName";
    readonly param: number | string;
}