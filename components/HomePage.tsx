import { FunctionComponent } from "preact/src/index.d.ts";
import GameCard from "../islands/gameCard.tsx";
import { ObjectId } from "mongodb";

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

const HomePage:FunctionComponent<Props> = (props) => (
    
    <div>
      <GameCard games={props.juegos}/>  
    </div>
);

export default HomePage;