import { IElement } from "@/types/draw";
import { InitialPosition, randomPositionOnGrid } from "@/utils/position";

export const SnakeCanvasDimensions = {
  width: 800,
  height: 500,
};

export const SnakeGridSize = 16;

export const InitialSnakeConfig: IElement = {
  color: "#000000",
  dimensions: {
    width: SnakeGridSize,
    height: SnakeGridSize,
  },
  positions: InitialPosition,
};

export const InitialFoodConfig: IElement = {
  color: "#FF0000",
  dimensions: {
    width: SnakeGridSize,
    height: SnakeGridSize,
  },
  positions: {
    x: randomPositionOnGrid(SnakeGridSize, SnakeCanvasDimensions.width),
    y: randomPositionOnGrid(SnakeGridSize, SnakeCanvasDimensions.height),
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
