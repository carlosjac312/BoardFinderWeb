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

    //Pasar a objectID
    let objectGameId: ObjectId;
    try {
      objectGameId = new ObjectId(gameId);
    } catch {
      return new Response("Invalid game ID", { status: 400 });
    }

    // Update user
    // Update user
    await PlayersCollection.updateOne(
      { username },
      { $addToSet: { games_id: objectGameId } },
    );

    // Update game
    await GamesCollection.updateOne(
      { _id: objectGameId },
      { $addToSet: { players: username } },
    );

    return new Response("Game added", { status: 200 });
  },
};
