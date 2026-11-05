import { WebSocketServer } from 'ws';

const port = Number(process.env.PORT ?? 8080);
const wss = new WebSocketServer({ port });

wss.on('connection', (ws) => {
  console.log(`client connected (${wss.clients.size} online)`);
  ws.send(JSON.stringify({ t: 'hello' }));
  ws.on('close', () => console.log(`client left (${wss.clients.size} online)`));
});

console.log(`ws server on :${port}`);
