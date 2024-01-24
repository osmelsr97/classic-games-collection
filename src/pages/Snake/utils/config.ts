import { IElement } from "@/types/draw";
import { InitialPosition, randomPositionOnGrid } from "@/utils/position";

export const SnakeCanvasDimensions = {
  width: 810,
  height: 510,
};

export const SnakeGridSize = 15;

export const InitialSnakeConfig: IElement = {
  color: "green",
  dimensions: {
    width: SnakeGridSize,
    height: SnakeGridSize,
  },
  positions: InitialPosition,
};

export const InitialFoodConfig: IElement = {
  emoticon: "🍎",
  isEmoticon: true,
  fontSize: SnakeGridSize,
  color: "red",
  dimensions: {
    width: SnakeGridSize,
    height: SnakeGridSize,
  },
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
};

export const DefaultSnakeConfig: IElement[] = [
  InitialSnakeConfig,
  {
    ...InitialSnakeConfig,
    positions: {
      x: SnakeGridSize,
      y: InitialSnakeConfig.positions.y,
    },
  },
  {
    ...InitialSnakeConfig,
    positions: {
      x: SnakeGridSize * 2,
      y: InitialSnakeConfig.positions.y,
    },
  },
];
