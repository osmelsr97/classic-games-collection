export enum Player {
  X = "❌",
  O = "〇",
}

export const PlayerColor = {
  [Player.X]: "bg-purple-500",
  [Player.O]: "bg-cyan-500",
};

export const CombinationToWin = [
  // Horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // Vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // Diagonal
  [0, 4, 8],
  [2, 4, 6],
];
