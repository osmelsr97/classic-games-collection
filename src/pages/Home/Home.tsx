import CardGame from "@/components/CardGame/CardGame";
import { GAMES } from "@/data/games";

export default function Home() {
  return (
    <section className="flex flex-col items-center gap-6 mt-20">
      <header>
        <h1 className="text-white text-6xl mb-10 text-center">Classic Games</h1>
      </header>
      <div className="w-4/5 grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-8 ">
        {GAMES.map((game) => (
          <CardGame key={game.id} {...game} />
        ))}
      </div>
    </section>
  );
}
