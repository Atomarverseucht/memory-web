import type {AuthPayload, clientPayload, loginPayload, startPayload} from "../shared/Payload";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import { createServer } from "http";
import { Server} from "socket.io";
import {Room} from "./room";
import {memSets} from "../shared/exampleSets";
import {addUser, getGameSessions, getUser, getUserById} from "./database";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {verifyTokenFromHeader} from "./auth";
import {authenticateSocket} from "./auth";

const JWT_SECRET = process.env.JWT_SECRET ?? "testSecret&%%CW&%WZVezvr5vew$Ez"

export let rooms = new Map<string, Room>();

export const app = express();
app.use(helmet());
app.use(express.json());
export const httpServer = createServer(app);
export const wss = new Server(httpServer, {
    cors: { origin: "http://localhost:5173" }
});
app.use(cors({ origin: "http://localhost:5173" }));

app.post("/api/register", (req, res) => {
    const { name, password } = req.body as loginPayload;
    if (!name || !password) {
        res.status(400).json({ error: "Name and password required" });
        return;
    }
    const id: string = crypto.randomUUID();
    addUser(id, name, password);
    const token = jwt.sign({ userId: id, name } satisfies AuthPayload, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id, name } });
});

app.post("/api/login", async (req, res) => {
    const { name, password } = req.body as loginPayload;
    if (!name || !password) {
        res.status(400).json({ error: "Name and password required" });
        return;
    }
    const user = await getUser(name, password);
    if (!user) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
    }
    const token = jwt.sign({ userId: user.id, name: user.name } satisfies AuthPayload, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user.id, name: user.name } });
});

app.get("/api/health", (_req, res) =>
    res.json({ status: "ok" }));

app.get("/api", (_req, res) =>
    res.json({ info: "This endpoint is not in use" }));

app.get("/api/memSets", (_req, res) => {
    const out: startPayload = {sets: memSets.map(ms => ms.title)};
    res.json(out);
    console.log(out);
});

app.get("/api/account", (req, res) => {
    const targetId = req.query.accountId as string | undefined;

    // Kein accountId -> eigener Account (aus JWT)
    if (!targetId) {
        const auth = verifyTokenFromHeader(req, JWT_SECRET);
        if (!auth) { res.status(401).json({ error: "Unauthorized" }); return; }
        getUserById(auth.userId).then((user) => {
            if (!user) { res.status(404).json({ error: "User not found" }); return; }
            getGameSessions(user.id).then(sessions => {
                const totalScore = sessions.reduce((sum: number, s: any) => sum + s.score, 0);
                res.json({ user, sessions, totalScore });
                return;
            })
        });
    } else {
        // Fremder Account -> direkt aus DB
        getUserById(targetId).then(user => {
            if (!user) {
                res.status(404).json({ error: "User not found" }); return; }
            getGameSessions(user.id).then(sessions => {
                const totalScore = sessions.reduce((sum: number, s: any) => sum + s.score, 0);
                res.json({ user, sessions, totalScore });
            })
        })
    }
});

wss.on("connection", (socket) => {
    const authPayload = authenticateSocket(socket, JWT_SECRET);
    const { room, memID, playerID } = socket.handshake.query;
    const roomId = typeof room === "string" ? room : "default";
    const mem = +(typeof memID === "string" ? memID : "1");
    console.log(roomId, mem);
    if (!rooms.has(roomId)) {
        rooms.set(roomId, new Room(mem));
    }
    const room_ = rooms.get(roomId)!;
    room_.initUser(socket, authPayload, playerID as string);

    socket.on("message", (data) => {
        const msg: clientPayload = data;
        room_.onMessage(msg, socket.id);
    });

    socket.on("close", () => {
        room_.exitUser(socket.id);
    });
});