import type {MemorySet} from "./MemorySet";
import type {Player} from "./Player";
import type {BoardUI as Board} from "./BoardUI";

export type Payload = {
    readonly board?: Board;
    readonly boardAfterTurn?: Board;
    readonly users?: Player[];
    readonly ownId?: string;
}

export type startPayload = {
    readonly sets: MemorySet[];
}

export type clientPayload = {
    readonly cmd: "open" | "changeName";
    readonly param: number | string;
}