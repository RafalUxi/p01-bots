import { io, type Socket } from 'socket.io-client';
import { ctx, h, initBase, resize, w } from '../game_base/base';
import { startLoop } from './loop';
import { type MapType, ObstaclesType, PlayerCordsType } from '../../global/types';
import { generateMap, drawPlayer } from './engine';
import { playerViewCords, saveMapCords, savePlayerCords, savePlayerViewCords } from './gameMem';
import { addScroll } from '../inputs/scroll';
import { addMouseDown, addMouseUp, isMouse, mousePosition } from '../inputs/mouse';
import { changeToFalseIsStartPush, isPush, isStartPush, pushVectorCalculate } from './push/push';

export function startGame(
  canvas: HTMLCanvasElement,
  onStatus: (s: string) => void,
  playerName: string,
) {
  // Init Basis
  initBase(canvas);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);

  // init inputs
  const scrollStop = addScroll();
  const mouseDownStop = addMouseDown();
  const mouseDownUpStop = addMouseUp();
  const pointerStop = mousePosition();

  // Take/generate playerId
  let playerId = localStorage.getItem('playerId');
  if (!playerId) {
    playerId = crypto.randomUUID();
    localStorage.setItem('playerId', playerId);
  }

  // Start connection
  const socket = io(import.meta.env.VITE_SERVER_URL ?? 'http://localhost:8080', {
    auth: { playerId, playerName },
  });

  // Load base map + players and store it in browser mem
  socket.emit('loadStartData', 'Need data');
  socket.on('startData', (data) => {
    savePlayerCords(data.startPosition);
    savePlayerViewCords(data.mapCords);
  });

  // Game loop (front)
  const stopLoop = startLoop((dt) => {
    update(dt, socket);
    render();
  });

  return () => {
    stopLoop();
    scrollStop();
    mouseDownStop();
    mouseDownUpStop();
    pointerStop();
    resizeObserver.disconnect();
    socket.disconnect();
  };
}

function update(_dt: number, socket: Socket) {
  isPush({ x: w / 2, y: h / 2 });
  if (!isMouse && isStartPush) {
    changeToFalseIsStartPush();
    const pushVector = pushVectorCalculate();
    // now socket connection with vec
    console.log(pushVector);
    socket.emit('startPush', pushVector);
  }
}

function render() {
  ctx.clearRect(0, 0, w, h);
  if (playerViewCords) {
    generateMap(playerViewCords);
  }
  drawPlayer('black');
}
