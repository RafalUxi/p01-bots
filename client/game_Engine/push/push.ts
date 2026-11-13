// Push hitbox

import { vec2 } from '../../../global/types';
import { minusTwoVec } from '../../../global/math';
import { h, w } from '../../game_base/base';
import { BLOCK_GAP, BLOCK_SIZE, PLAYER_SIZE } from '../../game_base/map_const';
import { isMouse, pointer } from '../../inputs/mouse';
import { scroll } from '../../inputs/scroll';

export let isStartPush: boolean = false;

export function isPush(playerPos: vec2) {
  // hitbox ->
  if (
    pointer.x >= playerPos.x - (PLAYER_SIZE / 1.2) * scroll &&
    pointer.x <= playerPos.x + (PLAYER_SIZE / 1.2) * scroll &&
    pointer.y >= playerPos.y - (PLAYER_SIZE / 1.2) * scroll &&
    pointer.y <= playerPos.y + (PLAYER_SIZE / 1.2) * scroll
  ) {
    if (isMouse) {
      isStartPush = true;
    }
  }
}

export function changeToFalseIsStartPush() {
  isStartPush = false;
}

export function pushVectorCalculate(): vec2 {
  const d = (BLOCK_SIZE + BLOCK_GAP) * scroll;
  const x1: vec2 = { x: pointer.x / d, y: pointer.y / d };
  const x2: vec2 = { x: w / 2 / d, y: h / 2 / d };
  console.log(pointer.x, pointer.y);
  const output = minusTwoVec(x2, x1); // Vec2 to pointer
  return output;
}
