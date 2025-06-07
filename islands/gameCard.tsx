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
  const [gamename, setGameName] = useState<string>("");

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
      const newGameList = gameslist.filter((e) => e._id !== game._id);
      setGamesList(newGameList);
    } else {
      const error = await res.text();
      alert(`Error: ${error}`);
    }
  };

  // Filtrado en tiempo real
  const filteredGames = gameslist.filter((game) =>
    game.gamename.toLowerCase().includes(gamename.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar juego..."
        class="search-input"
        value={gamename}
        onInput={(e) => setGameName(e.currentTarget.value)}
      />
      <div class="games-container">
      {filteredGames.map((juego) => {
        return (
          <div class={`game-card ${juego.full ? "full" : ""}`}>
            <h2 class="game-title">{juego.gamename}</h2>
            <div class="game-info">
              <p>
                <strong>Ubicación:</strong> {juego.gameinfo.location}
              </p>
              <p>
                <strong>Fecha:</strong> {juego.gameinfo.date}
              </p>
              <p>
                <strong>Descripción:</strong> {juego.gameinfo.description}
              </p>
            </div>
            <div class="game-meta">
              <p>
                <strong>Organizador:</strong> {juego.owner}
              </p>
              <p>
                <strong>Jugadores:</strong> {juego.players.length} /{" "}
                {juego.max_players}
              </p>
            </div>
            <button onClick={(e)=>handleAdd(juego)}>Unirse</button>
          </div>
        );
      })}
      </div>
    </div>
  );
}
