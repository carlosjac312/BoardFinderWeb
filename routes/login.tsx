import { Handlers } from "$fresh/server.ts";
import { compare } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import Login from "../components/Login.tsx";
import PlayersCollection from "../db/Player.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const form = await req.formData();
    const nombre = form.get("username")?.toString();
    const contra = form.get("password")?.toString();

    // Validar que ambos campos estén presentes
    if (!nombre || !contra) {
      return new Response("Faltan datos", { status: 400 });
    }

    // Buscar al usuario en la base de datos
    const foundPlayer = await PlayersCollection.findOne({
      username: nombre,
      password: contra, // ⚠️ En producción, esto debería compararse con bcrypt
    });

    if (foundPlayer) {
      // Redirigir al usuario si existe
      const headers = new Headers();
      headers.set("location", "/paginas/homepage");
      return new Response(null, {
        status: 303, // See Other
        headers,
      });
    } else {
      // Mostrar error si no se encuentra
      return new Response("Credenciales incorrectas", {
        status: 401,
      });
    }
  },
};

const Page = () => <Login />;

export default Page;

/* Esto es para el register encriptado
import { hash } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

// Registro
const hashedPassword = await hash(password);
await PlayersCollection.insertOne({
  username,
  password: hashedPassword,
});
*/