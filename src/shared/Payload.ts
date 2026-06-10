import type {MemorySet} from "./MemorySet";
import type {Player} from "./Player";
import type {BoardUI as Board} from "./BoardUI";

export interface Payload {
    readonly board?: Board;
    readonly users?: Player[];
    readonly ownId?: Board;
}

export interface startPayload {
    readonly sets: MemorySet[];
}