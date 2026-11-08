import { Server } from 'socket.io';
import { savePlayer } from './db/db';
import { validateInput } from './validate';
import { cordsType } from '../types/types';

const port = Number(process.env.PORT ?? 8080);
const io = new Server(port, { cors: { origin: '*' } });

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

  socket.on('disconnect', () => {
    clearInterval(gameLoopIntervalHandler);
    console.log(`left ${playerId}`);
  });
});

// Start game loop - event draw map
const gameLoopIntervalHandler = setInterval(() => {
  //io.to(socket.id).emit('drawMap', cords);
}, 50);
