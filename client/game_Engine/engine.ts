import { ctx, h, w } from '../game_base/base';
import {
  MAP_HEIGHT,
  MAP_WIDTH,
  PLAYER_SIZE,
  BLOCK_GAP,
  BLOCK_SIZE,
  color_map_bg,
} from '../game_base/map_const';
import { type MapType } from '../../types/types';

export function generateMap(map: MapType[]) {
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
