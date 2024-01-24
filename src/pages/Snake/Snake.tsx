import { useEffect, useRef } from "react";
import { SnakeCanvasDimensions } from "./utils/config";
import {
  GameStatus,
  isAllowedPauseGame,
  isAllowedResetGame,
  isAllowedStarGame,
} from "@/utils/game";
import useSnakeEngine from "./hooks/useSnakeEngine";

export default function Snake() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const {
    score,
    gameState,
    onkeyPress,
    startSnakeEngine,
    stopSnakeEngine,
    resetSnakeEngine,
  } = useSnakeEngine(canvasRef);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.focus();
    }
  }, []);

  const resetGame = () => {
    resetSnakeEngine();
  };

  const startGame = () => {
    startSnakeEngine();
  };

  const pauseGame = () => {
    stopSnakeEngine();
  };

  const preventBlur = () => canvasRef.current?.focus();

  const shouldShowBackDrop = [
    GameStatus.PAUSED,
    GameStatus.OVER,
    GameStatus.INITIALIZED,
  ].includes(gameState);

  return (
    <div className="flex flex-col items-center">
      <header className="mb-10">
        <h1 className="text-white text-6xl text-center mb-5">Snake Game</h1>
        <h3 className="text-white text-4xl text-center">Score: {score}</h3>
      </header>

      {/* TODO Change border and background colors */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded relative shadow-2xl">
        {shouldShowBackDrop && (
          <div className="bg-gray-500 absolute inset-0 opacity-50 flex items-center justify-center w-100 h-100">
            {gameState === GameStatus.PAUSED && (
              <h1 className="text-blue-700 font-bold text-4xl">Paused</h1>
            )}
            {gameState === GameStatus.OVER && (
              <h1 className="text-red-700 font-bold text-4xl">Game Over!</h1>
            )}
            {gameState === GameStatus.INITIALIZED && (
              <h1 className="text-purple-700 font-extrabold text-4xl">
                Star Game!
              </h1>
            )}
          </div>
        )}
        <canvas
          onBlur={preventBlur}
          onKeyDown={onkeyPress}
          className="outline-none box-border"
          tabIndex={0}
          ref={canvasRef}
          {...SnakeCanvasDimensions}
        />
      </div>

      <div className="flex justify-center gap-5 mt-10">
        {isAllowedStarGame(gameState) && (
          // TODO - Create a button component
          <button
            className="bg-blue-400 p-2 text-white rounded cursor-pointer"
            onClick={startGame}
          >
            Start Game
          </button>
        )}
        {isAllowedPauseGame(gameState) && (
          <button
            className="bg-blue-400 p-2 text-white rounded cursor-pointer"
            onClick={pauseGame}
          >
            Pause Game
          </button>
        )}
        {isAllowedResetGame(gameState) && (
          <button
            className="bg-blue-400 p-2 text-white rounded cursor-pointer"
            onClick={resetGame}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
