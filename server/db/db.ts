import { mkdirSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

mkdirSync('data', { recursive: true });

export const db = new DatabaseSync('data/game.sqlite');
db.exec('PRAGMA journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS players (
    id TEXT PRIMARY KEY,
    nick TEXT,
    first_seen INTEGER,
    last_seen INTEGER
  )
`);

export const savePlayer = db.prepare(`
  INSERT INTO players (id, nick, first_seen, last_seen) VALUES (?, ?, ?, ?)
  ON CONFLICT(id) DO UPDATE SET nick = excluded.nick, last_seen = excluded.last_seen
`);

export const getPlayer = db.prepare('SELECT * FROM players WHERE id = ?');
