import { Handlers, PageProps } from "$fresh/server.ts";
import { ObjectId } from "mongodb";
import GamesCollection from "../../db/Games.ts";
import GameCard from "../../islands/gameCard.tsx";

type Juegos = {
  _id:ObjectId,
    gamename: string,
    gameinfo: {
        location: string,
        date: string,
        description: string
    },
    owner: string,
    max_players: number,
    players: string[],
    full: boolean
}

type Props = {
    juegos: Juegos[];
}

export const handler: Handlers<Props> = {
  async GET(req, ctx) {
    try {
      // Extraer usrID de cookies más robusto
      const cookieHeader = req.headers.get("cookie");
      const usrID = cookieHeader?.split("; ")
        .find(c => c.trim().startsWith("usrID="))
        ?.split("=")[1];
      
      if (!usrID) {
        return ctx.render({ juegos: [] });
      }

      // Consulta optimizada con proyección
      const juegos = await GamesCollection.find({
        full: { $ne: true },
        players: { $nin: [usrID] }
      }).toArray();

      return ctx.render({ 
        juegos: juegos
      });
      
    } catch (error) {
      console.error("Error al obtener juegos:", error);
      return ctx.render({ juegos: [] });
    }
  },
};

const Page = (props: PageProps<Props>) => {
    return <GameCard games={props.data.juegos}/>;
}

export default Page;