# P01 Bots (working title)

A browser .io game that starts with **100 named bots**. Every new human who plays retires one bot, forever.
Bots are always labelled `[bot]`. The question: _how long until humans replace 100 bots?_

## Game

- **Slingshot paint:** drag, aim, release. You fly in a straight line and bounce off walls. Every tile you pass becomes yours. Hit another player mid-flight to knock them out.
- **Territory persists** after you are knocked out, until someone paints over it. The map fills up all day.
- **New map every day at 00:00 UTC** (seed = date). The day's ranking goes to the hall of fame.
- **Square grid**, ranking = % of the map (daily best peak, plus an all-time record).

## Bots

- A pool of 100 named bots with personalities (`farmer / hunter / coward`).
- Bots use the same input API as humans (a virtual player with an AI controller).
- They fill free slots in the room (~40 players) from the remaining pool.
- **Retirement:** a new human (first session >= 60 s) retires one bot permanently. All retirements are listed on the public wall of retirees.

## Stack

| Part    | Choice                                                                                         |
| ------- | ---------------------------------------------------------------------------------------------- |
| Server  | TypeScript, Node.js 24+, `ws`, authoritative tick ~20 Hz                                       |
| Client  | TypeScript, Canvas, Vite, touch + mouse, PWA-ready (Android TWA later)                         |
| Data    | SQLite on the server (metrics, retirements, rankings, refs); map snapshots as `.json.gz` files |
| Hosting | Client on Vercel, server on Oracle Cloud VM behind Caddy (HTTPS/WSS)                           |

## Debug and recording modes

- `?debug=1`: bot target lines, states (`farm/chase/flee`), reaction time, server tick
- `?spectate=1`: whole map, zoom, follow a player, no UI
- `?ref=<name>`: records the source of a player's first session

## Dev

```bash
npm install
cp .env.example .env   # optional, defaults work locally
npm run dev:server
npm run dev:client
```

## Privacy

There are no accounts. We store your nick, a random ID kept in `localStorage`, and a hash of your IP salted with a daily salt (the raw IP is never stored).
The stats are used for a YouTube video about this experiment.
