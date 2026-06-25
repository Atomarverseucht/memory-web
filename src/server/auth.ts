import type {Socket} from "socket.io";
import jwt from "jsonwebtoken";

export type AuthPayload = {
    userId: string;
    name: string;
}

export function authenticateSocket(socket: Socket, secret: string): AuthPayload | null {
    const token = socket.handshake.auth?.token;
    if (!token) return null;
    try {
        return jwt.verify(token, secret) as AuthPayload;
    } catch {
        return null;
    }
}
