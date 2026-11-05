const canvas = document.getElementById('game') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

let status = 'connecting...';

function draw() {
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  ctx.scale(devicePixelRatio, devicePixelRatio);
  ctx.fillStyle = '#eee';
  ctx.font = '24px system-ui';
  ctx.fillText(status, 24, 48);
}

const ws = new WebSocket(import.meta.env.VITE_WS_URL ?? 'ws://localhost:8080');
ws.onopen = () => ((status = 'connected'), draw());
ws.onmessage = (e) => ((status = `server: ${e.data}`), draw());
ws.onclose = () => ((status = 'disconnected'), draw());

addEventListener('resize', draw);
draw();
