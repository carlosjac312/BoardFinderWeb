import { Handlers } from "$fresh/server.ts";
import PlayersCollection from "../db/Player.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const form = await req.formData();
    const nombre = form.get("username")?.toString();
    const contra = form.get("password")?.toString();

    if (!nombre || !contra) {
      return new Response("Faltan datos", { status: 400 });
    }

    // Buscar al usuario en la base de datos
    const foundPlayer = await PlayersCollection.findOne({
      username: nombre,
    });
    if (!foundPlayer) {
      const headers = new Headers();
      // Establecer cookie correctamente desde el servidor
      const newPlayer = await PlayersCollection.insertOne({
        username: nombre,
        password: contra,
        games_id: []
      });
      headers.set(
        "Set-Cookie",
        `usrID=${nombre}; Path=/; Max-Age=31536000;`,
      );
      // Redirigir a la homepage
      headers.set("location", "/paginas/homepage");

      return new Response(null, {
        status: 303,
        headers,
      });
    } else {
      // Redirigir de vuelta al formulario con mensaje de error
      const headers = new Headers();
      headers.set("location", "/register/?error=Username+already+exists");
      return new Response(null, {
        status: 303,
        headers,
      });
    }
  },
};

const Page = ({ url }: { url: URL }) => {
  const error = url.searchParams.get("error");
  
  return (
    <div className="game-centrado">
      <form method="post">
        <h2 class="game-titulo">BoardFinder!</h2>
        <span class="game-loader" />
        <input type="text" name="username" placeholder="Username" required />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
        <a href={"/login"} class="game-register-link">
          ¿Ya estas con nosotros? Log in!
        </a>
      </form>
    </div>
  );
};

export default Page;