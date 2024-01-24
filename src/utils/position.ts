export enum Direction {
  Up,
  Down,
  Left,
  Right,
}

export const getDirection = (key: string) => {
  switch (key) {
    case "ArrowUp":
      return Direction.Up;
    case "ArrowDown":
      return Direction.Down;
    case "ArrowLeft":
      return Direction.Left;
    case "ArrowRight":
      return Direction.Right;
  }
};

export const InitialPosition = {
  x: 0,
  y: 0,
};

export const randomPositionOnGrid = (min: number, max: number, size: number) =>
  Math.floor(Math.random() * ((max - min) / size)) * size + min;
