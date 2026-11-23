# Project Status — LEGENDS ARENA

## Current delivery

The repository contains the standalone Three.js game in `index.html`, plus a Socket.IO Node.js realtime service in `server/`.

## Implemented

- Three-dimensional Eternal Rift arena, player-controlled Kael, HUD, skills, attacks, minions, structures, shop, and match UI.
- Audio controls: master volume, music volume, SFX volume, mute, reset, and browser-local persistence.
- Online party rooms for up to five players with create/join codes and player presence.
- Player avatar position/rotation relay and remote avatar interpolation.
- WebRTC signaling for peer-to-peer microphone and camera media.
- Server health endpoint and CORS origin allow-list configuration.

## Important multiplayer scope

This is an **online party / movement-sync MVP**, not yet a fully authoritative MOBA match. Combat simulation, HP, damage, cooldowns, minions, turrets, boss, objectives, and match results still run locally in each browser and are not shared server state. Room data is in memory and resets when the Node process restarts.

## Deployment

- Static frontend: deploy repository root to Vercel as static HTML.
- Realtime backend: deploy the `server/` directory as a persistent Node.js WebSocket service.
- Set `ALLOWED_ORIGINS=https://legends-arena-green.vercel.app` on the backend.
- Paste the backend HTTPS URL into the game's **URL server multiplayer** field.

See [../server/README.md](../server/README.md).

## Validation status

The repository update includes source-level implementation and deployment instructions. A live multiplayer session has not yet been verified because the realtime backend still needs to be deployed and configured. Browser/device testing is still required.

## Next milestones

1. Make combat and all match entities server-authoritative.
2. Add reconnect/resume and room cleanup.
3. Add TURN relay for restrictive NAT/firewall networks.
4. Add authentication, persistent profiles, matchmaking, and anti-cheat.
5. Add automated browser/device and load testing.
