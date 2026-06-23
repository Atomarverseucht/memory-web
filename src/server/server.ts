
import type {clientPayload, Payload} from "../shared/Payload";
import {Game} from "./game";
import {memSets} from "../shared/exampleSets";
import {Player} from "../shared/Player";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import { createServer } from "http";
import { Server} from "socket.io";
import {Room} from "./room";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(helmet());
app.use(express.json());
const httpServer = createServer(app);
const wss = new Server(httpServer, {
  cors: { origin: "http://localhost:5173" }
});
app.use(cors({ origin: "http://localhost:5173" }));

httpServer.listen(PORT, () => console.log(`Express läuft auf Port ${PORT}`));
// --- REST API ---
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// --- WebSocket: Memory Game ---
let rooms = new Map<string, Room>

wss.on("connection", (socket) => {
  const { room: room, memID: memID } = socket.handshake.query;
  const roomId = typeof room === "string" ? room : "default";
  const mem = +(typeof memID === "string" ? memID : "1");
  console.log(roomId, mem)

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


