export interface IElement {
  dimensions: { width: number; height: number };
  positions: IPosition;
  color: string;
}

export interface IPosition {
  x: number;
  y: number;
}
