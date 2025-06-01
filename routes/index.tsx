import { Handlers } from "$fresh/server.ts";

/*export const handler: Handlers = {
  GET(_req) {
    const headers = new Headers();
    headers.set("location", "/login");
    return new Response(null, {
      status: 307, // Redirección temporal (puedes usar 308 si prefieres)
      headers,
    });
  },
};*/
export default function Home() {
  return (
    <div>Estas en el Index</div>
  );
}
