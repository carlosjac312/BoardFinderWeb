import { useState } from "preact/hooks";
import { ObjectId } from "mongodb";

type Juegos = {
  _id: ObjectId;
  gamename: string;
  gameinfo: {
    location: string;
    date: string;
    description: string;
  };
  owner: string;
  max_players: number;
  players: string[];
  full: boolean;
};

export default function GameCard({ games }: { games: Juegos[] }) {
  const [gameslist, setGamesList] = useState<Juegos[]>(games);

  const handleAdd = async (game: Juegos) => {
    const res = await fetch("/api/update-game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameId: game._id }),
    });

    // Si la subida a ido bien repintar lista
    if (res.ok) {
      const newGameList = gameslist.filter((e)=>e._id!==game._id);
      setGamesList(newGameList);
    } else {
      const error = await res.text();
      alert(`Error: ${error}`);
    }
  };

  return (
    <div>
      {gameslist.map((juego) => {
        return (
          <>
            <h3 class="text-xl font-semibold">{juego.gamename}</h3>
            <button
              onClick={(ev)=>handleAdd(juego)}
            >
              Unirse
            </button>
          </>
        );
      })}
    </div>
  );
}
