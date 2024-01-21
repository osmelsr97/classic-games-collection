import { Game } from "@/types";

export const GAMES: Game[] = [
  {
    id: "snake",
    category: {
      id: "classic",
      name: "Classic",
      enabled: true,
    },
    description: "The classic snake game",
    enabled: true,
    image: "snake.jpg",
    name: "Snake",
    path: "/snake",
  },
  {
    id: "tic-tac-toe",
    category: {
      id: "classic",
      name: "Classic",
      enabled: true,
    },
    description: "The classic tic tac toe game",
    enabled: false,
    image: "tic-tac-toe.jpg",
    name: "Tic Tac Toe",
    path: "/tic-tac-toe",
  },
  {
    id: "tetris",
    category: {
      id: "classic",
      name: "Classic",
      enabled: true,
    },
    description: "The classic tetris game",
    enabled: false,
    image: "tetris.jpg",
    name: "Tetris",
    path: "/tetris",
  },
  {
    id: "pacman",
    category: {
      id: "classic",
      name: "Classic",
      enabled: true,
    },
    description: "The classic pacman game",
    enabled: false,
    image: "pacman.jpg",
    name: "Pacman",
    path: "/pacman",
  },
  {
    id: "pong",
    category: {
      id: "classic",
      name: "Classic",
      enabled: true,
    },
    description: "The classic pong game",
    enabled: false,
    image: "pong.png",
    name: "Pong",
    path: "/pong",
  },
  {
    id: "space-invaders",
    category: {
      id: "classic",
      name: "Classic",
      enabled: true,
    },
    description: "The classic space invaders game",
    enabled: false,
    image: "space-invaders.jpeg",
    name: "Space Invaders",
    path: "/space-invaders",
  },
];
