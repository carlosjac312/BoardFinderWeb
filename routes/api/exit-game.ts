import { Handlers } from "$fresh/server.ts";
import PlayersCollection from "../../db/Player.ts";
import GamesCollection from "../../db/Games.ts";
import { getCookie } from "../../utils/cookies.ts";
import { ObjectId } from "mongodb";

export const handler: Handlers = {
  async POST(req) {
    const username = getCookie(req, "usrID");
    if (!username) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { gameId } = await req.json();
    if (!gameId) {
      return new Response("Missing game ID", { status: 400 });
    }

    // Convertir a ObjectId
    let objectGameId: ObjectId;
    try {
      objectGameId = new ObjectId(gameId);
    } catch {
      return new Response("Invalid game ID", { status: 400 });
    }

    // Eliminar el gameId del jugador
    await PlayersCollection.updateOne(
      { username },
      { $pull: { games_id: objectGameId } },
    );

    // Eliminar el username del juego
    await GamesCollection.updateOne(
      { _id: objectGameId },
      { $pull: { players: username } },
    );

    //Obtener el juego actualizado
    const updatedGame = await GamesCollection.findOne({ _id: objectGameId });
    if (!updatedGame) {
      return new Response("Game not found", { status: 404 });
    }

    //Si el número de jugadores es menor al máximo y está marcado como full, cambiar a false
    if (
      updatedGame.players.length < updatedGame.max_players &&
      updatedGame.full
    ) {
      await GamesCollection.updateOne(
        { _id: objectGameId },
        { $set: { full: false } },
      );
    }

    return new Response("Game removed", { status: 200 });
  },
};