import { ctx, h, w } from '../game_base/base';
import {
  MAP_HEIGHT,
  MAP_WIDTH,
  PLAYER_SIZE,
  BLOCK_GAP,
  BLOCK_SIZE,
  color_map_bg,
} from '../game_base/map_const';
import { type PlayerCordsType, type MapType } from '../../types/types';
import { viewPlayerX, viewPlayerY, viewMargin } from '../../types/viewConst';
import { camera } from '../inputs/scroll';

export function generateMap(map: MapType[]) {
  const cell = BLOCK_SIZE + BLOCK_GAP;
  const blackOffX = Math.max(0, w / 2 - (viewPlayerX / 2 + viewMargin) * cell);
  const blackOffY = Math.max(0, h / 2 - (viewPlayerY / 2 + viewMargin) * cell);

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = color_map_bg;
  ctx.fillRect(blackOffX, blackOffY, w - 2 * blackOffX, h - 2 * blackOffY);

  for (const m of map) {
    ctx.beginPath();
    ctx.fillStyle = m.color;
    ctx.roundRect(
      w / 2 + m.x * cell * camera.y + BLOCK_GAP / 2,
      h / 2 + m.y * cell * camera.y + BLOCK_GAP / 2,
      BLOCK_SIZE * camera.y,
      BLOCK_SIZE * camera.y,
      BLOCK_SIZE / 4,
    );
    ctx.fill();
  }
}

export function drawPlayer(color: string) {
  ctx.beginPath();
  ctx.arc(w / 2, h / 2, PLAYER_SIZE * camera.y, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}
