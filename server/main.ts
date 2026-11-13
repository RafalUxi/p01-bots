import { Server } from 'socket.io';
import { savePlayer } from './db/db';
import { validateInput } from './validate';
import { playerType, vec2 } from '../global/types';
import {
  generateStartMap,
  normalizePlayerViewToScreen,
  startPlayerPosition,
  translateStartMapCordsToPlayerView,
} from './game/mapEngine';
import { vecLength } from '../global/math';

const port = Number(process.env.PORT ?? 8080);
const io = new Server(port, { cors: { origin: '*' } });

export let startBaseMap = generateStartMap();
export const playerMap = new Map<string, playerType>();

io.on('connection', (socket) => {
  const playerId: string = socket.handshake.auth.playerId;
  const playerName: string = socket.handshake.auth.playerName;
  const now = Date.now();

  if (!validateInput(playerId, playerName)) {
    socket.disconnect();
    return;
  }

  // server log
  console.log(`connected ${playerId}, name ${playerName}`);

  // Write player data
  savePlayer.run(playerId, playerName, now, now);

  // only loading start data
  socket.on('loadStartData', (d) => {
    // Here need map and players data
    const position = startPlayerPosition();
    const map = normalizePlayerViewToScreen(
      translateStartMapCordsToPlayerView(startBaseMap, position),
      position,
    );
    playerMap.set(playerId, { x: position.x, y: position.y, color: position.color });
    io.to(socket.id).emit('startData', { mapCords: map, startPosition: position });
  });

  // Push
  socket.on('startPush', (d: vec2) => {
    const length = vecLength(d);
    if (length > 15 || length <= 0.1) {
      io.to(socket.id).emit('error', { message: 'length vector error' });
      return;
    }
    // Function to define velX and velY
  });

  socket.on('disconnect', () => {
    console.log(`left ${playerId}`);
  });
});

// Start game loop - event draw map
const gameLoopIntervalHandler = setInterval(() => {
  //io.to(socket.id).emit('drawMap', cords);
}, 50);
