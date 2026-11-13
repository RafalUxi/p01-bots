import { type MapType, type vec2, type PlayerCordsType } from '../../global/types';
import { viewMargin, viewPlayerX, viewPlayerY } from '../../global/viewConst';

// Generate start map
// Map - 300 x 300 = 90 000 blocks
export function generateStartMap() {
  const output: MapType[] = [];
  for (let i = 0; i < 300; i++) {
    for (let j = 0; j < 300; j++) {
      output.push({ x: i, y: j, color: 'gray' });
    }
  }
  return output;
}

// Random start posicion
// In future -> not-grey blocks
export function startPlayerPosition(): PlayerCordsType {
  const xRan = 2 + Math.random() * 298;
  const yRan = 2 + Math.random() * 298;
  return { x: xRan, y: yRan, color: 'blue' };
}

export function translateStartMapCordsToPlayerView(
  map: MapType[],
  playerPosition: PlayerCordsType,
) {
  const output: MapType[] = [];

  const halfX = viewPlayerX / 2 + viewMargin;
  const halfY = viewPlayerY / 2 + viewMargin;

  // 48 + 16 on x; 27 + 16 on y
  for (const m of map) {
    if (
      m.x + 1 >= playerPosition.x - halfX &&
      m.x <= playerPosition.x + halfX &&
      m.y + 1 >= playerPosition.y - halfY &&
      m.y <= playerPosition.y + halfY
    ) {
      output.push({ x: m.x, y: m.y, color: m.color });
    }
  }
  return output;
}

export function normalizePlayerViewToScreen(map: MapType[], playerPosition: PlayerCordsType) {
  const output = map.map((m): MapType => {
    return {
      x: m.x - playerPosition.x,
      y: m.y - playerPosition.y,
      color: m.color,
    };
  });
  return output;
}
