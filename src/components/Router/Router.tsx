import {
  RouterProvider as Provider,
  createBrowserRouter,
} from "react-router-dom";

import {
  Home,
  Pacman,
  Pong,
  Snake,
  SpaceInvaders,
  Tetris,
  TicTacToe,
} from "@/pages";
import MainLayout from "../MainLayout/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/snake",
        element: <Snake />,
      },
      {
        path: "/tic-tac-toe",
        element: <TicTacToe />,
      },
      {
        path: "/tetris",
        element: <Tetris />,
      },
      {
        path: "/pacman",
        element: <Pacman />,
      },
      {
        path: "/pong",
        element: <Pong />,
      },
      {
        path: "/pacman",
        element: <SpaceInvaders />,
      },
    ],
  },
]);

export default function RouterProvider() {
  return <Provider router={router} />;
}
