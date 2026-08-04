import type {Socket} from "socket.io";
import jwt from "jsonwebtoken";
import type {Request} from "express";
import type {AuthPayload} from "../shared/Payload";
import {getUserById} from "./database";

// checks if the AuthPayload is valid and the account still exists
export async function authenticateSocket(socket: Socket, secret: string): Promise<AuthPayload | null> {
    const token = socket.handshake.auth?.token;
    if (!token) return null;
    let payload: AuthPayload;
    try { payload = jwt.verify(token, secret) as AuthPayload; } catch { return null; }
    const user = await getUserById(payload.userId);
    if (!user) return null;
    return payload;
}

export function verifyTokenFromHeader(req: Request, secret: string): AuthPayload | null {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) return null;
    const token = header.slice(7);
    try {
        return jwt.verify(token, secret) as AuthPayload;
    } catch {
        return null;
    }
}
