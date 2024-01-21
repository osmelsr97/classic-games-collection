import { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { Game } from "@/types";

export default function CardGame({
  image,
  path,
  name,
  description,
  enabled,
}: Game) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!enabled) {
      e.preventDefault();
      alert("Game not available for now. Please try again later!");
    }
  };

  return (
    <Link
      to={path}
      onClick={handleClick}
      className="flex relative rounded-lg shadow-lg bg-white sm:h-80 md:h-64 h-72"
    >
      <img
        className="bg-cover bg-no-repeat bg-center w-full h-full absolute z-0 rounded-lg transition-all ease-in-out "
        src={`/assets/img/games/${image}`}
        alt="game-img"
      />
      <footer className="w-full absolute bg-gray-300 -bottom-5 z-10 p-2 rounded-b-lg">
        <h2 className="text-xl text-blue-500 font-extrabold">{name}</h2>
        <p>{description}</p>
      </footer>
    </Link>
  );
}
