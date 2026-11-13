// Mouse function

import { canvas } from '../game_base/base';

export let isMouse: boolean;
export const pointer = { x: 0, y: 0 };

function onMouseDown() {
  isMouse = true;
}

function onMouseUp() {
  isMouse = false;
}

function onPointerMove(e: PointerEvent) {
  pointer.x = e.offsetX;
  pointer.y = e.offsetY;
}

// Down
export function addMouseDown() {
  canvas.addEventListener('mousedown', onMouseDown);
  return () => canvas.removeEventListener('mousedown', onMouseDown);
}

// Up
export function addMouseUp() {
  canvas.addEventListener('mouseup', onMouseUp);
  return () => canvas.removeEventListener('mouseup', onMouseUp);
}

export function mousePosition() {
  canvas.addEventListener('pointermove', onPointerMove);
  return () => canvas.removeEventListener('pointermove', onPointerMove);
}
