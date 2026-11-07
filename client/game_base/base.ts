export let canvas: HTMLCanvasElement;
export let ctx: CanvasRenderingContext2D;
export let w = 0;
export let h = 0;

export function initBase(el: HTMLCanvasElement): void {
  const isCtx = el.getContext('2d');
  if (!isCtx) throw new Error('Canvas 2D context not available');
  canvas = el;
  ctx = isCtx;
  resize();
}

export function resize(): void {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(canvas.clientWidth * dpr);
  canvas.height = Math.floor(canvas.clientHeight * dpr);
  w = canvas.clientWidth;
  h = canvas.clientHeight;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
