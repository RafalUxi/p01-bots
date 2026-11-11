// Scroll function

import { canvas } from '../game_base/base';

export let scroll = 1; // 0.5 -> 2.5?
const nagetivScrollSens = 500;

function onWheel(e: WheelEvent) {
  scroll += -e.deltaY * 0.001;
  scroll = Math.max(Math.min(scroll, 2.5), 0.5);
}

export function addScroll() {
  canvas.addEventListener('wheel', onWheel);
  return () => canvas.removeEventListener('wheel', onWheel);
}
