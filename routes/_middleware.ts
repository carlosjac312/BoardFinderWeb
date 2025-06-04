import { FreshContext, MiddlewareHandler } from "$fresh/server.ts";

export const handler: MiddlewareHandler = async (req: Request, ctx: FreshContext) => {
  const url = new URL(req.url);
  const pathname = url.pathname;

  const cookieHeader = req.headers.get("Cookie");
  const cookies = cookieHeader?.split(";");
  const name_cookie = cookies?.find((e) => e.trim().startsWith("usrID="));

  const hasCookie = Boolean(name_cookie);

  const isProtectedPage = pathname.startsWith("/paginas/");
  
  // 🔁 Solo redirige automáticamente desde "/" si tiene cookie y si no lo lleva al login
  if (hasCookie && pathname === "/") {
    return new Response(null, {
      status: 302,
      headers: {
        location: "/paginas/homepage",
      },
    });
  } else if(!hasCookie && pathname === "/") {
    return new Response(null, {
      status: 302,
      headers: {
        location: "/login",
      },
    });
  }

  // ✅ Acceso permitido a páginas protegidas solo si tiene cookie
  if (isProtectedPage) {
    if (hasCookie) {
      return await ctx.next();
    } else {
      return new Response(null, {
        status: 302,
        headers: {
          location: "/login",
        },
      });
    }
  }

  // 🟢 Todo lo demás (incluyendo /login y /register) está permitido libremente
  return await ctx.next();
};