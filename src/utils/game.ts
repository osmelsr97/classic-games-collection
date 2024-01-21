export enum GameStatus {
  INITIALIZED,
  RUNNING,
  PAUSED,
  OVER,
  WINED,
}

export const isGameInitialized = (gameStatus: GameStatus) =>
  gameStatus === GameStatus.INITIALIZED;

export const isGameRunning = (gameStatus: GameStatus) =>
  gameStatus === GameStatus.RUNNING;

export const isGamePaused = (gameStatus: GameStatus) =>
  gameStatus === GameStatus.PAUSED;

export const isGameOver = (gameStatus: GameStatus) =>
  gameStatus === GameStatus.OVER;

export const isGameWined = (gameStatus: GameStatus) =>
  gameStatus === GameStatus.WINED;

export const isAllowedStarGame = (gameStatus: GameStatus) =>
  isGamePaused(gameStatus) || isGameInitialized(gameStatus);

export const isAllowedPauseGame = (gameStatus: GameStatus) =>
  isGameRunning(gameStatus);

export const isAllowedResetGame = (gameStatus: GameStatus) =>
  !isGameInitialized(gameStatus);

export const isSpaceKey = (key: string) => key === " ";
export const isEnterKey = (key: string) => key === "Enter";
export const isEscapeKey = (key: string) => key === "Escape";

export const isPauseOrResumeGameByKey = (key: string) =>
  isSpaceKey(key) || isEnterKey(key);
