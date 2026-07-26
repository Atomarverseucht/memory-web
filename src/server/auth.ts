import type {Socket} from "socket.io";
import jwt from "jsonwebtoken";
import type {Request} from "express";
import type {AuthPayload} from "../shared/Payload";

export function authenticateSocket(socket: Socket, secret: string): AuthPayload | null {
    const token = socket.handshake.auth?.token;
    if (!token) return null;
    try {
        return jwt.verify(token, secret) as AuthPayload;
    } catch {
        return null;
    }
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
