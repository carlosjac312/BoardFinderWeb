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
      return new Response("Credenciales incorrectas", {
        status: 401,
      });
    }
  },
};

const Page = () => <Login />;

export default Page;

/* Esto es para el register encriptado
import { compare } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

import { hash } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

// Registro
const hashedPassword = await hash(password);
await PlayersCollection.insertOne({
  username,
  password: hashedPassword,
});
*/