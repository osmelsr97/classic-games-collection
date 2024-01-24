export interface IElement {
  isEmoticon?: boolean;
  emoticon?: string;
  fontSize?: number;
  dimensions: { width: number; height: number };
  positions: IPosition;
  color: string;
}

export interface IPosition {
  x: number;
  y: number;
}
