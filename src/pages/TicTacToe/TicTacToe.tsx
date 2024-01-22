import { useMemo, useState } from "react";
import confetti from "canvas-confetti";
import { GameStatus, isGameWined } from "@/utils/game";
import { CombinationToWin, Player, PlayerColor } from "./config";

export default function TicTacToe() {
  const [turn, setTurn] = useState<Player>(Player.X);
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const [gameState, setGameState] = useState<GameStatus>(GameStatus.RUNNING);
  const [winner, setWinner] = useState<Player | null>(null);
  const [rowWinner, setRowWinner] = useState<(number | null)[]>(
    Array(3).fill(null)
  );

  const isGameTied = useMemo(
    () => !winner && board.every((cell) => cell),
    [board, winner]
  );

  const shouldShowResetButton = useMemo(
    () => isGameTied || isGameWined(gameState),
    [gameState, isGameTied]
  );

  const getPlayerClass = (player: Player) => {
    let playerClass =
      PlayerColor[player] + " text-6xl text-white p-4 rounded-lg select-none ";
    if (player === winner) playerClass += "animate-bounce";
    if (player === turn && !winner && !isGameTied)
      playerClass += "animate-pulse";
    return playerClass;
  };

  const checkWinner = (currentBoard: string[]) => {
    for (const combination of CombinationToWin) {
      const [a, b, c] = combination;

      if (
        currentBoard[a] !== "" &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        setWinner(currentBoard[a] as Player);
        setRowWinner(combination);
        setGameState(GameStatus.WINED);
        confetti();
        return;
      }
    }
  };

  const toggleTurn = () => setTurn(turn === Player.X ? Player.O : Player.X);

  const play = (index: number) => {
    if (gameState === GameStatus.WINED) return;

    if (board[index] !== "") return;

    const newBoard = [...board];
    newBoard[index] = turn;
    checkWinner(newBoard);
    setBoard(newBoard);
    toggleTurn();
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setTurn(Player.X);
    setGameState(GameStatus.RUNNING);
    setRowWinner(Array(3).fill(null));
    setWinner(null);
  };

  return (
    <section className="flex flex-col items-center gap-6">
      <header className="mb-10">
        <h1 className="text-white text-6xl mb-10 text-center">Tic Tac Toe</h1>
        <div className="flex items-center justify-center gap-3">
          <span className={getPlayerClass(Player.X)}>{Player.X}</span>
          <span className={getPlayerClass(Player.O)}>{Player.O}</span>
        </div>
      </header>
      <section className="grid grid-cols-[repeat(3,7rem)] gap-1 mb-10">
        {board.map((_, index) => (
          <button
            key={index}
            onClick={() => play(index)}
            className={`${PlayerColor[board[index] as Player]} ${
              rowWinner.includes(index) ? "animate-pulse" : ""
            } w-28 h-28 border-4 text-6xl text-white border-white rounded select-none`}
          >
            {board[index]}
          </button>
        ))}
      </section>

      <footer className="flex flex-col items-center gap-6">
        {winner && (
          <h1 className="text-5xl text-white">Player Winner: {winner}</h1>
        )}
        {isGameTied && <h1 className="text-5xl text-white">Game Tied!</h1>}
        {shouldShowResetButton && (
          <button
            className="bg-blue-400 p-2 text-white rounded cursor-pointer"
            onClick={resetGame}
          >
            Reset Game
          </button>
        )}
      </footer>
    </section>
  );
}
