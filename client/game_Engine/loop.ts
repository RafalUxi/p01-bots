export function startLoop(frame: (dt: number) => void): () => void {
  let last = performance.now();
  let id = requestAnimationFrame(function tick(now) {
    id = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    frame(dt);
  });
  return () => cancelAnimationFrame(id);
}
