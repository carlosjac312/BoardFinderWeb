import { FunctionComponent } from "preact/src/index.d.ts";

type Juegos = {
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
    <div>{props.juegos.map((e)=>{
        return(
            <div>
                <h2>{e.gamename}</h2>
                <>{e.players.length}/{e.max_players}</>
                
            </div>
        )
    })}</div>
);

export default HomePage;