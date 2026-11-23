# LEGENDS ARENA Realtime Server

Node.js + Socket.IO service for private game rooms, player presence, movement relay, and WebRTC signaling.

## Run locally
1. Install Node.js 20 or newer.
2. In this directory run `npm install`.
3. Run `npm start`.
4. Health check: `http://localhost:2567/health`.

## Deploy as a persistent Node service
Deploy this directory (`server/`) to a Node hosting service that supports persistent WebSocket connections, for example Render Web Service:
- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Environment: `NODE_ENV=production`
- Optional `ALLOWED_ORIGINS=https://legends-arena-green.vercel.app`

After deployment, copy the service HTTPS URL (for example `https://your-service.onrender.com`) into the Multiplayer Server URL field in the game's lobby. The browser client uses Socket.IO and automatically upgrades to secure WebSocket.

## Events
- `room:create`, `room:join`, `room:leave`
- `room-state`, `player-joined`, `player-left`
- `player:update`, `player:moved`
- `rtc:signal` for peer-to-peer microphone/camera signaling

Rooms are in-memory and reset when the service restarts. This is an MVP service for up to five players per room, not yet a ranked/production anti-cheat server. The current browser game still runs its combat simulation locally; this service synchronizes room membership and player movement and relays WebRTC signaling. Shared combat, minion, turret, health, and match-result authority are a separate multiplayer-engine milestone.
