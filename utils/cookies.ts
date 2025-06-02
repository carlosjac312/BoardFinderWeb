export function getCookie(req: Request, name: string): string | undefined {
  const cookie = req.headers.get("cookie");
  if (!cookie) return undefined;

  return cookie
    .split("; ")
    .find(c => c.startsWith(`${name}=`))
    ?.split("=")[1];
}