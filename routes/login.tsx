import { Handlers } from "$fresh/server.ts";
import Login from "../components/Login.tsx";
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
      password: contra, // ⚠️ Usa bcrypt en producción
    });
    if (foundPlayer) {
      const headers = new Headers();
    // Establecer cookie correctamente desde el servidor
      headers.set(
        "Set-Cookie",
        `usrID=${foundPlayer.username}; Path=/; Max-Age=31536000;`
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
      headers.set("location", "/login/?error=Credenciales+incorrectas");
      return new Response(null, {
        status: 303,
        headers,
      });
    }
  },
};

const Page = ({ url }: { url: URL }) => {
  const error = url.searchParams.get("error");
  return(<Login error={error}/>);
}
export default Page;