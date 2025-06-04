import { useEffect, useState } from "preact/hooks";
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

export default function MyGamesCard({ games }: { games: Juegos[] }) {
  const [gameslist, setGamesList] = useState<Juegos[]>(games);
  const [userValue, setUserValue] = useState<string | null>(null);

  useEffect(() => {
    // Esto solo se ejecuta en el navegador
    const cookies = document.cookie.split(";");
    const userCookie = cookies.find((row) => row.trim().startsWith("usrID="));
    const value = userCookie ? userCookie.split("=")[1] : null;
    setUserValue(value);
  }, []);

  const handleExit = async (game: Juegos) => {
    const res = await fetch("/api/exit-game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameId: game._id }),
    });

    // Si la update a ido bien repintar lista
    if (res.ok) {
      const newGameList = gameslist.filter((e) => e._id !== game._id);
      setGamesList(newGameList);
    } else {
      const error = await res.text();
      alert(`Error: ${error}`);
    }
  };

  const handleDelete = async (game: Juegos) => {
    const res = await fetch("/api/delete-game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameId: game._id }),
    });

    // Si el borrado a ido bien repintar lista
    if (res.ok) {
      const newGameList = gameslist.filter((e) => e._id !== game._id);
      setGamesList(newGameList);
    } else {
      const error = await res.text();
      alert(`Error: ${error}`);
    }
  }

  return (
    <div>
      {gameslist.map((juego) => {
        return (
          <>
            <h3 class="text-xl font-semibold">{juego.gamename}</h3>
            {juego.owner === userValue
              ? <button onClick={(ev) => handleDelete(juego)}>Borrar juego</button>
              : (
                <button onClick={(ev) => handleExit(juego)}>
                  Abandonar juego
                </button>
              )}
          </>
        );
      })}
    </div>
  );
}
