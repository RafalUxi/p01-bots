import { Server } from 'socket.io';

const port = Number(process.env.PORT ?? 8080);
const io = new Server(port, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log(`connected ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`left ${socket.id}`);
  });
});
