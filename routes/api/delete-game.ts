import { Handlers } from "$fresh/server.ts";
import PlayersCollection from "../../db/Player.ts";
import GamesCollection from "../../db/Games.ts";
import { ObjectId } from "mongodb";

export const handler: Handlers = {
  async POST(req) {
    const { gameId } = await req.json();
    if (!gameId) {
      return new Response("Missing game ID", { status: 400 });
    }

    //Convertir a ObjectId
    let objectGameId: ObjectId;
    try {
      objectGameId = new ObjectId(gameId);
    } catch {
      return new Response("Invalid game ID", { status: 400 });
    }

    try {
      //Quitar el gameId de todos los jugadores
      await PlayersCollection.updateMany(
        { games_id: objectGameId },
        { $pull: { games_id: objectGameId } },
      );

      //Eliminar el juego de la base de datos
      await GamesCollection.deleteOne({ _id: objectGameId });

      return new Response("Game removed", { status: 200 });
    } catch (err) {
      console.error("Error deleting game:", err);
      return new Response("Internal server error", { status: 500 });
    }
  },
};