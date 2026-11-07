import { useEffect, useRef, useState } from 'react';
import { startGame } from './game_Engine/game';

export function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<string>('conecting');
  const [play, isPlay] = useState<boolean>(false);

  useEffect(() => {
    if (!play) return;
    return startGame(canvasRef.current!, setStatus);
  }, [play]);

  const start = () => {
    isPlay(true);
  };

  if (!play) {
    return (
      <div className="relative h-full w-screen bg-black">
        <div className="flex h-full w-full items-center justify-center">
          <div className="relative flex h-100 w-100 items-center justify-center rounded-2xl bg-green-950">
            <button
              onClick={() => start()}
              className="absolute top-4/10 rounded-2xl border px-4 py-2 text-4xl font-bold hover:bg-violet-900"
            >
              PLAY
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (play) {
    return (
      <div className="relative h-full w-screen">
        <canvas ref={canvasRef} className="block h-full w-full touch-none" />
        <div className="absolute top-4 left-4 rounded bg-black/60 px-3 py-1 font-mono text-lg">
          {status}
        </div>
      </div>
    );
  }
}
