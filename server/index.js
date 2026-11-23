const express = require("express");
const http = require("node:http");
const crypto = require("node:crypto");
const { Server } = require("socket.io");

const app = express();
const httpServer = http.createServer(app);
const PORT = Number(process.env.PORT || 2567);
const MAX_PLAYERS = 5;
const rooms = new Map();

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "*")
  .split(",").map((value) => value.trim()).filter(Boolean);

const io = new Server(httpServer, {
  cors: {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Origin tidak diizinkan"));
    },
    methods: ["GET", "POST"]
  },
  transports: ["websocket", "polling"],
  pingInterval: 20000,
  pingTimeout: 30000
});

app.get("/", (_req, res) => res.json({
  name: "LEGENDS ARENA Realtime",
  status: "online",
  rooms: rooms.size,
  maxPlayersPerRoom: MAX_PLAYERS
}));
app.get("/health", (_req, res) => res.status(200).json({ ok: true, rooms: rooms.size }));

function cleanName(value) {
  return String(value || "Player").replace(/[<>\u0000-\u001f]/g, "").trim().slice(0, 18) || "Player";
}
function makeCode() {
  return crypto.randomBytes(3).toString("hex").toUpperCase();
}
function publicPlayer(player) {
  return { id: player.id, name: player.name, slot: player.slot, x: player.x, z: player.z, rotation: player.rotation, moving: player.moving };
}
function roomSnapshot(room) {
  return { code: room.code, players: [...room.players.values()].map(publicPlayer), maxPlayers: MAX_PLAYERS };
}
function leaveRoom(socket) {
  const code = socket.data.roomCode;
  if (!code) return;
  const room = rooms.get(code);
  socket.leave(code);
  socket.data.roomCode = null;
  if (!room) return;
  room.players.delete(socket.id);
  socket.to(code).emit("player-left", { id: socket.id });
  if (room.players.size === 0) rooms.delete(code);
  else io.to(code).emit("room-state", roomSnapshot(room));
}

io.on("connection", (socket) => {
  socket.on("room:create", (payload = {}, ack = () => {}) => {
    leaveRoom(socket);
    let code = makeCode();
    while (rooms.has(code)) code = makeCode();
    const room = { code, players: new Map(), createdAt: Date.now() };
    rooms.set(code, room);
    joinRoom(socket, room, payload.name, ack);
  });

  socket.on("room:join", (payload = {}, ack = () => {}) => {
    const code = String(payload.code || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
    const room = rooms.get(code);
    if (!room) return ack({ ok: false, error: "Room tidak ditemukan. Periksa kode undangan." });
    if (room.players.size >= MAX_PLAYERS) return ack({ ok: false, error: "Room sudah penuh (maksimal 5 pemain)." });
    leaveRoom(socket);
    joinRoom(socket, room, payload.name, ack);
  });

  socket.on("player:update", (payload = {}) => {
    const code = socket.data.roomCode;
    const room = rooms.get(code);
    const player = room?.players.get(socket.id);
    if (!player || !payload || !Number.isFinite(payload.x) || !Number.isFinite(payload.z)) return;
    const now = Date.now();
    if (now - (socket.data.lastMoveAt || 0) < 45) return;
    socket.data.lastMoveAt = now;
    const nextX = Math.max(-77, Math.min(77, payload.x));
    const nextZ = Math.max(-77, Math.min(77, payload.z));
    // Reject large single-packet teleports; full authoritative movement validation is a later milestone.
    if (Math.hypot(nextX - player.x, nextZ - player.z) > 2.0) return;
    player.x = nextX;
    player.z = nextZ;
    player.rotation = Number.isFinite(payload.rotation) ? payload.rotation : 0;
    player.moving = Boolean(payload.moving);
    socket.to(code).emit("player:moved", publicPlayer(player));
  });

  socket.on("rtc:signal", (payload = {}) => {
    const code = socket.data.roomCode;
    const room = rooms.get(code);
    if (!room || typeof payload.to !== "string" || !room.players.has(payload.to)) return;
    if (!payload.signal || typeof payload.signal !== "object") return;
    socket.to(payload.to).emit("rtc:signal", { from: socket.id, signal: payload.signal });
  });

  socket.on("room:leave", () => leaveRoom(socket));
  socket.on("disconnect", () => leaveRoom(socket));
});

function joinRoom(socket, room, rawName, ack) {
  const player = {
    id: socket.id,
    name: cleanName(rawName),
    slot: (() => {
      const used = new Set([...room.players.values()].map((p) => p.slot));
      for (let i = 0; i < MAX_PLAYERS; i++) if (!used.has(i)) return i;
      return 0;
    })(),
    x: -48 + (room.players.size % 3) * 3,
    z: 48 + Math.floor(room.players.size / 3) * 3,
    rotation: 0,
    moving: false
  };
  room.players.set(socket.id, player);
  socket.data.roomCode = room.code;
  socket.join(room.code);
  const snapshot = roomSnapshot(room);
  ack({ ok: true, ...snapshot, selfId: socket.id });
  socket.to(room.code).emit("player-joined", publicPlayer(player));
  io.to(room.code).emit("room-state", snapshot);
}

httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`LEGENDS ARENA realtime server listening on ${PORT}`);
});
