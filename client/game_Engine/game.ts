import { io } from 'socket.io-client';
import { ctx, h, initBase, resize, w } from '../game_base/base';
import { startLoop } from './loop';
import { type Map } from '../../types/types_map';
import {
  MAP_HEIGHT,
  MAP_WIDTH,
  PLAYER_SIZE,
  BLOCK_GAP,
  BLOCK_SIZE,
  color_map_bg,
} from '../game_base/map_const';

const mapTest: Map[] = [
  { x: 0, y: 0, color: 'blue' },
  { x: 0, y: 1, color: 'blue' },
  { x: 0, y: 2, color: 'blue' },
  { x: 0, y: 3, color: 'blue' },
  { x: 0, y: 4, color: 'blue' },
  { x: 1, y: 0, color: 'blue' },
  { x: 1, y: 1, color: 'blue' },
  { x: 1, y: 2, color: 'blue' },
  { x: 1, y: 3, color: 'blue' },
  { x: 1, y: 4, color: 'blue' },
];

export function startGame(canvas: HTMLCanvasElement, onStatus: (s: string) => void) {
  initBase(canvas);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);

  const socket = io(import.meta.env.VITE_SERVER_URL ?? 'http://localhost:8080');
  socket.on('connect', () => onStatus(`connected ${socket.id}`));
  socket.on('welcome', (data) => onStatus(`welcome ${data.id}`));
  socket.on('disconnect', () => onStatus('disconnected'));

  const stopLoop = startLoop((dt) => {
    update(dt);
    render();
  });

  return () => {
    stopLoop();
    resizeObserver.disconnect();
    socket.disconnect();
  };
}

function update(_dt: number) {}

function render() {
  ctx.clearRect(0, 0, w, h);
  generateMap(mapTest);
  drawPlayer('black');
}

export function generateMap(map: Map[]) {
  ctx.fillStyle = color_map_bg;
  ctx.fillRect(0, 0, w, h);

  for (const m of map) {
    const px = m.x * BLOCK_SIZE + m.x * BLOCK_GAP + BLOCK_GAP;
    const py = m.y * BLOCK_SIZE + m.y * BLOCK_GAP + BLOCK_GAP;
    if (px > w || py > h) continue;
    ctx.beginPath();
    ctx.fillStyle = m.color;
    ctx.roundRect(px, py, BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE / 4);
    ctx.fill();
  }
}

export function drawPlayer(color: string) {
  ctx.beginPath();
  ctx.arc(w / 2 - PLAYER_SIZE / 2, h / 2 - PLAYER_SIZE / 2, PLAYER_SIZE, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}
