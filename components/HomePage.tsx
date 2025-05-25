import { FunctionComponent } from "preact/src/index.d.ts";

type Juegos = {
    gamename: string,
    gameinfo: {
        location:string,
        date: Date, //Ver si dejar esto o poner string
        description: string
    }
    owner: string,
    max_players: number,
    players: string[]
    full: boolean
}

type Props = {
    juegos:string, //Poner string correcto una vez implementado
}

const HomePage:FunctionComponent<Props> = (props) => (
    <div>CASITA</div>
);

export default HomePage;