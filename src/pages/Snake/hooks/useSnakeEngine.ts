import {
  KeyboardEvent,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { IElement } from "@/types/draw";
import {
  DefaultSnakeConfig,
  InitialFoodConfig,
  SnakeCanvasDimensions,
  SnakeGridSize,
} from "../utils/config";
import {
  Direction,
  getDirection,
  randomPositionOnGrid,
} from "@/utils/position";
import useInterval from "@/hooks/useInterval";
import { draw } from "@/utils/draw";
import {
  GameStatus,
  isAllowedStarGame,
  isEscapeKey,
  isPauseOrResumeGameByKey,
} from "@/utils/game";

export default function useSnakeEngine(canvas: RefObject<HTMLCanvasElement>) {
  const [snakeState, setSnakeState] = useState<IElement[]>(DefaultSnakeConfig);
  const [foodState, setFoodState] = useState<IElement[]>([InitialFoodConfig]);
  const [direction, setDirection] = useState<Direction>(Direction.Right);
  const [gameState, setGameState] = useState<GameStatus>(
    GameStatus.INITIALIZED
  );
  const [score, setScore] = useState<number>(0);
  const [delay, setDelay] = useState<number | undefined>();
  const ctxRef = useRef<CanvasRenderingContext2D>();

  useEffect(() => {
    if (!canvas?.current) return;
    const ctx = canvas.current.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;
  }, [canvas]);

  // Change direction of snake
  const onkeyPress = (e: KeyboardEvent<HTMLCanvasElement>) => {
    e.stopPropagation();
    e.preventDefault();

    // Start, Pause or Resume Game
    if (isPauseOrResumeGameByKey(e.key) && gameState !== GameStatus.OVER)
      return isAllowedStarGame(gameState)
        ? startSnakeEngine()
        : stopSnakeEngine();

    // Reset Game
    if (isEscapeKey(e.key)) return resetSnakeEngine();

    // Prevent snake from going in opposite direction
    const newDirection = getDirection(e.key) ?? direction;
    if (
      (direction === Direction.Up && newDirection === Direction.Down) ||
      (direction === Direction.Down && newDirection === Direction.Up) ||
      (direction === Direction.Left && newDirection === Direction.Right) ||
      (direction === Direction.Right && newDirection === Direction.Left)
    ) {
      return;
    }

    // Change direction of snake
    setDirection(newDirection);
  };

  // Detect if snake is eating food
  const isEating = () => {
    const snakeHead = snakeState[snakeState.length - 1];
    const food = foodState[0];
    switch (direction) {
      case Direction.Up: {
        return (
          snakeHead.positions.x === food.positions.x &&
          snakeHead.positions.y === food.positions.y - SnakeGridSize
        );
      }
      case Direction.Down: {
        return (
          snakeHead.positions.x === food.positions.x &&
          snakeHead.positions.y === food.positions.y - SnakeGridSize
        );
      }
      case Direction.Left: {
        return (
          snakeHead.positions.x === food.positions.x &&
          snakeHead.positions.y === food.positions.y - SnakeGridSize
        );
      }
      case Direction.Right: {
        return (
          snakeHead.positions.x === food.positions.x &&
          snakeHead.positions.y === food.positions.y - SnakeGridSize
        );
      }
      default:
        return false;
    }
  };

  // Logic for snake movement
  const snakeMovement = useCallback(() => {
    const newSnakeState = [...snakeState];
    const snakeHead = newSnakeState[newSnakeState.length - 1];
    newSnakeState.shift();
    switch (direction) {
      case Direction.Up: {
        newSnakeState.push({
          ...snakeHead,
          positions: {
            ...snakeHead.positions,
            y: snakeHead.positions.y - SnakeGridSize,
          },
        });
        break;
      }
      case Direction.Down: {
        newSnakeState.push({
          ...snakeHead,
          positions: {
            ...snakeHead.positions,
            y: snakeHead.positions.y + SnakeGridSize,
          },
        });
        break;
      }
      case Direction.Left: {
        newSnakeState.push({
          ...snakeHead,
          positions: {
            ...snakeHead.positions,
            x: snakeHead.positions.x - SnakeGridSize,
          },
        });
        break;
      }
      case Direction.Right: {
        newSnakeState.push({
          ...snakeHead,
          positions: {
            ...snakeHead.positions,
            x: snakeHead.positions.x + SnakeGridSize,
          },
        });
        break;
      }
    }
    setSnakeState(newSnakeState);
  }, [direction, snakeState]);

  // Logic with level up
  const levelUp = () => {
    if (!isEating()) return;
    setSnakeState((prevSnakeState) => {
      const currentHead = prevSnakeState[prevSnakeState.length - 1];
      let newHeadPositionX = currentHead.positions.x;
      let newHeadPositionY = currentHead.positions.y;

      switch (direction) {
        case Direction.Up: {
          newHeadPositionY = newHeadPositionY - SnakeGridSize;
          break;
        }
        case Direction.Down: {
          newHeadPositionY = newHeadPositionY + SnakeGridSize;
          break;
        }
        case Direction.Left: {
          newHeadPositionX = newHeadPositionX - SnakeGridSize;
          break;
        }
        case Direction.Right: {
          newHeadPositionX = newHeadPositionX + SnakeGridSize;
          break;
        }
      }

      const newHead = {
        ...currentHead,
        positions: {
          x: newHeadPositionX,
          y: newHeadPositionY,
        },
      };

      return [...prevSnakeState, newHead];
    });
    setScore((prevScore) => prevScore + 20);
    setDelay((prevDelay) => Math.max((prevDelay ?? 130) - 3, 60));
  };

  // Generate new food
  const generateFood = () => {
    if (!isEating()) return;
    setFoodState([
      {
        ...InitialFoodConfig,
        positions: {
          x: randomPositionOnGrid(
            0,
            SnakeCanvasDimensions.width - SnakeGridSize,
            SnakeGridSize
          ),
          y: randomPositionOnGrid(
            SnakeGridSize,
            SnakeCanvasDimensions.height,
            SnakeGridSize
          ),
        },
      },
    ]);
  };

  // Collision Detector with itself or border
  const collisionDetector = () => {
    if (!ctxRef.current || isEating()) return;
    const snakeHead = snakeState[snakeState.length - 1];
    const snakeBody = snakeState.slice(0, snakeState.length - 2);
    const isCollided = snakeBody.some(({ positions }) => {
      return (
        positions.x === snakeHead.positions.x &&
        positions.y === snakeHead.positions.y
      );
    });
    const isBorderCollided =
      snakeHead.positions.x < 0 ||
      snakeHead.positions.x > ctxRef.current.canvas.width ||
      snakeHead.positions.y < 0 ||
      snakeHead.positions.y > ctxRef.current.canvas.height;
    if (isCollided || isBorderCollided) stopSnakeEngine(true);
  };

  // Start or Resume Game
  const startSnakeEngine = (newDelay = 130) => {
    setDelay(newDelay);
    setGameState(GameStatus.RUNNING);
  };

  // Stop Game
  const stopSnakeEngine = (isOver = false) => {
    setDelay(undefined);
    if (isOver) setGameState(GameStatus.OVER);
    else setGameState(GameStatus.PAUSED);
  };

  // Reset Game to initial state
  const resetSnakeEngine = () => {
    if (!ctxRef.current) return;
    stopSnakeEngine();
    setScore(0);
    setDirection(Direction.Right);
    setSnakeState(DefaultSnakeConfig);
    draw({ ctx: ctxRef.current, elements: DefaultSnakeConfig });
    setGameState(GameStatus.INITIALIZED);
  };

  // Game Engine
  const snakeEngine = () => {
    if (!ctxRef.current) return;
    snakeMovement();
    levelUp();
    generateFood();
    collisionDetector();
    draw({ ctx: ctxRef.current, elements: [...snakeState, ...foodState] });
  };

  // Game Loop
  useInterval(snakeEngine, delay);

  return {
    score,
    snakeState,
    gameState,
    snakeEngine,
    onkeyPress,
    startSnakeEngine,
    stopSnakeEngine,
    resetSnakeEngine,
  };
}
