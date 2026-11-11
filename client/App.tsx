import { useEffect, useRef, useState } from 'react';
import { startGame } from './game_Engine/game';

export function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<string>('conecting');
  const [play, isPlay] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>('');

  useEffect(() => {
    if (!play) return;
    return startGame(canvasRef.current!, setStatus, playerName);
  }, [play, startGame]);

  const start = () => {
    if (playerName.length === 0 || playerName.length > 16) return;
    isPlay(true);
  };

  if (!play) {
    return (
      <div className="relative h-full w-screen bg-black">
        <div className="flex h-full w-full items-center justify-center">
          <div className="relative flex h-100 w-100 items-center justify-center rounded-2xl bg-green-950">
            <input
              className="absolute top-2/10 rounded-2xl border-2 border-black px-4 outline-none"
              type="text"
              placeholder="Name"
              maxLength={16}
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
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
      </div>
    );
  }
}
