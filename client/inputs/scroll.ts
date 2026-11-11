// Scroll function

import { canvas } from '../game_base/base';

export const camera = { x: 0, y: 1 }; // 0.5 -> 2.5?
const nagetivScrollSens = 500;

function onWheel(e: WheelEvent) {
  camera.x += e.deltaX;
  camera.y += e.deltaY * 0.001;
  camera.y = Math.max(Math.min(camera.y, 2.5), 0.5);
}

export function addScroll() {
  canvas.addEventListener('wheel', onWheel);
  return () => canvas.removeEventListener('wheel', onWheel);
}
