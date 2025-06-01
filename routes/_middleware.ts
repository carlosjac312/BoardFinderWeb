import { FreshContext } from "$fresh/server.ts";

export async function handler(req: Request, ctx: FreshContext) {

  // 2. Parseamos la URL para extraer el pathname
  const url = new URL(req.url);
  const { pathname } = url;

  // 4. Protegemos la ruta "/nombre"
  if (pathname === "/paginas/homepage") {
    // 4.1 Leemos la cabecera "cookie" (o cadena vacía si no existe)
    const cookieHeader = req.headers.get("cookie") ?? "";

    // 4.2 Buscamos una cookie concreta llamada "pene"
    const hasusername = cookieHeader //Esto no debería hacer falta con comprobar que existe la cookie ya esta
      .split(";")                     // dividimos todas las cookies
      .some((c) =>                    // comprobamos si alguna empieza por "usrID="
        c.trim().startsWith("usrID=")
      );

    // 4.3 Si no encontramos la cookie, redirigimos al inicio ("/")
    if (!hasusername) {
      return new Response(null, {
        status: 307,                 // Redirect temporal
        headers: {
          "Location": "/login"            // ruta de redirección
        },
      });
    }
  }

  // 5. Si todo está OK (o la ruta no es /nombre), dejamos continuar
  return ctx.next();
}