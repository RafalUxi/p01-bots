import { vec2 } from './types';

export function minusTwoVec(x1: vec2, x2: vec2) {
  const output: vec2 = { x: x1.x - x2.x, y: x1.y - x2.y };
  return output;
}

export function vecLength(v: vec2) {
  const length = Math.sqrt(v.x * v.x + v.y * v.y);
  return length;
}

export function vecNorm(v: vec2) {
  const l = vecLength(v);
  const norm = { x: v.x / l, y: v.y / l };
  return norm;
}
