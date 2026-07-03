import type {clientPayload, loginPayload, startPayload} from "../shared/Payload";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import { createServer } from "http";
import { Server} from "socket.io";
import {Room} from "./room";
import type {MemorySet} from "../shared/MemorySet";
import {memSets} from "../shared/exampleSets";
import {addUser, getUser} from "./database";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import type {AuthPayload} from "./auth";
import {authenticateSocket} from "./auth";

const JWT_SECRET = process.env.JWT_SECRET || "memory-dev-secret-change-in-production";

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
    const id = crypto.randomUUID();
    addUser(id, name, password);
    const token = jwt.sign({ userId: id, name } satisfies AuthPayload, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id, name } });
});

app.post("/api/login", (req, res) => {
    const { name, password } = req.body as loginPayload;
    if (!name || !password) {
        res.status(400).json({ error: "Name and password required" });
        return;
    }
    const user = getUser(name, password);
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

wss.on("connection", (socket) => {
    const { room: room, memID: memID } = socket.handshake.query;
    const roomId = typeof room === "string" ? room : "default";
    const mem = +(typeof memID === "string" ? memID : "1");
    console.log(roomId, mem);
    if (!rooms.has(roomId)) {
        rooms.set(roomId, new Room(mem));
    }
    const room_ = rooms.get(roomId)!;
    room_.initUser(socket);

    socket.on("message", (data) => {
        const msg: clientPayload = data as clientPayload;
        room_.onMessage(msg, socket.id);
    });

    socket.on("close", () => {
        room_.exitUser(socket.id);
    });
});