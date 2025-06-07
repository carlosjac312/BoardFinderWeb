import { Handlers } from "$fresh/server.ts";
import GamesCollection from "../../db/Games.ts";
import PlayersCollection from "../../db/Player.ts";
import { getCookie } from "../../utils/cookies.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const form = await req.formData();
    const gamename = form.get("gamename")?.toString();
    const location = form.get("location")?.toString();
    const date = form.get("date")?.toString();
    let description = form.get("description")?.toString();
    const max_players = Number(form.get("max_players"));

    if (!gamename || !location || !date || !max_players) {
      return new Response("Faltan datos", { status: 400 });
    }
    if(!description) description="";

    // Buscar la cookie
    const usrID = getCookie(req, "usrID");
    if (!usrID) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Crear juego
    const newGame = await GamesCollection.insertOne({
        gamename: gamename,
        gameinfo: {
            location: location,
            date: date,
            description: description
        },
        owner: usrID,
        max_players: max_players,
        players: [usrID],
        full:false
    })
    if (newGame) {
      // Añadir el id del juego a la lista de games_id del jugador
      await PlayersCollection.updateOne(
        { username: usrID },
        { $addToSet: { games_id: newGame.insertedId } }
      );

      // Redirigir a la página de juegos del usuario
      return new Response(null, {
        status: 303,
        headers: { location: "/paginas/myGames" },
      });
    } else {
      return new Response("Error al crear el juego", { status: 500 });
    }
  },
};

const Page = () => {
  return (
    <div class="form-wrapper">
      <h1 class="form-title">Crear un nuevo juego</h1>
      <form method="POST" class="game-form">
        <div class="form-group">
          <label for="gamename">Nombre del juego</label>
          <input type="text" name="gamename" id="gamename" required />
        </div>

        <div class="form-group">
          <label for="location">Ubicación</label>
          <input type="text" name="location" id="location" required />
        </div>

        <div class="form-group">
          <label for="date">Fecha (dd/mm/yy)</label>
          <input
            type="text"
            name="date"
            id="date"
            required
            pattern="\d{2}/\d{2}/\d{2}"
            placeholder="ej. 24/06/25"
          />
          <p class="form-hint">Formato requerido: dd/mm/yy</p>
        </div>

        <div class="form-group">
          <label for="description">Descripción (opcional)</label>
          <textarea name="description" id="description" rows={3} />
        </div>

        <div class="form-group">
          <label for="max_players">Máximo de jugadores</label>
          <input
            type="number"
            name="max_players"
            id="max_players"
            min={2}
            max={15}
            required
          />
        </div>

        <button type="submit" class="submit-button">Crear juego</button>
      </form>
    </div>
  );
};

export default Page;