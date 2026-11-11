import { io } from 'socket.io-client';
import { ctx, h, initBase, resize, w } from '../game_base/base';
import { startLoop } from './loop';
import { type MapType, ObstaclesType, PlayerCordsType } from '../../types/types';
import { generateMap, drawPlayer } from './engine';
import { playerViewCords, saveMapCords, savePlayerCords, savePlayerViewCords } from './gameMem';
import { addScroll } from '../inputs/scroll';

let mapCords: MapType[] = [];
let playersCords: PlayerCordsType[] = [];
let obstaclesCords: ObstaclesType[] = [];

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

  // event - re-draw map param
  socket.on('drawMap', (data) => {
    mapCords = data.mapCords;
    playersCords = data.playerCords;
    obstaclesCords = data.obstaclesCords;
  });

  // Game loop (front)
  const stopLoop = startLoop((dt) => {
    update(dt);
    render();
  });

  return () => {
    stopLoop();
    scrollStop();
    resizeObserver.disconnect();
    socket.disconnect();
  };
}

function update(_dt: number) {}

function render() {
  ctx.clearRect(0, 0, w, h);
  if (playerViewCords) {
    generateMap(playerViewCords);
  }
  drawPlayer('black');
}
