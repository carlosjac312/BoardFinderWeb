import { PageProps } from "$fresh/server.ts";

export default function Layout({ Component, state }: PageProps) {
  // do something with state here
  return (
    <div>
        <div>
            <a href={"/paginas/homepage"}>Buscar Juego</a>
            <a href={"/paginas/addGame"}>Crear Tablero</a>
            <a href={"/paginas/myGames"}>Mis partidas</a>
        </div>
      <Component />
    </div>
  );
}