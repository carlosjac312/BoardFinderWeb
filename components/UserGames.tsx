import { FunctionComponent } from "preact/src/index.d.ts";
import { ObjectId } from "mongodb";
import MyGamesCard from "../islands/myGamesCard.tsx";

type Juegos = {
    _id:ObjectId
    gamename: string,
    gameinfo: {
        location:string,
        date: string,
        description: string
    }
    owner: string,
    max_players: number,
    players: string[]
    full: boolean
}

type Props = {
    juegos:Juegos[],
}

const UserGames:FunctionComponent<Props> = (props) => (
    
    <div>
        <MyGamesCard games={props.juegos}/>
    </div>
);

export default UserGames;